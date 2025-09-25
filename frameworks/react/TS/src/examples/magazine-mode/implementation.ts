/**
 * Magazine Mode Implementation for React (TypeScript)
 *
 * This example demonstrates advanced Nutrient Web SDK features:
 * - Custom view state (double page layout)
 * - Custom toolbar configuration
 * - Fullscreen support with cross-browser compatibility
 * - iOS-specific fullscreen handling
 */

import type NutrientViewer from "@nutrient-sdk/viewer";
import type { Configuration } from "@nutrient-sdk/viewer";

// Extended Document interface for cross-browser fullscreen support
interface ExtendedDocument extends Document {
  mozFullScreenElement?: Element;
  webkitFullscreenElement?: Element;
  msFullscreenElement?: Element;
  mozFullScreenEnabled?: boolean;
  msFullScreenEnabled?: boolean;
  webkitFullscreenEnabled?: boolean;
  webkitExitFullscreen?: () => void;
  mozCancelFullScreen?: () => void;
  msExitFullscreen?: () => void;
}

// Extended HTMLElement interface for cross-browser fullscreen support
interface ExtendedHTMLElement extends HTMLElement {
  mozRequestFullScreen?: () => void;
  webkitRequestFullscreen?: () => void;
  msRequestFullscreen?: () => void;
}

/**
 * Load a magazine-style PDF viewer with advanced features
 * @param nutrientViewer - The NutrientViewer object (from CDN)
 * @param container - The container element to mount the viewer
 * @param document - URL to the PDF document
 */
export function loadMagazineViewer(
  nutrientViewer: typeof NutrientViewer,
  container: HTMLElement,
  document = "https://www.nutrient.io/downloads/nutrient-web-demo.pdf",
) {
  // Load the viewer with magazine-specific configuration
  return load(nutrientViewer, {
    container,
    document,
  });
}

/**
 * Internal load function with magazine-specific configuration
 * @param nutrientViewer - The NutrientViewer object
 * @param defaultConfiguration - Base configuration object
 */
async function load(
  nutrientViewer: typeof NutrientViewer,
  defaultConfiguration: Configuration,
) {
  const initialViewState = new nutrientViewer.ViewState({
    scrollMode: nutrientViewer.ScrollMode.PER_SPREAD,
    layoutMode: nutrientViewer.LayoutMode.DOUBLE,
    keepFirstSpreadAsSinglePage: true,
  });

  // A custom toolbar item to toggle full screen mode
  const fullScreenToolbarItem = {
    type: "custom" as const,
    title: "Toggle full screen mode",
    onPress: () => {
      // We use the parent container of our mount node. This is necessary for
      // the iOS specific fixes applied in the iOSFullscreenFix() function.
      const containerElement =
        defaultConfiguration.container instanceof HTMLElement
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
function isFullscreenEnabled(): boolean {
  const doc = document as ExtendedDocument;
  return !!(
    doc.fullscreenElement ||
    doc.mozFullScreenElement ||
    doc.webkitFullscreenElement ||
    doc.msFullscreenElement
  );
}

/**
 * Check if fullscreen is supported by the browser
 */
function isFullScreenSupported(): boolean {
  const doc = document as ExtendedDocument;
  return !!(
    doc.fullscreenEnabled ||
    doc.mozFullScreenEnabled ||
    doc.msFullScreenEnabled ||
    doc.webkitFullscreenEnabled
  );
}

/**
 * Request fullscreen mode with cross-browser compatibility
 * @param element - Element to make fullscreen
 */
function requestFullScreen(element: HTMLElement): void {
  iOSFullscreenFix(element);

  const extendedElement = element as ExtendedHTMLElement;
  if (extendedElement.requestFullscreen) {
    extendedElement.requestFullscreen();
  } else if (extendedElement.mozRequestFullScreen) {
    extendedElement.mozRequestFullScreen();
  } else if (extendedElement.webkitRequestFullscreen) {
    extendedElement.webkitRequestFullscreen();
  } else if (extendedElement.msRequestFullscreen) {
    extendedElement.msRequestFullscreen();
  }
}

/**
 * Exit fullscreen mode with cross-browser compatibility
 */
function exitFullscreen(): void {
  const doc = document as ExtendedDocument;
  if (doc.webkitExitFullscreen) {
    doc.webkitExitFullscreen();
  } else if (doc.mozCancelFullScreen) {
    doc.mozCancelFullScreen();
  } else if (doc.msExitFullscreen) {
    doc.msExitFullscreen();
  } else if (doc.exitFullscreen) {
    doc.exitFullscreen();
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
 *
 * @param nutrientViewer - The NutrientViewer object (from CDN)
 * @param container - The container element
 */
export function unloadMagazineViewer(
  nutrientViewer: typeof NutrientViewer,
  container: HTMLElement,
) {
  nutrientViewer.unload(container);
}
