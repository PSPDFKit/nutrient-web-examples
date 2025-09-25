/**
 * Load a PDF viewer with custom overlays functionality
 * @param nutrientViewer - The NutrientViewer object (from CDN)
 * @param container - The container element to mount the viewer
 * @param document - URL to the PDF document
 * @returns Promise that resolves when the viewer is loaded
 */
export async function loadCustomOverlaysViewer(
  nutrientViewer,
  container,
  document = "https://www.nutrient.io/downloads/nutrient-web-demo.pdf",
) {
  if (!nutrientViewer) {
    throw new Error("NutrientViewer is required");
  }

  // Ensure there's only one NutrientViewer instance
  nutrientViewer.unload(container);

  // Load the viewer with custom overlays configuration
  return load(nutrientViewer, {
    container,
    document,
  });
}

/**
 * Internal load function with custom overlays configuration
 * @param nutrientViewer - The NutrientViewer object
 * @param defaultConfiguration - Base configuration object
 */
function load(nutrientViewer, defaultConfiguration) {
  return nutrientViewer.load(defaultConfiguration).then((instance) => {
    console.log("Nutrient Web SDK successfully loaded!!", instance);

    // Every time a user clicks on the page, we show a custom overlay item on
    // this page.
    instance.addEventListener("page.press", (event) => {
      if (event.pageIndex === 0) {
        instance.setCustomOverlayItem(getOverlayItemForPage1(nutrientViewer));
      }

      if (event.pageIndex === 1) {
        instance.setCustomOverlayItem(getOverlayItemForPage2(nutrientViewer));
      }
    });

    return instance;
  });
}

function getOverlayItemForPage1(nutrientViewer) {
  // We create a div element with an emoji and a short text.
  const overlayElement = document.createElement("div");

  overlayElement.style.cssText =
    "width: 300px;background: #FFF; border: 1px #333 solid; font-family: sans-serif; font-size: 14px; padding: 20px;";
  overlayElement.innerHTML =
    "<p>👋 This is an overlay item that appears when clicking on the first page. Find out what happens when you click on the second page.";

  // Then we return a NutrientViewer.CustomOverlayItem which uses the overlayElement
  // that we created above as a node, the pageIndex we get from our onPress
  // event and define the position on the page.
  return new nutrientViewer.CustomOverlayItem({
    id: "overlay-item-first-page",
    node: overlayElement,
    pageIndex: 0,
    position: new nutrientViewer.Geometry.Point({ x: 300, y: 50 }),
  });
}

function getOverlayItemForPage2(nutrientViewer) {
  const overlayElement = document.createElement("div");

  // In this case we embed a video to the page
  overlayElement.innerHTML =
    '<iframe src="https://player.vimeo.com/video/227250697" width="500" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

  // Then we return a NutrientViewer.CustomOverlayItem which uses the overlayElement
  // that we created above as a node, the pageIndex we get from our onPress
  // event and define the position on the page.
  return new nutrientViewer.CustomOverlayItem({
    id: "overlay-item-second-page",
    node: overlayElement,
    pageIndex: 1,
    position: new nutrientViewer.Geometry.Point({ x: 55, y: 220 }),
  });
}

/**
 * Unload the custom overlays viewer from a container
 * @param nutrientViewer - The NutrientViewer object (from CDN)
 * @param container - The container element
 */
export async function unloadCustomOverlaysViewer(nutrientViewer, container) {
  if (nutrientViewer) {
    nutrientViewer.unload(container);
  }
}
