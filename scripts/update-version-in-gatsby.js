const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("child_process");

const viewportTemplate = fs.readFileSync(
  path.resolve("./examples/gatsbyjs/src/templates/Viewport.js"),
  "utf8"
);

const version = execSync("npm view @nutrient-sdk/viewer version").toString().trim();

const updatedViewportTemplate = viewportTemplate.replace(
  /pspdfkit-web@([0-9]+.[0-9]+.[0-9]+)?/g,
  `pspdfkit-web@${version}`
);

fs.writeFileSync(
  path.resolve("./examples/gatsbyjs/src/templates/Viewport.js"),
  updatedViewportTemplate
);

console.log("Updated version in Gatsby example.");
