/**
 * Magazine Mode Implementation (TypeScript)
 *
 * This example demonstrates advanced Nutrient Web SDK features:
 * - Custom view state (double page layout)
 * - Custom toolbar configuration
 * - Fullscreen support with cross-browser compatibility
 * - iOS-specific fullscreen handling
 */

import NutrientViewer, { Configuration } from "@nutrient-sdk/viewer";

/**
 * Load a magazine-style PDF viewer with advanced features
 * @param NutrientViewer - The NutrientViewer object (from CDN or import)
 * @param container - The container element to mount the viewer
 * @param document - URL to the PDF document
 * @returns Promise that resolves when the viewer is loaded
 */
export async function loadMagazineViewer(
  nutrientViewer: typeof NutrientViewer,
  container: HTMLElement,
  document: string = "https://www.nutrient.io/downloads/nutrient-web-demo.pdf"
) {
  if (!nutrientViewer) {
    throw new Error("NutrientViewer is required");
  }

  // Ensure there's only one NutrientViewer instance
  nutrientViewer.unload(container);

  // Load the viewer with magazine-specific configuration
  return load(nutrientViewer, {
    container,
    document,
  });
}

/**
 * Internal load function with magazine-specific configuration
 * @param NutrientViewer - The NutrientViewer object
 * @param defaultConfiguration - Base configuration object
 */
function load(
  nutrientViewer: typeof NutrientViewer,
  defaultConfiguration: Configuration
) {
  return Promise.resolve().then(() => {
    // Disable continuous scroll and default to double page mode
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
        const containerElement = defaultConfiguration.container instanceof HTMLElement 
          ? defaultConfiguration.container 
          : document.getElementById(defaultConfiguration.container as string);
        const container = containerElement?.parentNode as HTMLElement;

        if (isFullscreenEnabled()) {
          exitFullscreen();
        } else {
          requestFullScreen(container);
        }
      },
    };

    // Customize the toolbar
    let toolbarItems = [
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

    return nutrientViewer.load({
      ...defaultConfiguration,
      toolbarPlacement: nutrientViewer.ToolbarPlacement.BOTTOM,
      initialViewState,
      toolbarItems,
    }).then((instance) => {
      console.log(
        "Nutrient Web SDK successfully loaded!!",
        instance,
        "\\nWhen fullscreen is supported the toolbar should be placed to the bottom to improve usability"
      );

      return instance;
    });
  });
}

/**
 * Check if fullscreen is currently enabled
 */
function isFullscreenEnabled(): boolean {
  return !!(
    document.fullscreenElement ||
    (document as any).mozFullScreenElement ||
    (document as any).webkitFullscreenElement ||
    (document as any).msFullscreenElement
  );
}

/**
 * Check if fullscreen is supported by the browser
 */
function isFullScreenSupported(): boolean {
  return !!(
    document.fullscreenEnabled ||
    (document as any).mozFullScreenEnabled ||
    (document as any).msFullScreenEnabled ||
    (document as any).webkitFullscreenEnabled
  );
}

/**
 * Request fullscreen mode with cross-browser compatibility
 * @param element - Element to make fullscreen
 */
function requestFullScreen(element: HTMLElement): void {
  iOSFullscreenFix(element);

  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if ((element as any).mozRequestFullScreen) {
    (element as any).mozRequestFullScreen();
  } else if ((element as any).webkitRequestFullscreen) {
    (element as any).webkitRequestFullscreen();
  } else if ((element as any).msRequestFullscreen) {
    (element as any).msRequestFullscreen();
  }
}

/**
 * Exit fullscreen mode with cross-browser compatibility
 */
function exitFullscreen(): void {
  if ((document as any).webkitExitFullscreen) {
    (document as any).webkitExitFullscreen();
  } else if ((document as any).mozCancelFullScreen) {
    (document as any).mozCancelFullScreen();
  } else if ((document as any).msExitFullscreen) {
    (document as any).msExitFullscreen();
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
function iOSFullscreenFix(element: HTMLElement): void {
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
 * @param NutrientViewer - The NutrientViewer object (from CDN or import)
 * @param container - The container element
 */
export async function unloadMagazineViewer(
  nutrientViewer: typeof NutrientViewer,
  container: HTMLElement
) {
  if (nutrientViewer) {
    nutrientViewer.unload(container);
  }
}
