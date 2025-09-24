/**
 * Custom Overlays Implementation (JavaScript)
 * 
 * This example demonstrates advanced Nutrient Web SDK features:
 * - Custom overlay items that appear on page clicks
 * - Interactive overlays with HTML content
 * - Event handling for page interactions
 * - Dynamic overlay positioning
 */

/**
 * Load a PDF viewer with custom overlays functionality
 * @param {Object} NutrientViewer - The NutrientViewer object (from CDN or import)
 * @param {HTMLElement} container - The container element to mount the viewer
 * @param {string} [document] - URL to the PDF document
 * @returns {Promise} Promise that resolves when the viewer is loaded
 */
export async function loadCustomOverlaysViewer(NutrientViewer, container, document = "https://www.nutrient.io/downloads/nutrient-web-demo.pdf") {
  if (!NutrientViewer) {
    throw new Error('NutrientViewer is required');
  }
  
  // Ensure there's only one NutrientViewer instance
  NutrientViewer.unload(container);

  // Load the viewer with custom overlays configuration
  return load(NutrientViewer, {
    container,
    document,
  });
}

/**
 * Internal load function with custom overlays configuration
 * @param {Object} NutrientViewer - The NutrientViewer object
 * @param {Object} defaultConfiguration - Base configuration object
 */
function load(NutrientViewer, defaultConfiguration) {
  return NutrientViewer.load(defaultConfiguration).then((instance) => {
    console.log("Nutrient Web SDK successfully loaded!!", instance);

    // Every time a user clicks on the page, we show a custom overlay item on
    // this page.
    instance.addEventListener("page.press", (event) => {
      if (event.pageIndex === 0) {
        instance.setCustomOverlayItem(getOverlayItemForPage1(NutrientViewer));
      }

      if (event.pageIndex === 1) {
        instance.setCustomOverlayItem(getOverlayItemForPage2(NutrientViewer));
      }
    });

    return instance;
  });
}

function getOverlayItemForPage1(NutrientViewer) {
  // We create a div element with an emoji and a short text.
  const overlayElement = document.createElement("div");

  overlayElement.style.cssText =
    "width: 300px;background: #FFF; border: 1px #333 solid; font-family: sans-serif; font-size: 14px; padding: 20px;";
  overlayElement.innerHTML =
    "<p>👋 This is an overlay item that appears when clicking on the first page. Find out what happens when you click on the second page.";

  // Then we return a NutrientViewer.CustomOverlayItem which uses the overlayElement
  // that we created above as a node, the pageIndex we get from our onPress
  // event and define the position on the page.
  return new NutrientViewer.CustomOverlayItem({
    id: "overlay-item-first-page",
    node: overlayElement,
    pageIndex: 0,
    position: new NutrientViewer.Geometry.Point({ x: 300, y: 50 }),
  });
}

function getOverlayItemForPage2(NutrientViewer) {
  const overlayElement = document.createElement("div");

  // In this case we embed a video to the page
  overlayElement.innerHTML =
    '<iframe src="https://player.vimeo.com/video/227250697" width="500" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

  // Then we return a NutrientViewer.CustomOverlayItem which uses the overlayElement
  // that we created above as a node, the pageIndex we get from our onPress
  // event and define the position on the page.
  return new NutrientViewer.CustomOverlayItem({
    id: "overlay-item-second-page",
    node: overlayElement,
    pageIndex: 1,
    position: new NutrientViewer.Geometry.Point({ x: 55, y: 220 }),
  });
}

/**
 * Unload the custom overlays viewer from a container
 * @param {Object} NutrientViewer - The NutrientViewer object (from CDN or import)
 * @param {HTMLElement} container - The container element
 */
export async function unloadCustomOverlaysViewer(NutrientViewer, container) {
  if (NutrientViewer) {
    NutrientViewer.unload(container);
  }
}