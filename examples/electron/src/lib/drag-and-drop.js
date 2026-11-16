/**
 * Initializes drag and drop handlers for a given `NutrientViewer.Instance`. When a
 * file is detected, the `onDrop` handler will be called.
 */
export function dragAndDrop(instance, onDrop) {
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

      onDrop(window.electron.getFileUrl(droppedFile));
    }

    event.preventDefault();
    event.stopPropagation();
  });
}
