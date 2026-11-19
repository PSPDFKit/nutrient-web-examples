/**
 * Calls `onDrop` for PDFs backed by a file on disk for the window lifetime.
 */
export function dragAndDrop(onDrop) {
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

      const fileUrl = window.electron.getFileUrl(droppedFile);
      if (fileUrl) {
        onDrop(fileUrl);
      }
    }

    event.preventDefault();
    event.stopPropagation();
  }

  window.addEventListener("dragover", handleDragOver);
  window.addEventListener("drop", handleDrop);
}
