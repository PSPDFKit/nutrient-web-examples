/**
 * Initializes drag and drop handlers for a given `PSPDFKit.Instance`. When a
 * file is detected, the `onDrop` handler will be called.
 */
export function dragAndDrop(instance, onDrop) {
  instance.contentWindow.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
  instance.contentWindow.addEventListener("drop", (event) => {
    if (event?.dataTransfer?.files?.length) {
      const file = event.dataTransfer.files[0].path;

      if (event.dataTransfer.files[0].type !== "application/pdf") {
        return;
      }

      onDrop(file);
    }

    event.preventDefault();
    event.stopPropagation();
  });
}
