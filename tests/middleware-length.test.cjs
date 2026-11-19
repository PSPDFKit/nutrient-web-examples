const assert = require("node:assert/strict");
const path = require("node:path");
const { createRequire } = require("node:module");
const { test } = require("node:test");

for (const example of ["gatsbyjs", "react"]) {
  test(`${example} stream length uses selected size without another lookup`, () => {
    const load = createRequire(
      path.resolve(__dirname, `../examples/${example}/package.json`),
    );
    const { createReadStreamOrReadFile } = require(
      path.join(
        path.dirname(load.resolve("webpack-dev-middleware")),
        "utils.js",
      ),
    );
    const stream = {};
    const outputFS = {
      statSync() {
        throw new Error("unexpected second lookup");
      },
      createReadStream() {
        return stream;
      },
    };
    for (const [start, end, length] of [
      [0, 0, 0],
      [0, 0, 1],
      [2, 4, 3],
    ]) {
      assert.deepEqual(
        createReadStreamOrReadFile("asset", outputFS, start, end, length),
        { bufferOrStream: stream, byteLength: length },
      );
    }
    const buffer = Buffer.from("asset");
    assert.deepEqual(
      createReadStreamOrReadFile(
        "asset",
        { readFileSync: () => buffer },
        0,
        0,
        1,
      ),
      { bufferOrStream: buffer, byteLength: 5 },
    );
  });
}
