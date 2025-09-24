const { dialog } = require("electron");

// We verify that the Nutrient dependency was correctly added.
try {
  // This will throw when `@nutrient-sdk/viewer` is not installed.
  require("@nutrient-sdk/viewer");
} catch (error) {
  if (error.message === "Cannot find module '@nutrient-sdk/viewer'") {
    dialog.showErrorBox(
      "Missing Nutrient Dependency",
      `In order to start the Nutrient Electron SDK example app, you'll need to install Nutrient via npm.

If you are evaluating Nutrient, you can find the npm URL at:

https://www.nutrient.io/guides/web/current/pspdfkit-for-electron/example-project/

Otherwise you can find the npm URL in our the customer portal:

https://customers.www.nutrient.io`,
    );
    process.exit(1);
  }
}
