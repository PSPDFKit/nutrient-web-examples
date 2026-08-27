const fs = require("node:fs");
const path = require("node:path");

const cdnOcurrences = {
  gatsbyjs: ["src/templates/Viewport.js"],
  "javascript-vite": ["index.html"],
  nuxtjs: ["components/NutrientContainer.vue"],
  salesforce: [
    "README.md",
    "force-app/main/default/pages/Nutrient_InitNutrient.page",
  ],
  typescript: ["src/index.html"],
  "typescript-vite": ["index.html"],
  webpack: ["README.md", "src/index.html"],
};

const example = process.argv[2];
const version = process.argv[3];

if (!example || !version) {
  console.error(
    "Usage: node scripts/update-nutrient-in-cdn.js <example> <version>",
  );
  process.exit(1);
}

if (!/^\d+\.\d+\.\d+$/.test(version)) {
  console.error(`Expected a semver version, got "${version}".`);
  process.exit(1);
}

if (cdnOcurrences[example]) {
  console.log(`Updating CDN version in ${example} example.`);

  const filePaths = cdnOcurrences[example].map((relativePath) =>
    path.resolve(__dirname, "..", "examples", example, relativePath),
  );

  // Validate every file up front: a renamed or moved file would otherwise be
  // skipped silently, or abort the run half-written across the example.
  const missing = filePaths.filter((filePath) => !fs.existsSync(filePath));

  if (missing.length > 0) {
    console.error(`Expected CDN files are missing:\n${missing.join("\n")}`);
    process.exit(1);
  }

  for (const filePath of filePaths) {
    const template = fs.readFileSync(filePath, "utf8");

    fs.writeFileSync(
      filePath,
      template.replace(
        /pspdfkit-web@([0-9]+.[0-9]+.[0-9]+)?/g,
        `pspdfkit-web@${version}`,
      ),
    );
  }

  console.log(`Updated CDN version in ${example} example.`);
}
