const { execFileSync } = require("node:child_process");
const fs = require("node:fs");

const GRAPHQL_URL = "https://api.github.com/graphql";

const branch = process.argv[2];
const headline = process.argv[3];

if (!branch || !headline) {
  console.error("Usage: node scripts/commit-signed.js <branch> <message>");
  process.exit(1);
}

const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;

if (!token) {
  console.error("GH_TOKEN (or GITHUB_TOKEN) must be set.");
  process.exit(1);
}

const git = (...args) =>
  execFileSync("git", args, { encoding: "utf8", maxBuffer: 1024 * 1024 * 64 });

const repository =
  process.env.GITHUB_REPOSITORY ||
  git("remote", "get-url", "origin")
    .trim()
    .replace(/^.*github\.com[/:]/, "")
    .replace(/\.git$/, "");

if (!/^[^/]+\/[^/]+$/.test(repository)) {
  console.error(`Could not determine owner/repo, got "${repository}".`);
  process.exit(1);
}

// The mutation replays the index against a commit that must already be on the
// remote, so the branch is created there first and HEAD is the parent.
const parent = git("rev-parse", "HEAD").trim();

// -z, because a path with a space or a quote is mangled by the default
// quoting and would be committed under the wrong name.
const staged = git("diff", "--cached", "--name-status", "-z").split("\0");
const additions = [];
const deletions = [];

for (let i = 0; i < staged.length - 1; i += 2) {
  const status = staged[i];
  const path = staged[i + 1];

  if (status.startsWith("R") || status.startsWith("C")) {
    console.error(
      `Renames and copies are not supported (${status} ${path}); stage them as a delete plus an add.`,
    );
    process.exit(1);
  }

  if (status === "D") {
    deletions.push({ path });
  } else {
    // The mutation cannot set a file mode: an existing file keeps the mode it
    // has, and a new one is created non-executable.
    additions.push({
      path,
      contents: fs.readFileSync(path).toString("base64"),
    });
  }
}

if (additions.length === 0 && deletions.length === 0) {
  console.error("Nothing is staged.");
  process.exit(1);
}

git("push", "origin", `${parent}:refs/heads/${branch}`);

const query = `
  mutation ($input: CreateCommitOnBranchInput!) {
    createCommitOnBranch(input: $input) {
      commit {
        oid
      }
    }
  }
`;

const input = {
  branch: { repositoryNameWithOwner: repository, branchName: branch },
  expectedHeadOid: parent,
  message: { headline },
  fileChanges: { additions, deletions },
};

async function main() {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { input } }),
  });

  const body = await response.json();

  if (!response.ok) {
    console.error(
      `GitHub answered ${response.status}: ${JSON.stringify(body)}`,
    );
    process.exit(1);
  }

  // GraphQL reports a rejected mutation inside a 200, so the status alone
  // would let a failed commit pass as a success.
  if (body.errors) {
    console.error(`GitHub rejected the commit: ${JSON.stringify(body.errors)}`);
    process.exit(1);
  }

  const oid = body.data.createCommitOnBranch.commit.oid;

  console.log(`Committed ${oid} to ${branch}.`);
}

main();
