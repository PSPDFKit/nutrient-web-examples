const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { createRequire } = require("node:module");
const { spawnSync } = require("node:child_process");
const { test } = require("node:test");

function assertFailedProcess(result) {
  assert.equal(result.error, undefined);
  assert.equal(result.signal, null);
  assert.equal(typeof result.status, "number");
  assert.notEqual(result.status, 0);
}

test("postinstall failure requires a completed nonzero exit", () => {
  for (const result of [
    { error: new Error("timeout"), signal: "SIGTERM", status: null },
    { signal: "SIGTERM", status: null },
    { signal: null, status: 0 },
  ])
    assert.throws(() => assertFailedProcess(result));
  assert.doesNotThrow(() => assertFailedProcess({ signal: null, status: 1 }));
});

test("React development server disables the incompatible magic HTML helper", () => {
  const config = require("../examples/react/node_modules/react-scripts/config/webpackDevServer.config.js");
  assert.equal(config(undefined, "localhost").magicHtml, false);
});

for (const example of ["gatsbyjs", "react"]) {
  test(`${example} follow-redirects versions are patched`, () => {
    const root = path.resolve(__dirname, "../examples", example);
    const lock = require(path.join(root, "package-lock.json"));
    const copies = Object.entries(lock.packages).filter(([name]) =>
      name.endsWith("node_modules/follow-redirects"),
    );
    assert.ok(copies.length);
    for (const [name, metadata] of copies) {
      const version = /^(\d+)\.(\d+)\.(\d+)$/.exec(metadata.version);
      assert.ok(version, `${name}: invalid version ${metadata.version}`);
      const [major, minor, patch] = version.slice(1).map(Number);
      assert.ok(
        major > 1 ||
          (major === 1 && (minor > 16 || (minor === 16 && patch >= 2))),
        `${name}: vulnerable version ${metadata.version}`,
      );
      const installed = require(path.join(root, name, "package.json"));
      assert.equal(installed.version, metadata.version, name);
    }
    const load = createRequire(path.join(root, "package.json"));
    assert.equal(
      load("follow-redirects/package.json").version,
      lock.packages["node_modules/follow-redirects"].version,
    );
  });
  test(`${example} postinstall fails on an incompatible patch without CI`, () => {
    const root = path.resolve(__dirname, "../examples", example);
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "patch-fail-"));
    try {
      const pkg = require(path.join(root, "package.json"));
      fs.writeFileSync(
        path.join(dir, "package.json"),
        JSON.stringify({
          name: "fixture",
          version: "1.0.0",
          scripts: { postinstall: pkg.scripts.postinstall },
        }),
      );
      fs.mkdirSync(path.join(dir, "node_modules/webpack-dev-middleware"), {
        recursive: true,
      });
      fs.symlinkSync(
        path.join(root, "node_modules/.bin"),
        path.join(dir, "node_modules/.bin"),
        "dir",
      );
      fs.writeFileSync(
        path.join(dir, "node_modules/webpack-dev-middleware/package.json"),
        JSON.stringify({ name: "webpack-dev-middleware", version: "8.6.0" }),
      );
      fs.writeFileSync(
        path.join(dir, "node_modules/webpack-dev-middleware/fixture.txt"),
        "original\n",
      );
      fs.mkdirSync(path.join(dir, "patches"));
      fs.writeFileSync(
        path.join(dir, "patches/webpack-dev-middleware+8.6.0.patch"),
        "diff --git a/node_modules/webpack-dev-middleware/fixture.txt b/node_modules/webpack-dev-middleware/fixture.txt\n--- a/node_modules/webpack-dev-middleware/fixture.txt\n+++ b/node_modules/webpack-dev-middleware/fixture.txt\n@@ -1 +1 @@\n-incompatible\n+changed\n",
      );
      const env = {
        ...process.env,
        CI: "true",
        COREPACK_ENABLE_STRICT: "0",
        NODE_ENV: "development",
      };
      const noFlagPkg = {
        name: "fixture",
        version: "1.0.0",
        scripts: {
          postinstall: pkg.scripts.postinstall.replace(" --error-on-fail", ""),
        },
      };
      fs.writeFileSync(
        path.join(dir, "package.json"),
        JSON.stringify(noFlagPkg),
      );
      const noFlag = spawnSync("npm", ["run", "postinstall"], {
        cwd: dir,
        env: { ...env, CI: "false" },
        encoding: "utf8",
        timeout: 20000,
      });
      assert.equal(noFlag.error, undefined);
      assert.equal(noFlag.signal, null);
      assert.equal(noFlag.status, 0, noFlag.stdout + noFlag.stderr);

      fs.writeFileSync(
        path.join(dir, "node_modules/webpack-dev-middleware/fixture.txt"),
        "original\n",
      );
      fs.writeFileSync(
        path.join(dir, "package.json"),
        JSON.stringify({
          ...noFlagPkg,
          scripts: { postinstall: pkg.scripts.postinstall },
        }),
      );
      const result = spawnSync("npm", ["run", "postinstall"], {
        cwd: dir,
        env: { ...env, CI: "false" },
        encoding: "utf8",
        timeout: 20000,
      });
      assertFailedProcess(result);
      assert.match(
        result.stdout + result.stderr,
        /Failed to apply patch|could not be applied/i,
      );
      assert.equal(
        fs.readFileSync(
          path.join(dir, "node_modules/webpack-dev-middleware/fixture.txt"),
          "utf8",
        ),
        "original\n",
      );

      const ciResult = spawnSync("npm", ["run", "postinstall"], {
        cwd: dir,
        env,
        encoding: "utf8",
        timeout: 20000,
      });
      assertFailedProcess(ciResult);
      assert.match(
        ciResult.stdout + ciResult.stderr,
        /Failed to apply patch|could not be applied/i,
      );
      assert.equal(
        fs.readFileSync(
          path.join(dir, "node_modules/webpack-dev-middleware/fixture.txt"),
          "utf8",
        ),
        "original\n",
      );
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
}
