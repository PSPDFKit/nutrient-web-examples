/**
 * Basic Nutrient Viewer Implementation for Svelte (JavaScript)
 *
 * This is the simplest way to load a PDF document with Nutrient Web SDK.
 */

/**
 * Load a basic PDF viewer
 * @param nutrientViewer - The NutrientViewer object (from CDN)
 * @param container - The container element to mount the viewer
 * @param document - URL to the PDF document
 * @returns Promise that resolves when the viewer is loaded
 */
export async function loadBasicViewer(
  nutrientViewer,
  container,
  document = "https://www.nutrient.io/downloads/nutrient-web-demo.pdf",
) {
  // Ensure there's only one nutrientViewer instance - be defensive about cleanup
  try {
    await nutrientViewer.unload(container);
  } catch (error) {
    // Ignore unload errors - container might not have an instance
    console.debug(
      "Container unload (expected if no previous instance):",
      error,
    );
  }

  // Load the viewer with basic configuration
  return nutrientViewer.load({
    container,
    document,
  });
}

/**
 * Unload the viewer from a container
 * @param nutrientViewer - The nutrientViewer object (from CDN)
 * @param container - The container element
 */
export async function unloadBasicViewer(nutrientViewer, container) {
  if (nutrientViewer && container) {
    try {
      await nutrientViewer.unload(container);
    } catch (error) {
      console.debug("Container unload error (may be expected):", error);
    }
  }
}
