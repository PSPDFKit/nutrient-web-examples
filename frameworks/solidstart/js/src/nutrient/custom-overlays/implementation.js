/**
 * Custom Overlays Implementation for SolidStart (JavaScript)
 *
 * Demonstrates interactive overlays that appear on page clicks
 */

import { nutrientConfig } from "../nutrient-config.js";

/**
 * Load the viewer with custom overlay functionality
 * @param nutrientViewer - The NutrientViewer object
 * @param container - The container element
 * @param document - URL to the PDF document
 */
export async function loadCustomOverlaysViewer(
  nutrientViewer,
  container,
  document = nutrientConfig.documentUrl,
) {
  const config = {
    container,
    document,
    ...(nutrientConfig.baseUrl && { baseUrl: nutrientConfig.baseUrl }),
  };

  const instance = await nutrientViewer.load(config);

  // Add click event listener for custom overlays
  instance.addEventListener("page.click", (event) => {
    const { pageIndex, point } = event;

    // Create overlay content
    const overlayElement = document.createElement("div");
    overlayElement.innerHTML = `
      <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
        <h3 style="margin: 0 0 10px 0;">Page ${pageIndex + 1}</h3>
        <p style="margin: 0;">Clicked at: (${Math.round(point.x)}, ${Math.round(
          point.y,
        )})</p>
        <button id="close-overlay" style="margin-top: 10px; padding: 5px 10px;">Close</button>
      </div>
    `;

    // Add overlay to the instance
    const overlay = new nutrientViewer.Overlay({
      element: overlayElement,
      pageIndex,
      position: point,
      onDisappear: () => overlay.remove(),
    });

    // Close button handler
    overlayElement
      .querySelector("#close-overlay")
      .addEventListener("click", () => {
        overlay.remove();
      });

    instance.setCustomOverlayItem(overlay);
  });

  return instance;
}

/**
 * Unload the viewer from a container
 * @param nutrientViewer - The NutrientViewer object
 * @param container - The container element
 */
export function unloadCustomOverlaysViewer(nutrientViewer, container) {
  nutrientViewer.unload(container);
}
