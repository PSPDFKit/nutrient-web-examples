const fs = require("node:fs");
const path = require("node:path");

const cdnOcurrences = {
  gatsbyjs: ["src/templates/Viewport.js"],
  "javascript-vite": ["index.html"],
  nuxtjs: ["components/NutrientContainer.vue"],
  salesforce: ["force-app/main/default/pages/Nutrient_InitNutrient.page"],
  typescript: ["src/index.html"],
  "typescript-vite": ["index.html"],
  webpack: ["README.md", "src/index.html"],
};

const CDN_VERSION = /pspdfkit-web@\d+\.\d+\.\d+/g;

const examplesDir = path.resolve(__dirname, "..", "examples");

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

// A key matching no directory is never looked up, so a typo in one is silent.
const strayKeys = Object.keys(cdnOcurrences).filter(
  (key) => !fs.existsSync(path.resolve(examplesDir, key)),
);

if (strayKeys.length > 0) {
  console.error(`Keys matching no example directory: ${strayKeys.join(", ")}`);
  process.exit(1);
}

if (Object.hasOwn(cdnOcurrences, example)) {
  console.log(`Updating CDN version in ${example} example.`);

  const filePaths = cdnOcurrences[example].map((relativePath) =>
    path.resolve(examplesDir, example, relativePath),
  );

  // Up front: a renamed file would otherwise abort the run half-written.
  const missing = filePaths.filter((filePath) => !fs.existsSync(filePath));

  if (missing.length > 0) {
    console.error(`Expected CDN files are missing:\n${missing.join("\n")}`);
    process.exit(1);
  }

  for (const filePath of filePaths) {
    const template = fs.readFileSync(filePath, "utf8");
    let replacements = 0;

    const updated = template.replace(CDN_VERSION, () => {
      replacements += 1;
      return `pspdfkit-web@${version}`;
    });

    // A zero-match replace rewrites the file byte-identical, reporting success.
    if (replacements === 0) {
      console.error(`No versioned CDN reference found in ${filePath}.`);
      process.exit(1);
    }

    fs.writeFileSync(filePath, updated);
  }

  console.log(`Updated CDN version in ${example} example.`);
}
