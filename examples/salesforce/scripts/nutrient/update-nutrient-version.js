const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");

const initNutrientPage = fs.readFileSync(
  path.resolve("./force-app/main/default/pages/Nutrient_InitNutrient.page"),
  "utf8"
);

const version = execSync("npm view @nutrient-sdk/viewer version")
  .toString("utf-8")
  .trim();

const updatedNutrientPage = initNutrientPage.replace(
  // Matches the URL token indicating the current Nutrient Web SDK version (eg. 1.0.0)
  /pspdfkit-web@([0-9]+.[0-9]+.[0-9]+)?/g,
  `pspdfkit-web@${version}`
);

fs.writeFileSync(
  path.resolve("./force-app/main/default/pages/Nutrient_InitNutrient.page"),
  updatedNutrientPage
);
