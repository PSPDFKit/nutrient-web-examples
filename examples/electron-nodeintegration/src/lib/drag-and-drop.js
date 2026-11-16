const { webUtils } = require("electron");
const { pathToFileURL } = require("node:url");

/**
 * Initializes drag and drop handlers for a given `NutrientViewer.Instance`. When a
 * file is detected, the `onDrop` handler will be called.
 */
module.exports = function dragAndDrop(instance, onDrop) {
  instance.contentWindow.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
  instance.contentWindow.addEventListener("drop", (event) => {
    if (event?.dataTransfer?.files?.length) {
      const droppedFile = event.dataTransfer.files[0];

      if (droppedFile.type !== "application/pdf") {
        return;
      }

      // Electron removed `File.path` in v32; `webUtils` replaces it. The viewer
      // opens the file from a `file://` URL.
      onDrop(pathToFileURL(webUtils.getPathForFile(droppedFile)).href);
    }

    event.preventDefault();
    event.stopPropagation();
  });
};
