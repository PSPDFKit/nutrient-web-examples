const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const os = require("node:os");
const path = require("node:path");
const { createRequire } = require("node:module");
const { test } = require("node:test");

function closeResource(name, close) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`${name} close timed out`)),
      5000,
    );
    close((error) => {
      clearTimeout(timer);
      if (error && error.code !== "ERR_SERVER_NOT_RUNNING") reject(error);
      else resolve();
    });
  });
}

function request(port, url, headers = {}, method = "GET") {
  return new Promise((resolve, reject) => {
    http
      .request(
        { host: "127.0.0.1", port, path: url, headers, method, timeout: 5000 },
        (response) => {
          let body = "";
          response.on("error", reject);
          response.setEncoding("utf8");
          response.on("data", (chunk) => {
            body += chunk;
          });
          response.on("end", () =>
            resolve({
              status: response.statusCode,
              body,
              headers: response.headers,
            }),
          );
        },
      )
      .on("timeout", function () {
        this.destroy(new Error("request timed out"));
      })
      .on("error", reject)
      .end();
  });
}

for (const example of ["gatsbyjs", "react"]) {
  test(
    `${example} middleware rejects traversal outside webpack output`,
    { timeout: 20000 },
    async (t) => {
      const requireExample = createRequire(
        path.resolve(__dirname, `../examples/${example}/package.json`),
      );
      const webpack = requireExample("webpack");
      const middleware = requireExample("webpack-dev-middleware");
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), "middleware-test-"));
      t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
      fs.writeFileSync(
        path.join(dir, "entry.js"),
        'console.log("ordinary asset");',
      );
      const compiler = webpack({
        mode: "development",
        entry: path.join(dir, "entry.js"),
        output: {
          path: path.join(dir, "output"),
          filename: "bundle.js",
          publicPath: "/assets",
        },
      });
      const handler = middleware(compiler, {
        publicPath: "/assets",
        stats: "errors-only",
      });
      const server = http.createServer((req, res) =>
        handler(req, res, () => {
          res.statusCode = 404;
          res.end();
        }),
      );
      t.after(async () => {
        server.closeAllConnections();
        const results = await Promise.allSettled([
          closeResource("server", (done) => server.close(done)),
          closeResource("middleware", (done) => handler.close(done)),
        ]);
        for (const result of results) {
          if (result.status === "rejected") throw result.reason;
        }
      });
      await new Promise((resolve, reject) => {
        server.once("error", reject);
        server.listen(0, "127.0.0.1", resolve);
      });
      await new Promise((resolve, reject) => {
        const timer = setTimeout(
          () => reject(new Error("webpack compilation timed out")),
          10000,
        );
        handler.waitUntilValid((stats) => {
          clearTimeout(timer);
          if (stats.hasErrors())
            reject(new Error(stats.toString("errors-only")));
          else resolve();
        });
      });
      handler.context.outputFileSystem.writeFileSync(
        path.join(dir, "secret.txt"),
        "fixture secret",
      );
      for (const [name, content] of [
        ["empty.txt", ""],
        ["one.txt", "x"],
        ["ordinary.txt", "abcdef"],
      ]) {
        handler.context.outputFileSystem.writeFileSync(
          path.join(dir, "output", name),
          content,
        );
      }
      const port = server.address().port;
      const outputFS = handler.context.outputFileSystem;
      const originalRead = outputFS.createReadStream;
      const originalStat = outputFS.statSync;
      const streams = [];
      outputFS.createReadStream = function (...args) {
        const stream = originalRead.apply(this, args);
        streams.push(stream);
        return stream;
      };
      t.after(() => {
        outputFS.createReadStream = originalRead;
        outputFS.statSync = originalStat;
        for (const stream of streams) if (!stream.destroyed) stream.destroy();
      });
      for (const [file, range, expected, status] of [
        ["ordinary.txt", null, "abcdef", 200],
        ["empty.txt", null, "", 200],
        ["one.txt", null, "x", 200],
        ["ordinary.txt", "bytes=0-0", "a", 206],
        ["ordinary.txt", "bytes=2-4", "cde", 206],
      ]) {
        const headers = range ? { Range: range } : {};
        for (const method of ["HEAD", "GET", "HEAD"]) {
          const before = streams.length;
          const result = await request(
            port,
            `/assets/${file}`,
            headers,
            method,
          );
          assert.equal(result.status, status);
          assert.equal(result.body, method === "HEAD" ? "" : expected);
          assert.equal(
            Number(result.headers["content-length"]),
            Buffer.byteLength(expected),
          );
          const created = streams.slice(before);
          assert.equal(
            created.length,
            1,
            `${method} ${file} must create a stream`,
          );
          const deadline = Date.now() + 1000;
          while (!created[0].closed && Date.now() < deadline) {
            await new Promise((resolve) => setTimeout(resolve, 10));
          }
          assert.equal(
            created[0].destroyed,
            true,
            `${method} ${file} destroyed`,
          );
          assert.equal(created[0].closed, true, `${method} ${file} closed`);
          assert.equal(created[0].fd, null, `${method} ${file} fd released`);
        }
      }
      handler.context.options.cache.etag = "strong";
      const strongBefore = streams.length;
      const strongHead = await request(
        port,
        "/assets/ordinary.txt",
        {},
        "HEAD",
      );
      assert.equal(strongHead.status, 200);
      assert.equal(strongHead.body, "");
      assert.equal(strongHead.headers["content-length"], "6");
      assert.ok(strongHead.headers.etag);
      const strongStream = streams[strongBefore];
      assert.ok(strongStream);
      const strongDeadline = Date.now() + 1000;
      while (!strongStream.closed && Date.now() < strongDeadline)
        await new Promise((resolve) => setTimeout(resolve, 10));
      assert.equal(strongStream.closed, true);
      assert.equal(strongStream.fd, null);
      handler.context.options.cache.etag = false;
      let pending;
      outputFS.createReadStream = () => {
        pending = fs.createReadStream(path.join(dir, "missing-pending-file"));
        streams.push(pending);
        assert.equal(pending.pending, true);
        return pending;
      };
      const pendingHead = await request(
        port,
        "/assets/ordinary.txt",
        {},
        "HEAD",
      );
      assert.equal(pendingHead.status, 200);
      assert.equal(pendingHead.body, "");
      const pendingDeadline = Date.now() + 1000;
      while (!pending.closed && Date.now() < pendingDeadline)
        await new Promise((resolve) => setTimeout(resolve, 10));
      assert.equal(pending.destroyed, true);
      assert.equal(pending.closed, true);
      assert.equal(pending.fd, null);
      outputFS.createReadStream = function (...args) {
        const stream = originalRead.apply(this, args);
        streams.push(stream);
        return stream;
      };
      const beforeStatError = streams.length;
      let injected = false;
      outputFS.statSync = function (filename, ...args) {
        if (
          !injected &&
          String(filename) === path.join(dir, "output", "one.txt") &&
          new Error().stack.includes("createReadStreamOrReadFile")
        ) {
          injected = true;
          const error = new Error("fixture stat failure");
          error.code = "EIO";
          throw error;
        }
        return originalStat.call(this, filename, ...args);
      };
      const statError = await request(port, "/assets/one.txt");
      outputFS.statSync = originalStat;
      assert.equal(injected, true);
      assert.equal(statError.status, 500);
      assert.equal(
        Number(statError.headers["content-length"]),
        Buffer.byteLength(statError.body),
      );
      assert.equal(streams.length, beforeStatError);
      for (const [file, range, expected, status] of [
        ["empty.txt", null, "", 200],
        ["one.txt", null, "x", 200],
        ["ordinary.txt", null, "abcdef", 200],
        ["ordinary.txt", "bytes=0-0", "a", 206],
        ["ordinary.txt", "bytes=2-4", "cde", 206],
      ]) {
        const result = await request(
          port,
          `/assets/${file}`,
          range ? { Range: range } : {},
        );
        assert.equal(result.status, status);
        assert.equal(result.body, expected);
        assert.equal(
          Number(result.headers["content-length"]),
          Buffer.byteLength(expected),
        );
      }
      const asset = await request(port, "/assets/bundle.js");
      assert.equal(asset.status, 200);
      assert.match(asset.body, /ordinary asset/);
      const traversal = await request(port, "/assets../secret.txt");
      assert.equal(traversal.status, 403);
      assert.doesNotMatch(traversal.body, /fixture secret/);
    },
  );
}

