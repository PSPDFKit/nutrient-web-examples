const { contextBridge } = require("electron");

const {
  documentExport,
  documentImport,
  askUserToDiscardChanges,
} = require("./lib/modals");

// Use the recommended, safe way of selectively exposing the capabilities
// of the Node API to the browser context.

// Electron helpers exposed in the browser context as window.electron
contextBridge.exposeInMainWorld("electron", {
  processPlatform: () => process.platform,
  documentExport,
  documentImport,
  askUserToDiscardChanges,
});
