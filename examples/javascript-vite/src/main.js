/**
 * Main application entry file for Nutrient Web SDK with Vite.
 *
 * This example supports both CDN and npm package loading approaches:
 * - CDN: Uses global window.NutrientViewer (default)
 * - npm package: Uses ES6 import (when USE_NPM=true)
 *
 * Features:
 * - Drag and drop PDF loading
 * - File picker for PDF selection
 * - Tracks unsaved annotations
 * - Loads a default sample PDF on page load
 */

import dragDrop from "drag-drop";
import { processFiles } from "./utils.js";

// Dynamic import for npm package mode
let NutrientViewer;

// Check if running in npm mode (USE_NPM environment variable)
const isNpmMode = import.meta.env.VITE_USE_NPM === "true";

// Initialize NutrientViewer based on the mode
async function initializeNutrientViewer() {
  if (isNpmMode) {
    // Use npm package
    const module = await import("@nutrient-sdk/viewer");
    NutrientViewer = module.default;
  } else {
    // Use CDN version (global)
    NutrientViewer = window.NutrientViewer;
  }

  if (!NutrientViewer) {
    console.error("NutrientViewer not found. Please check your installation.");
    return false;
  }
  return true;
}

let hasUnsavedAnnotations = false;
let isAlreadyLoaded = false;
let currentInstance = null;

// Load the default sample PDF on page load
window.addEventListener("DOMContentLoaded", async () => {
  const initialized = await initializeNutrientViewer();
  if (initialized) {
    loadDefaultPDF();
  }
});

/**
 * Loads the default sample PDF from the public/assets folder
 */
async function loadDefaultPDF() {
  try {
    const response = await fetch("/assets/nutrient-web-demo.pdf");
    const arrayBuffer = await response.arrayBuffer();
    load([arrayBuffer]);
  } catch (error) {
    console.error("Failed to load default PDF:", error);
    console.log("You can still upload your own PDF using the controls above.");
  }
}

/**
 * Creates an onAnnotationsChange handler that keeps track of changes.
 * Skips the first call since `annotations.change` fires when the PDF viewer
 * is initialized and populated with annotations.
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
 */
async function load(pdfArrayBuffers) {
  const pdfArrayBuffer = pdfArrayBuffers[0];

  if (isAlreadyLoaded && currentInstance) {
    console.info("Destroyed previous instance");
    NutrientViewer.unload(".App");
    hasUnsavedAnnotations = false;
    currentInstance = null;
  }

  isAlreadyLoaded = true;

  const configuration = {
    container: ".App",
    document: pdfArrayBuffer,
  };

  // Add baseUrl for npm mode
  if (isNpmMode) {
    configuration.baseUrl = `${window.location.protocol}//${window.location.host}/`;
  }

  try {
    currentInstance = await NutrientViewer.load(configuration);
    currentInstance.addEventListener(
      "annotations.change",
      createOnAnnotationsChange(),
    );
    console.log("Nutrient loaded", currentInstance);
  } catch (error) {
    console.error("Failed to load Nutrient:", error);
    isAlreadyLoaded = false;
  }
}

/**
 * Helper functions for file handling
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
 * Handle drag and drop functionality
 */
const destroyListener = dragDrop("body", {
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

/**
 * Handle file picker functionality
 */
document.querySelector("#selectFile").addEventListener("change", (event) => {
  if (!event.target.files.length || shouldPreventLoad()) {
    event.target.value = null;
    return;
  }

  processFiles([...event.target.files])
    .then((arrayBuffers) => {
      load(arrayBuffers);
    })
    .catch(onFail);

  event.target.value = null;
});

