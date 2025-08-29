/**
 * Utility functions for file handling
 */

/**
 * Converts a file to an ArrayBuffer and resolves the promise with it.
 * Used when a file is dropped or selected via the file picker.
 *
 * @param {File} file - The file to convert
 * @returns {Promise<ArrayBuffer>} Promise that resolves with the file as ArrayBuffer
 */
export function fileToArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    if (file.type !== "application/pdf") {
      reject(new Error("Invalid file type. Please load a PDF file."));
      return;
    }

    const reader = new FileReader();

    reader.addEventListener("load", (event) => {
      resolve(event.target.result);
    });

    reader.addEventListener("error", (error) => {
      reject(new Error(`Failed to read file: ${error}`));
    });

    reader.readAsArrayBuffer(file);
  });
}

/**
 * Processes multiple files and converts them to ArrayBuffers
 *
 * @param {File[]} files - Array of files to process
 * @returns {Promise<ArrayBuffer[]>} Promise that resolves with array of ArrayBuffers
 */
export function processFiles(files) {
  return Promise.all(files.map(fileToArrayBuffer));
}
