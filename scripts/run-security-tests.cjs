const { spawnSync } = require("node:child_process");
const path = require("node:path");
const manifest = require("./security-test-manifest.cjs");
let failed = false;
for (const [file, names] of Object.entries(manifest)) {
  const result = spawnSync(
    process.execPath,
    [path.join(__dirname, "run-required-tests.cjs"), file, ...names],
    { stdio: "inherit" },
  );
  if (result.error || result.status !== 0) {
    failed = true;
    if (result.error) console.error(result.error);
  }
}
if (failed) process.exitCode = 1;
