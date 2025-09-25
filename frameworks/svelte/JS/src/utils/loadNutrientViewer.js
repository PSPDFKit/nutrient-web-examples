/**
 * Nutrient Viewer Loader Abstraction
 *
 * This utility provides a consistent way to load NutrientViewer regardless of installation method.
 * For CDN installations, it retrieves from window object.
 * For package installations, it imports from @nutrient-sdk/viewer.
 */

/**
 * Load NutrientViewer instance
 * @returns Promise that resolves to NutrientViewer instance
 * @throws Error if NutrientViewer cannot be loaded
 */
export async function loadNutrientViewer() {
  // For CDN installation: wait for and get from window object
  const waitForNutrientViewer = () => {
    return new Promise((resolve, reject) => {
      // Check if already available
      if (window.NutrientViewer) {
        resolve(window.NutrientViewer);
        return;
      }

      // Find the Nutrient script tag
      const script = document.querySelector('script[src*="nutrient-viewer"]');

      if (script) {
        // If script exists but hasn't loaded yet
        script.addEventListener("load", () => {
          if (window.NutrientViewer) {
            resolve(window.NutrientViewer);
          } else {
            reject(new Error("Script loaded but NutrientViewer not found"));
          }
        });

        script.addEventListener("error", () => {
          reject(new Error("Failed to load Nutrient Web SDK from CDN"));
        });

        // Handle case where script already loaded but event didn't fire
        if (script.complete) {
          setTimeout(() => {
            if (window.NutrientViewer) {
              resolve(window.NutrientViewer);
            } else {
              reject(
                new Error(
                  "Script appears loaded but NutrientViewer not available",
                ),
              );
            }
          }, 0);
        }
      } else {
        reject(new Error("Nutrient Web SDK script tag not found"));
      }
    });
  };

  return await waitForNutrientViewer();
}
