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
  // For CDN installation: wait for and get from window object
  const waitForNutrientViewer = (): Promise<typeof NutrientViewer> => {
    return new Promise((resolve, reject) => {
      // Check if already available
      if (window.NutrientViewer) {
        resolve(window.NutrientViewer);
        return;
      }

      // Wait for CDN script to load
      let attempts = 0;
      const maxAttempts = 50; // 5 seconds total (50 * 100ms)

      const checkInterval = setInterval(() => {
        attempts++;

        if (window.NutrientViewer) {
          clearInterval(checkInterval);
          resolve(window.NutrientViewer);
        } else if (attempts >= maxAttempts) {
          clearInterval(checkInterval);
          reject(
            new Error(
              "NutrientViewer is not available. Make sure the Nutrient Web SDK is properly loaded via CDN.",
            ),
          );
        }
      }, 100);
    });
  };

  return await waitForNutrientViewer();
}
