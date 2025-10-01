/**
 * Basic Nutrient Viewer Implementation for Vanilla JavaScript
 *
 * This is the simplest way to load a PDF document with Nutrient Web SDK.
 */

import { nutrientConfig } from "../nutrient-config.js";

/**
 * Load a basic PDF viewer
 * @param nutrientViewer - The NutrientViewer object (from CDN or package)
 * @param container - The container element to mount the viewer
 * @param document - URL to the PDF document
 * @returns Promise that resolves when the viewer is loaded
 */
export function loadBasicViewer(
  nutrientViewer,
  container,
  document = nutrientConfig.documentUrl,
) {
  const config = {
    container,
    document,
    ...(nutrientConfig.baseUrl && { baseUrl: nutrientConfig.baseUrl }),
  };

  return nutrientViewer.load(config);
}

/**
 * Unload the viewer from a container
 * @param nutrientViewer - The nutrientViewer object (from CDN)
 * @param container - The container element
 */
export function unloadBasicViewer(nutrientViewer, container) {
  nutrientViewer.unload(container);
}
