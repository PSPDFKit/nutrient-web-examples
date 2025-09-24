const { ipcRenderer } = require("electron");
const fs = require("node:fs");

/**
 * Create a document picker used to select PDF files.
 *
 * Will invoke `onPicked`, when the operation is complete.
 */
async function documentImport(onPicked) {
  // Show the native open dialog.
  const openDialogResult = await ipcRenderer.invoke("showOpenDialog", {
    properties: ["openFile"],
    filters: [{ name: "PDF Documents", extensions: ["pdf"] }],
  });

  const filePaths = openDialogResult.filePaths;

  if (filePaths && filePaths.length > 0) {
    onPicked(filePaths[0]);
  }
}

/**
 * Use the native document picker to save the resulting PDF file of the given `NutrientViewer.Instance`.
 *
 * Will invoke `onDone`, when the operation is complete.
 */
async function documentExport(instance, onDone) {
  // Show the native save dialog.
  const saveDialogResult = await ipcRenderer.invoke("showSaveDialog", {
    title: "Export PDF",
    filters: [{ name: "PDF Documents", extensions: ["pdf"] }],
  });

  if (saveDialogResult.filePath) {
    const filePath = saveDialogResult.filePath;

    try {
      const arrayBuffer = await instance.exportPDF();

      fs.writeFile(filePath, Buffer.from(arrayBuffer), (error) => {
        if (error) {
          alert(
            `There was an error while trying to write to ${filePath}\n\n${error.message}`,
          );
        } else {
          onDone();
        }
      });
    } catch (error) {
      alert(
        `There was an error while trying to export to ${filePath}\n\n${error.message}`,
      );
    }
  }
}

async function askUserToDiscardChanges(onYes) {
  // Show the native message box.
  const messageBoxReturnValue = await ipcRenderer.invoke("showMessageBox", {
    type: "question",
    buttons: ["Yes", "No"],
    title: "Discard changes?",
    message:
      "You have unsaved changes. Do you wish to discard them and open a new document?",
  });

  if (messageBoxReturnValue.response === 0) {
    // User answered, yes.
    onYes();
  }
}

module.exports = {
  documentImport,
  documentExport,
  askUserToDiscardChanges,
};
