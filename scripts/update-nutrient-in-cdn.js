const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

const cdnOcurrences = {
  typescript: ["src/index.html"],
  gatsby: ["src/templates/Viewport.js"],
  salesforce: ["force-app/main/default/pages/Nutrient_InitNutrient.page"],
  "javascript-vite": ["index.html"],
  "typescript-vite": ["index.html"],
  webpack: ["README.md", "src/index.html"],
};

const example = process.argv[2];

if (cdnOcurrences[example]) {
  console.log(`Updating CDN version in ${example} example.`);

  for (const relativePath of cdnOcurrences[example]) {
    const template = fs.readFileSync(
      path.resolve(`./examples/${example}/${relativePath}`),
      "utf8",
    );

    const version = execSync("npm view @nutrient-sdk/viewer version")
      .toString()
      .trim();

    const updatedTemplate = template.replace(
      /pspdfkit-web@([0-9]+.[0-9]+.[0-9]+)?/g,
      `pspdfkit-web@${version}`,
    );

    fs.writeFileSync(
      path.resolve(`./examples/${example}/${relativePath}`),
      updatedTemplate,
    );
  }

  console.log(`Updated CDN version in ${example} example.`);
}
