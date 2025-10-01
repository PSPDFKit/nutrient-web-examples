/**
 * Magazine Mode Implementation for Vanilla TypeScript
 *
 * Demonstrates a magazine-style reading experience with custom toolbar
 */

import type NutrientViewer from "@nutrient-sdk/viewer";
import { nutrientConfig } from "../nutrient-config";

/**
 * Load the viewer in magazine mode
 * @param nutrientViewer - The NutrientViewer object
 * @param container - The container element
 * @param document - URL to the PDF document
 */
export function loadMagazineModeViewer(
  nutrientViewer: typeof NutrientViewer,
  container: HTMLElement,
  document = nutrientConfig.documentUrl,
) {
  const config = {
    container,
    document,
    layoutMode: nutrientViewer.LayoutMode.DOUBLE,
    scrollMode: nutrientViewer.ScrollMode.CONTINUOUS,
    ...(nutrientConfig.baseUrl && { baseUrl: nutrientConfig.baseUrl }),
  };

  return nutrientViewer.load(config);
}

/**
 * Unload the viewer from a container
 * @param nutrientViewer - The NutrientViewer object
 * @param container - The container element
 */
export function unloadMagazineModeViewer(
  nutrientViewer: typeof NutrientViewer,
  container: HTMLElement,
) {
  nutrientViewer.unload(container);
}
