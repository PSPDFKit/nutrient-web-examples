const { webUtils } = require("electron");
const { pathToFileURL } = require("node:url");

/**
 * Calls `onDrop` for PDFs backed by a file on disk for the window lifetime.
 */
module.exports = function dragAndDrop(onDrop) {
  function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function handleDrop(event) {
    if (event?.dataTransfer?.files?.length) {
      const droppedFile = event.dataTransfer.files[0];

      if (droppedFile.type !== "application/pdf") {
        return;
      }

      // Electron returns an empty path if the File has no backing file.
      const path = webUtils.getPathForFile(droppedFile);
      if (path) {
        onDrop(pathToFileURL(path).href);
      }
    }

    event.preventDefault();
    event.stopPropagation();
  }

  window.addEventListener("dragover", handleDragOver);
  window.addEventListener("drop", handleDrop);
};
