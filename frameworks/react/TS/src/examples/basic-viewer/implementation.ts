/**
 * Basic Nutrient Viewer Implementation for React (TypeScript)
 *
 * This is the simplest way to load a PDF document with Nutrient Web SDK.
 */

import type NutrientViewer from "@nutrient-sdk/viewer";

/**
 * Load a basic PDF viewer
 * @param nutrientViewer - The NutrientViewer object (from CDN)
 * @param container - The container element to mount the viewer
 * @param document - URL to the PDF document
 * @returns Promise that resolves when the viewer is loaded
 */
export async function loadBasicViewer(
  nutrientViewer: typeof NutrientViewer,
  container: HTMLElement,
  document = "https://www.nutrient.io/downloads/nutrient-web-demo.pdf",
) {
  // Ensure there's only one nutrientViewer instance - be defensive about cleanup
  try {
    await nutrientViewer.unload(container);
    // Wait a bit to ensure cleanup is complete
    await new Promise((resolve) => setTimeout(resolve, 100));
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
export async function unloadBasicViewer(
  nutrientViewer: typeof NutrientViewer,
  container: HTMLElement,
) {
  if (nutrientViewer && container) {
    try {
      await nutrientViewer.unload(container);
    } catch (error) {
      console.debug("Container unload error (may be expected):", error);
    }
  }
}
