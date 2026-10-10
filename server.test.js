const test = require("node:test");
const assert = require("node:assert");
const { spawnSync } = require("node:child_process");
const { createServer, VERSION, HEALTH_PATH } = require("./server");

test("serves version and health", async () => {
  const server = createServer("hello").listen(0);
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const version = await (await fetch(`${base}/version`)).json();
    assert.deepStrictEqual(version, { version: VERSION, greeting: "hello" });
    assert.strictEqual((await fetch(`${base}${HEALTH_PATH}`)).status, 200);
  } finally {
    server.close();
  }
});

test("exits when SAMPLE_GREETING is missing", () => {
  const env = { ...process.env };
  delete env.SAMPLE_GREETING;
  const result = spawnSync(process.execPath, ["server.js"], { cwd: __dirname, env, encoding: "utf8" });
  assert.strictEqual(result.status, 1);
  assert.match(result.stderr, /SAMPLE_GREETING/);
});
