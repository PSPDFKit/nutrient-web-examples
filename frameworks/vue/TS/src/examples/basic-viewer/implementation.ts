/**
 * Basic Nutrient Viewer Implementation (TypeScript)
 *
 * This is the simplest way to load a PDF document with Nutrient Web SDK.
 * Framework implementations should import this and call loadBasicViewer() with their container element.
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
  if (!nutrientViewer) {
    throw new Error("nutrientViewer is required");
  }

  // Ensure there's only one nutrientViewer instance
  nutrientViewer.unload(container);

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
  if (nutrientViewer) {
    nutrientViewer.unload(container);
  }
}
