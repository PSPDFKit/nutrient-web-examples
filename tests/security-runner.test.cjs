const { test } = require("node:test");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

test("required test runner rejects missing, skipped, todo, failed and duplicate results", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "required-tests-"));
  try {
    for (const [source, expected] of [
      ["test('required', () => {});", 0],
      ["test('other', () => {});", 1],
      ["process.exit(3);", 1],
      [
        "test('required', () => {}); setTimeout(() => process.exit(3), 100);",
        1,
      ],
      ["test.skip('required', () => {});", 1],
      ["test.todo('required');", 1],
      ["test('required', () => { throw Error('fixture'); });", 1],
      ["test('required', () => {}); test('required', () => {});", 1],
    ]) {
      const file = path.join(dir, "fixture.cjs");
      fs.writeFileSync(file, `const {test} = require('node:test'); ${source}`);
      const result = spawnSync(
        process.execPath,
        [
          path.join(__dirname, "../scripts/run-required-tests.cjs"),
          file,
          "required",
        ],
        {
          encoding: "utf8",
          env: Object.fromEntries(
            Object.entries(process.env).filter(
              ([key]) => key !== "NODE_TEST_CONTEXT",
            ),
          ),
        },
      );
      if (source.includes("setTimeout")) {
        assert.match(result.stdout, /PASS required/);
        assert.match(result.stderr, /FAIL/);
      }
      assert.equal(
        result.status,
        expected,
        `${source}: ${result.stdout} ${result.stderr}`,
      );
    }
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("required test runner fails when its event stream closes before end", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "runner-stream-"));
  try {
    for (const mode of ["error", "close"]) {
      const preload = path.join(dir, "preload.cjs");
      fs.writeFileSync(
        preload,
        `const test = require('node:test'); const { Readable } = require('node:stream'); test.run = () => { const stream = new Readable({ objectMode: true, read() {} }); process.nextTick(() => stream.destroy(${mode === "error" ? "new Error('fixture stream failure')" : "undefined"})); return stream; };`,
      );
      const result = spawnSync(
        process.execPath,
        [
          "--require",
          preload,
          path.join(__dirname, "../scripts/run-required-tests.cjs"),
          "fixture.cjs",
          "required",
        ],
        {
          encoding: "utf8",
          env: Object.fromEntries(
            Object.entries(process.env).filter(
              ([key]) => key !== "NODE_TEST_CONTEXT",
            ),
          ),
        },
      );
      assert.equal(
        result.status,
        1,
        `${mode}: ${result.stdout} ${result.stderr}`,
      );
    }
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
