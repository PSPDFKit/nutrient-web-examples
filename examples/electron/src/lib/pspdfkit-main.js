const electron = require("electron");
// Module to manage communication with the renderer process (preload script)
const ipcMain = electron.ipcMain;
// UI dialogs helpers
const { showMessageBox, showOpenDialog, showSaveDialog, showErrorBox } =
  electron.dialog;

// Output a readable error message, when the PSPDFKit for Electron dependency is
// missing.
// We verify that the PSPDFKit dependency was correctly added.
try {
  // This will throw when `pspdfkit` is not installed.
  require("pspdfkit");
} catch (error) {
  if (error.message === "Cannot find module 'pspdfkit'") {
    showErrorBox(
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

module.exports = {
  initialize() {
    ipcMain.handle("showOpenDialog", (event, options) =>
      showOpenDialog(options),
    );
    ipcMain.handle("showSaveDialog", (event, options) =>
      showSaveDialog(options),
    );
    ipcMain.handle("showMessageBox", (event, options) =>
      showMessageBox(options),
    );
  },
  cleanup() {
    ipcMain.removeHandler("showOpenDialog");
    ipcMain.removeHandler("showSaveDialog");
    ipcMain.removeHandler("showMessageBox");
  },
};
