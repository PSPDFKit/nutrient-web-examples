/**
 * Basic Nutrient Viewer Implementation
 *
 * This is the simplest way to load a PDF document with Nutrient Web SDK.
 * Framework implementations should import this and call loadBasicViewer() with their container element.
 */

/**
 * Load a basic PDF viewer
 * @param {Object} NutrientViewer - The NutrientViewer object (from CDN or import)
 * @param {HTMLElement} container - The container element to mount the viewer
 * @param {string} [document] - URL to the PDF document
 * @returns {Promise} Promise that resolves when the viewer is loaded
 */
export async function loadBasicViewer(
  NutrientViewer,
  container,
  document = "https://www.nutrient.io/downloads/nutrient-web-demo.pdf",
) {
  if (!NutrientViewer) {
    throw new Error("NutrientViewer is required");
  }

  // Ensure there's only one NutrientViewer instance
  NutrientViewer.unload(container);

  // Load the viewer with basic configuration
  return NutrientViewer.load({
    container,
    document,
  });
}

/**
 * Unload the viewer from a container
 * @param {Object} NutrientViewer - The NutrientViewer object (from CDN or import)
 * @param {HTMLElement} container - The container element
 */
export async function unloadBasicViewer(NutrientViewer, container) {
  if (NutrientViewer) {
    NutrientViewer.unload(container);
  }
}
