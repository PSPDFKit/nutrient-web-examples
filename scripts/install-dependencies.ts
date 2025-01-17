import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const rootDir = path.resolve(__dirname, "..");
const examplesDir = path.join(rootDir, "examples");

const examples = fs.readdirSync(examplesDir);

for (const example of examples) {
  const exampleDir = path.join(examplesDir, example);
  console.log(`Installing dependencies for ${exampleDir}`);
  execSync("npm install", {
    cwd: exampleDir,
  });
}
