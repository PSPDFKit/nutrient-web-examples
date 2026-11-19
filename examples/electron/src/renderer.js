import { dragAndDrop } from "./lib/drag-and-drop.js";
import { makeToolbarItems } from "./lib/toolbar.js";

/**
 * We append `process.platform` ass a CSS class to `<body>` so we can offset
 * the frame less window alternative on macOS.
 * https://electronjs.org/docs/api/frameless-window#alternatives-on-macos
 */
document.body.classList.add(`platform-${window.electron.processPlatform()}`);

/**
 * We store the `NutrientViewer.Instance` in this variable so we can access it from
 * everywhere.
 */
let instance = null;
let isLoading = false;
let activeDocument = null;
let pendingDocument = null;

const { documentExport, documentImport, askUserToDiscardChanges } =
  window.electron;

/**
 * Creates an onAnnotationsChange handler that keeps track of changes.
 *
 * We skip the first call since `annotations.change` fires when the PDF is
 * initialized and populated with annotations.
 */
let hasUnsavedAnnotations = false;

function createOnAnnotationsChange() {
  let initialized = false;

  return () => {
    if (initialized) {
      hasUnsavedAnnotations = true;
    } else {
      initialized = true;
    }
  };
}

/**
 * If there is an existing running instance of Nutrient, it is destroyed before
 * a creating a new one.
 *
 * This process will make sure that the WebAssembly module is optimally reused.
 */
async function load(document) {
  if (isLoading) {
    pendingDocument = document === activeDocument ? null : document;
    return;
  }
  isLoading = true;
  activeDocument = document;
  try {
    if (instance) {
      NutrientViewer.unload(instance);
      hasUnsavedAnnotations = false;
      instance = null;
    }

    // Create our custom toolbar
    const toolbarItems = makeToolbarItems(
      NutrientViewer.defaultToolbarItems,
      function exportFile() {
        documentExport(instance, () => {
          hasUnsavedAnnotations = false;
        });
      },
      function importFile() {
        if (hasUnsavedAnnotations) {
          askUserToDiscardChanges(() => documentImport(load));
        } else {
          documentImport(load);
        }
      },
    );

    // Set up the configuration object. A custom style sheet is used to customize
    // the look and feel of Nutrient.
    const configuration = {
      document,
      container: "#root",
      // Load the viewer's assets from the installed npm package. The folder must
      // be the one that contains `nutrient-viewer-lib/`, given as an absolute URL.
      baseUrl: new URL(
        "../node_modules/@nutrient-sdk/viewer/dist/",
        window.location.href,
      ).href,
      useCDN: false,
      styleSheets: ["./nutrient.css"],
      // appName must match the license's bundle ID
      appName: "nutrient-electron-example",
      // Add when using a license key
      // licenseKey: "LICENSE KEY GOES HERE",
    };

    instance = await NutrientViewer.load(configuration);

    instance.setToolbarItems(toolbarItems);
    instance.addEventListener(
      "annotations.change",
      createOnAnnotationsChange(),
    );
  } catch (error) {
    console.error("Failed to load document:", error);
    try {
      NutrientViewer.unload("#root");
      instance = null;
    } catch (cleanupError) {
      console.error("Failed to unload document:", cleanupError);
    }
  } finally {
    isLoading = false;
    activeDocument = null;
    const nextDocument = pendingDocument;
    pendingDocument = null;
    if (nextDocument !== null) load(nextDocument);
  }
}

// Open a default document, when the app is started.
window.onload = () => {
  dragAndDrop((file) => {
    if (hasUnsavedAnnotations) {
      askUserToDiscardChanges(() => load(file));
    } else {
      load(file);
    }
  });
  load("./assets/example.pdf");
};