test(
  "react redirects omit cross-realm sensitive headers",
  { timeout: 20000 },
  async (t) => {
    const requireExample = createRequire(
      path.resolve(__dirname, "../examples/react/package.json"),
    );
    const redirects = requireExample("follow-redirects");
    const vm = require("node:vm");
    const destination = http.createServer((req, res) =>
      res.end(req.headers["x-fixture-secret"] || "not forwarded"),
    );
    t.after(() =>
      closeResource("destination", (done) => destination.close(done)),
    );
    await new Promise((resolve, reject) => {
      destination.once("error", reject);
      destination.listen(0, "127.0.0.1", resolve);
    });
    const origin = http.createServer((req, res) => {
      res.writeHead(302, {
        location: `http://localhost:${destination.address().port}/`,
      });
      res.end();
    });
    t.after(() => closeResource("origin", (done) => origin.close(done)));
    await new Promise((resolve, reject) => {
      origin.once("error", reject);
      origin.listen(0, "127.0.0.1", resolve);
    });
    const body = await new Promise((resolve, reject) => {
      redirects.http
        .get(
          {
            hostname: "127.0.0.1",
            port: origin.address().port,
            path: "/",
            timeout: 5000,
            headers: { "X-Fixture-Secret": "fixture secret" },
            sensitiveHeaders: vm.runInNewContext('["X-Fixture-Secret"]'),
          },
          (res) => {
            let data = "";
            res.on("error", reject);
            res.on("data", (chunk) => {
              data += chunk;
            });
            res.on("end", () => resolve(data));
          },
        )
        .on("timeout", function () {
          this.destroy(new Error("redirect timed out"));
        })
        .on("error", reject);
    });
    assert.equal(body, "not forwarded");
  },
);
