const { dialog } = require("electron");

// We verify that the PSPDFKit dependency was correctly added.
try {
  // This will throw when `pspdfkit` is not installed.
  require("pspdfkit");
} catch (error) {
  if (error.message === "Cannot find module 'pspdfkit'") {
    dialog.showErrorBox(
      "Missing PSPDFKit Dependency",
      `In order to start the PSPDFKit for Electron example app, you'll need to install PSPDFKit via npm.

If you are evaluating PSPDFKit, you can find the npm URL at:

https://www.nutrient.io/guides/web/current/pspdfkit-for-electron/example-project/

Otherwise you can find the npm URL in our the customer portal:

https://customers.www.nutrient.io`,
    );
    process.exit(1);
  }
}
