const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

const initNutrientPage = fs.readFileSync(
  path.resolve(
    "./examples/salesforce/force-app/main/default/pages/Nutrient_InitNutrient.page",
  ),
  "utf8",
);

const version = execSync("npm view @nutrient-sdk/viewer version")
  .toString()
  .trim();

const updatedNutrientPage = initNutrientPage.replace(
  /pspdfkit-web@([0-9]+.[0-9]+.[0-9]+)?/g,
  `pspdfkit-web@${version}`,
);

fs.writeFileSync(
  path.resolve(
    "./examples/salesforce/force-app/main/default/pages/Nutrient_InitNutrient.page",
  ),
  updatedNutrientPage,
);

console.log("Updated version in Salesforce example.");
