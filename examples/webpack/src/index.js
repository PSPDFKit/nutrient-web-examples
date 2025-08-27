/**
 * Application entry file.
 *
 * We create a drag and drop area and a file picker that are used to load PDFs.
 * Once a PDF is dropped or selected we read it from disk as an ArrayBuffer
 * which we can then pass to NutrientViewer.load() to initialize the viewer with the given PDF.
 *
 * This example supports both CDN and npm package loading approaches:
 * - CDN: Uses global window.NutrientViewer (default)
 * - npm package: Uses ES6 import (fallback when CDN not available)
 *
 * We also add an `Export PDF` button to the main toolbar and monitor changes to
 * inform the users when they are about to leave the page or open a new document
 * and there is unsaved(exported) work.
 */

import NutrientViewerNpm from "@nutrient-sdk/viewer";
import dragDrop from "drag-drop";
import { processFiles } from "./lib/utils";

// Use CDN version if available (global), otherwise use npm package
const NutrientViewer =
  typeof window !== "undefined" && window.NutrientViewer
    ? window.NutrientViewer
    : NutrientViewerNpm;

let hasUnsavedAnnotations = false;
let isAlreadyLoaded = false;

// Load the default sample PDF on page load
window.addEventListener("DOMContentLoaded", () => {
  loadDefaultPDF();
});

/**
 * Loads the default sample PDF from the assets folder
 */
function loadDefaultPDF() {
  fetch("./assets/nutrient-web-demo.pdf")
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => {
      load([arrayBuffer]);
    })
    .catch((error) => {
      console.error("Failed to load default PDF:", error);
      // If default PDF fails to load, show a fallback message
      console.log(
        "You can still upload your own PDF using the controls above.",
      );
    });
}

/**
 * Creates an onAnnotationsChange handler that
 * keeps track of changes.
 *
 * We skip the first call since `annotations.change` fires
 * when the PDF viewer is initialized and populated with annotations.
 */
const createOnAnnotationsChange = () => {
  let initialized = false;

  return () => {
    if (initialized) {
      hasUnsavedAnnotations = true;
    } else {
      initialized = true;
    }
  };
};

/**
 * Main load function invoked when a dropped or selected file (PDF)
 * has been successfully read as ArrayBuffer.
 *
 * If there is an existing running instance of Nutrient it is destroyed
 * before a creating a new one.
 */
function load(pdfArrayBuffers) {
  const pdfArrayBuffer = pdfArrayBuffers[0];

  if (isAlreadyLoaded) {
    console.info("Destroyed previous instance");
    NutrientViewer.unload(".App");
    hasUnsavedAnnotations = false;
  }

  isAlreadyLoaded = true;

  const configuration = {
    container: ".App",
    document: pdfArrayBuffer,
  };

  NutrientViewer.load(configuration)
    .then((instance) => {
      instance.addEventListener(
        "annotations.change",
        createOnAnnotationsChange(),
      );
    })
    .catch(console.error);
}

/**
 * The code present below is not required to make Nutrient work. They just provide the file picking
 * and drag n drop functionality.
 */

function onFail({ message }) {
  alert(message);
}

function shouldPreventLoad() {
  return (
    hasUnsavedAnnotations &&
    !window.confirm(
      "You have unsaved changes. By continuing, you will lose those changes.",
    )
  );
}

/**
 * This code handles drag and drop behaviour. Users can drag and drop multiple PDFs
 * throughout the session.
 */
let destroyListener = dragDrop("#body", {
  onDrop: (files) => {
    if (shouldPreventLoad()) {
      return;
    }

    processFiles(files)
      .then((arrayBuffers) => {
        load(arrayBuffers);
      })
      .catch(onFail);
  },
});

function _destroyDragAndDrop() {
  if (destroyListener) {
    destroyListener();
    destroyListener = null;
  }
}

/**
 * The code below handles the file picket via the systems's default File Picker.
 */
function onFileSelectSuccess(pdfArrayBuffers) {
  load(pdfArrayBuffers);
}

document.querySelector("#selectFile").addEventListener("change", (event) => {
  if (!event.target.files.length || shouldPreventLoad()) {
    event.target.value = null;

    return;
  }

  processFiles([...event.target.files])
    .then(onFileSelectSuccess)
    .catch(onFail);

  event.target.value = null;
});
