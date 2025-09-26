import { nutrientConfig } from "../nutrient-config.js";

/**
 * Load a magazine-style PDF viewer with advanced features
 * @param nutrientViewer - The NutrientViewer object (from CDN or package)
 * @param container - The container element to mount the viewer
 * @param document - URL to the PDF document
 */
export function loadMagazineViewer(
  nutrientViewer,
  container,
  document = nutrientConfig.documentUrl,
) {
  const config = {
    container,
    document,
    ...(nutrientConfig.baseUrl && { baseUrl: nutrientConfig.baseUrl }),
  };

  // Load the viewer with magazine-specific configuration
  return load(nutrientViewer, config);
}

/**
 * Internal load function with magazine-specific configuration
 * @param nutrientViewer - The NutrientViewer object
 * @param defaultConfiguration - Base configuration object
 */
async function load(nutrientViewer, defaultConfiguration) {
  const initialViewState = new nutrientViewer.ViewState({
    scrollMode: nutrientViewer.ScrollMode.PER_SPREAD,
    layoutMode: nutrientViewer.LayoutMode.DOUBLE,
    keepFirstSpreadAsSinglePage: true,
  });

  // A custom toolbar item to toggle full screen mode
  const fullScreenToolbarItem = {
    type: "custom",
    title: "Toggle full screen mode",
    onPress: () => {
      // We use the parent container of our mount node. This is necessary for
      // the iOS specific fixes applied in the iOSFullscreenFix() function.
      const container = defaultConfiguration.container.parentNode;

      if (isFullscreenEnabled()) {
        exitFullscreen();
      } else {
        requestFullScreen(container);
      }
    },
  };

  // Customize the toolbar
  const toolbarItems = [
    { type: "sidebar-bookmarks", dropdownGroup: null },
    { type: "sidebar-thumbnails", dropdownGroup: null },
    { type: "highlighter" },
    { type: "zoom-in" },
    { type: "zoom-out" },
    { type: "spacer" },
    { type: "search" },
  ];

  // Only add the fullscreenToolbarItem if the browser supports fullscreen mode
  if (isFullScreenSupported()) {
    toolbarItems.push(fullScreenToolbarItem);
  }

  return nutrientViewer
    .load({
      ...defaultConfiguration,
      toolbarPlacement: nutrientViewer.ToolbarPlacement.BOTTOM,
      initialViewState,
      toolbarItems,
    })
    .then((instance) => {
      console.log(
        "Nutrient Web SDK successfully loaded!!",
        instance,
        "\\nWhen fullscreen is supported the toolbar should be placed to the bottom to improve usability",
      );

      return instance;
    });
}

/**
 * Check if fullscreen is currently enabled
 */
function isFullscreenEnabled() {
  return !!(
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  );
}

/**
 * Check if fullscreen is supported by the browser
 */
function isFullScreenSupported() {
  return !!(
    document.fullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.msFullScreenEnabled ||
    document.webkitFullscreenEnabled
  );
}

/**
 * Request fullscreen mode with cross-browser compatibility
 * @param element - Element to make fullscreen
 */
function requestFullScreen(element) {
  iOSFullscreenFix(element);

  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

/**
 * Exit fullscreen mode with cross-browser compatibility
 */
function exitFullscreen() {
  if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

/**
 * On iOS we have to make some tweaks to the element since the platform will
 * overlay specific controls.
 *
 * We add padding top so that the element is pushed to the bottom and add a
 * background color so that the controls become visible.
 * @param element - Element to apply iOS fixes to
 */
function iOSFullscreenFix(element) {
  const iOS =
    !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

  if (!iOS) {
    return;
  }

  let firstInvocation = true;

  function cleanup() {
    if (firstInvocation) {
      element.style.paddingTop = "76px";
      element.style.backgroundColor = "black";
      firstInvocation = false;

      return;
    }

    element.style.paddingTop = "0";
    element.style.backgroundColor = "transparent";
    document.removeEventListener("webkitfullscreenchange", cleanup);
  }

  document.addEventListener("webkitfullscreenchange", cleanup);
}

/**
 * Unload the magazine viewer from a container
 *
 * @param nutrientViewer - The NutrientViewer object (from CDN)
 * @param container - The container element
 */
export function unloadMagazineViewer(nutrientViewer, container) {
  nutrientViewer.unload(container);
}
