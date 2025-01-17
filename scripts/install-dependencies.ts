#!/usr/bin/env ts-node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const rootDir = path.resolve(__dirname, "..");
const examplesDir = path.join(rootDir, "examples");

const examples = fs.readdirSync(examplesDir);

examples.forEach((example) => {
	const exampleDir = path.join(examplesDir, example);
	console.log(`Installing dependencies for ${exampleDir}`);
	execSync(`npm install`, { cwd: exampleDir });
});
