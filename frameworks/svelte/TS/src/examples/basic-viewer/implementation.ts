/**
 * Basic Nutrient Viewer Implementation for React (TypeScript)
 *
 * This is the simplest way to load a PDF document with Nutrient Web SDK.
 */

import type NutrientViewer from "frameworks/next/ts/node_modules/@nutrient-sdk/viewer/dist";

/**
 * Load a basic PDF viewer
 * @param nutrientViewer - The NutrientViewer object (from CDN)
 * @param container - The container element to mount the viewer
 * @param document - URL to the PDF document
 * @returns Promise that resolves when the viewer is loaded
 */
export function loadBasicViewer(
  nutrientViewer: typeof NutrientViewer,
  container: HTMLElement,
  document = "https://www.nutrient.io/downloads/nutrient-web-demo.pdf",
) {
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
export function unloadBasicViewer(
  nutrientViewer: typeof NutrientViewer,
  container: HTMLElement,
) {
  nutrientViewer.unload(container);
}
