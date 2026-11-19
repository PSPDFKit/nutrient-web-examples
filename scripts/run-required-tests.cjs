const { run } = require("node:test");
const path = require("node:path");

const [file, ...required] = process.argv.slice(2);
if (!file || !required.length || new Set(required).size !== required.length) {
  console.error(
    "Usage: node run-required-tests.cjs <file> <unique required test names...>",
  );
  process.exit(1);
}
const counts = new Map(required.map((name) => [name, 0]));
let failed = false;
process.exitCode = 1;
const runner = run({ files: [path.resolve(file)] });
runner.on("test:stdout", ({ message }) => process.stdout.write(message));
runner.on("test:stderr", ({ message }) => process.stderr.write(message));
runner.on("test:fail", (data) => {
  failed = true;
  console.error(`FAIL ${data.name}`, data.details?.error || "");
});
runner.on("test:pass", (data) => {
  console.log(`${data.skip || data.todo ? "SKIP" : "PASS"} ${data.name}`);
  if (counts.has(data.name)) {
    counts.set(data.name, counts.get(data.name) + 1);
    if (data.skip || data.todo) failed = true;
  }
});
runner.on("error", (error) => {
  failed = true;
  console.error(error);
});
runner.on("end", () => {
  for (const [name, count] of counts)
    if (count !== 1) {
      failed = true;
      console.error(
        `Required test ${JSON.stringify(name)} had ${count} passing results`,
      );
    }
  if (!failed) process.exitCode = 0;
});

runner.resume();
