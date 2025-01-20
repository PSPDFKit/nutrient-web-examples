const fs = require("node:fs");
const { execSync } = require("node:child_process");
const path = require("node:path");

const initPSPDFKitPage = fs.readFileSync(
  path.resolve("./force-app/main/default/pages/PSPDFKit_InitPSPDFKit.page"),
  "utf8",
);

const version = execSync("npm view pspdfkit version").toString("utf-8").trim();

const updatedPSPDFKitPage = initPSPDFKitPage.replace(
  // Matches the URL token indicating the current Nutrient Web SDK version (eg. 2024.4.0)
  /pspdfkit-web@([0-9]+.[0-9]+.[0-9]+)?/g,
  `pspdfkit-web@${version}`,
);

fs.writeFileSync(
  path.resolve("./force-app/main/default/pages/PSPDFKit_InitPSPDFKit.page"),
  updatedPSPDFKitPage,
);
