const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const path = require("node:path");
const test = require("node:test");
const lock = require("./package-lock.json");

const copies = Object.keys(lock.packages).filter((entry) =>
  entry.endsWith("node_modules/@graphql-tools/utils"),
);

test("mergeDeep rejects prototype-polluting keys in every installed utility copy", () => {
  assert.ok(
    copies.length > 0,
    "no @graphql-tools/utils copies found in lockfile",
  );
  for (const copy of copies) {
    // Isolate each probe so a vulnerable implementation cannot pollute the test runner.
    const result = spawnSync(
      process.execPath,
      [
        "-e",
        `
        const assert = require("node:assert/strict");
        const { mergeDeep } = require(process.argv[1]);
        const payload = JSON.parse('{"nested":{"__proto__":{"polluted":"yes"}}}');
        const merged = mergeDeep([{ nested: { a: 1 } }, payload]);
        assert.equal(merged.nested.a, 1);
        assert.equal(merged.nested.polluted, undefined);
        assert.equal(Object.getPrototypeOf(merged.nested), Object.prototype);
        assert.equal(Object.prototype.polluted, undefined);
        const constructorPayload = JSON.parse('{"constructor":{"prototype":{"polluted":"yes"}}}');
        const constructorMerged = mergeDeep([{ a: 1 }, constructorPayload]);
        assert.equal(constructorMerged.a, 1);
        assert.equal(Object.prototype.polluted, undefined);
      `,
        path.resolve(__dirname, copy),
      ],
      { encoding: "utf8" },
    );
    assert.equal(result.status, 0, `${copy}: ${result.stderr || result.error}`);
  }
});

test("mergeIncrementalResult rejects coercible path segments in every installed utility copy", () => {
  assert.ok(
    copies.length > 0,
    "no @graphql-tools/utils copies found in lockfile",
  );
  for (const copy of copies) {
    const result = spawnSync(
      process.execPath,
      [
        "-e",
        `
        const assert = require("node:assert/strict");
        const { mergeIncrementalResult } = require(process.argv[1]);
        const executionResult = { data: {} };
        const incrementalResult = JSON.parse('{"path":[["__proto__"],"polluted"],"data":"yes"}');
        mergeIncrementalResult({ incrementalResult, executionResult });
        assert.equal(Object.prototype.polluted, undefined);
        assert.deepEqual(executionResult, { data: {} });
      `,
        path.resolve(__dirname, copy),
      ],
      { encoding: "utf8" },
    );
    assert.equal(result.status, 0, `${copy}: ${result.stderr || result.error}`);
  }
});

test("makeExecutableSchema accepts empty and preserves populated schema extensions in every installed schema copy", () => {
  const schemas = Object.keys(lock.packages).filter((entry) =>
    entry.endsWith("node_modules/@graphql-tools/schema"),
  );
  assert.ok(
    schemas.length > 0,
    "no @graphql-tools/schema copies found in lockfile",
  );
  for (const copy of schemas) {
    const { makeExecutableSchema } = require(path.resolve(__dirname, copy));
    const typeDefs = "type Query { value: String }";
    for (const options of [{}, { schemaExtensions: [] }]) {
      const schema = makeExecutableSchema({ typeDefs, ...options });
      assert.ok(schema.getQueryType().getFields().value, copy);
    }
    const extension = { schemaExtensions: { custom: "retained" } };
    for (const schemaExtensions of [
      extension,
      [extension],
      [extension, { schemaExtensions: { other: "also retained" } }],
    ]) {
      const schema = makeExecutableSchema({ typeDefs, schemaExtensions });
      assert.equal(schema.extensions.custom, "retained", copy);
      if (Array.isArray(schemaExtensions) && schemaExtensions.length > 1) {
        assert.equal(schema.extensions.other, "also retained", copy);
      }
    }
  }
});

const fs = require("node:fs");
const os = require("node:os");
const {
  loadFile,
  loadFileSync,
} = require("./node_modules/@graphql-tools/load/cjs/load-typedefs/load-file.js");
const { CodeFileLoader } = require("@graphql-tools/code-file-loader");

for (const sync of [false, true]) {
  test(`loadFile ${sync ? "sync" : "async"} preserves failures and successful sources`, async () => {
    const invoke = (loaders) =>
      sync
        ? Promise.resolve().then(() => loadFileSync("fixture", { loaders }))
        : loadFile("fixture", { loaders });
    const failing = (message) => ({
      load: async () => {
        throw new Error(message);
      },
      loadSync: () => {
        throw new Error(message);
      },
    });
    const source = {
      location: "fixture",
      rawSDL: "type Query { value: String }",
    };
    const success = { load: async () => [source], loadSync: () => [source] };
    await assert.rejects(invoke([failing("first failure")]), /first failure/);
    await assert.rejects(
      invoke([failing("first failure"), failing("second failure")]),
      (error) => {
        assert.ok(error instanceof AggregateError);
        assert.deepEqual(error.errors.map((item) => item.message).sort(), [
          "first failure",
          "second failure",
        ]);
        return true;
      },
    );
    assert.deepEqual(await invoke([failing("first failure"), success]), [
      source,
    ]);
  });
}

for (const sync of [false, true]) {
  test(`CodeFileLoader ${sync ? "sync" : "async"} aggregates real file errors and loads documents`, async () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "gatsby-loader-"));
    try {
      fs.writeFileSync(path.join(directory, "bad1.js"), "const = ;");
      fs.writeFileSync(path.join(directory, "bad2.js"), "const = ;");
      fs.writeFileSync(
        path.join(directory, "good.js"),
        "const query = graphql`query Example { value }`;",
      );
      const loader = new CodeFileLoader();
      const invoke = (pattern) =>
        sync
          ? Promise.resolve().then(() =>
              loader.loadSync(pattern, { cwd: directory, noRequire: true }),
            )
          : loader.load(pattern, { cwd: directory, noRequire: true });
      await assert.rejects(invoke("bad*.js"), (error) => {
        assert.ok(error instanceof AggregateError);
        assert.equal(error.errors.length, 2);
        assert.ok(error.errors.every((item) => item instanceof Error));
        return true;
      });
      const sources = await invoke("good.js");
      assert.equal(sources.length, 1);
      assert.equal(sources[0].document.definitions[0].name.value, "Example");
    } finally {
      fs.rmSync(directory, { recursive: true, force: true });
    }
  });
}
