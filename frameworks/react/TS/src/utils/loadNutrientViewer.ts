/**
 * Nutrient Viewer Loader Abstraction
 *
 * This utility provides a consistent way to load NutrientViewer regardless of installation method.
 * For CDN installations, it retrieves from window object.
 * For package installations, it imports from @nutrient-sdk/viewer.
 */

import type NutrientViewer from "@nutrient-sdk/viewer";

/**
 * Load NutrientViewer instance
 * @returns Promise that resolves to NutrientViewer instance
 * @throws Error if NutrientViewer cannot be loaded
 */
export async function loadNutrientViewer(): Promise<typeof NutrientViewer> {
  // For CDN installation: get from window object
  const { NutrientViewer } = window;

  if (!NutrientViewer) {
    throw new Error(
      "NutrientViewer is not available. Make sure the Nutrient Web SDK is properly loaded via CDN.",
    );
  }

  return NutrientViewer;
}
