import { nutrientConfig } from "../nutrient-config.js";

/**
 * Load a PDF viewer with watermark rendering
 * @param nutrientViewer - The NutrientViewer object (from CDN or package)
 * @param container - The container element to mount the viewer
 * @param document - URL to the PDF document
 */
export function loadWatermarksViewer(
  nutrientViewer,
  container,
  document = nutrientConfig.documentUrl,
) {
  const config = {
    container,
    document,
    ...(nutrientConfig.baseUrl && { baseUrl: nutrientConfig.baseUrl }),
  };

  // Load the viewer with watermark configuration
  return load(nutrientViewer, config);
}

/**
 * Internal load function with watermark rendering configuration
 * @param nutrientViewer - The NutrientViewer object
 * @param defaultConfiguration - Base configuration object
 */
async function load(nutrientViewer, defaultConfiguration) {
  return nutrientViewer
    .load({
      ...defaultConfiguration,
      // By using the RenderPageCallback https://www.nutrient.io/api/web/PSPDFKit.html#.RenderPageCallback
      // we can define a canvas that we want to render on a page.
      // This can be used to render watermarks, since it overlays the content
      // and also is part of the printed PDF.
      renderPageCallback(ctx, pageIndex, pageSize) {
        // Add a "Confidential" Watermark in the page
        ctx.translate(pageSize.width / 2 - 325, pageSize.height / 2 + 250);
        ctx.rotate(-0.25 * Math.PI);

        ctx.font = "90px Arial";
        ctx.fillStyle = "rgba(76, 130, 212,.2)";
        ctx.fillText("CONFIDENTIAL", 100, 50);
      },
    })
    .then((instance) => {
      console.log("Nutrient Web SDK successfully loaded with watermarks!!");
      return instance;
    });
}

/**
 * Unload the watermarks viewer from a container
 *
 * @param nutrientViewer - The NutrientViewer object (from CDN or package)
 * @param container - The container element
 */
export function unloadWatermarksViewer(nutrientViewer, container) {
  nutrientViewer.unload(container);
}
