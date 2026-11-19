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
  // Electron returns an empty path if the File has no backing file.
  getFileUrl: (file) => {
    const path = webUtils.getPathForFile(file);
    return path ? pathToFileURL(path).href : null;
  },
});
