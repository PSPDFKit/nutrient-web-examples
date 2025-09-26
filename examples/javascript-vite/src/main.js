/**
 * Main application entry file for Nutrient Web SDK with Vite.
 *
 * This example supports both CDN and npm package loading approaches:
 * - CDN: Uses global window.NutrientViewer (default)
 * - npm package: Uses ES6 import (when USE_NPM=true)
 *
 * Features:
 * - Loads a default sample PDF on page load
 * - Simple button to load another document
 */

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

let currentInstance = null;

// Load the default sample PDF on page load
window.addEventListener("DOMContentLoaded", async () => {
  const initialized = await initializeNutrientViewer();
  if (initialized) {
    loadDocument("nutrient-web-demo.pdf");
  }
});

/**
 * Loads a PDF document from the public/assets folder
 * @param {string} documentName - The name of the PDF file to load
 */
async function loadDocument(documentName) {
  if (currentInstance) {
    console.info("Destroyed previous instance");
    NutrientViewer.unload(".App");
    currentInstance = null;
  }

  const configuration = {
    container: ".App",
    document: `/assets/${documentName}`,
  };

  // Add baseUrl for npm mode
  if (isNpmMode) {
    configuration.baseUrl = `${window.location.protocol}//${window.location.host}/`;
  }

  try {
    currentInstance = await NutrientViewer.load(configuration);
    console.log("Nutrient loaded", currentInstance);
  } catch (error) {
    console.error("Failed to load Nutrient:", error);
  }
}

// Add button handler for switching documents
document.addEventListener("DOMContentLoaded", () => {
  const openButton = document.querySelector("#openAnotherDoc");
  if (openButton) {
    openButton.addEventListener("click", () => {
      // Switch to another document (you can change this filename as needed)
      loadDocument("another-example.pdf");
    });
  }
});
