import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
const rootDir = path.resolve(__dirname, "..");
const examplesDir = path.join(rootDir, "examples");

const examples = fs.readdirSync(examplesDir);

async function runServer(exampleDir: string) {
  console.log("Running server");
  execSync("npm run start", {
    cwd: exampleDir,
  });
  console.log("Server running");
}

(async () => {
  for (const example of examples) {
    const exampleDir = path.join(examplesDir, example);
    await runServer(exampleDir);
  }
})();
