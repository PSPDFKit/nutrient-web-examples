const { contextBridge, webUtils } = require("electron");
const { pathToFileURL } = require("node:url");

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
  // Returns a `file://` URL for a dropped `File`, which the viewer can open.
  // Electron removed `File.path` in v32; `webUtils` replaces it.
  getFileUrl: (file) => pathToFileURL(webUtils.getPathForFile(file)).href,
});
