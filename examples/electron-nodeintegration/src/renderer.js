// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const NutrientViewer = require("@nutrient-sdk/viewer");

const {
  documentExport,
  documentImport,
  askUserToDiscardChanges,
} = require("./lib/modals");
const dragAndDrop = require("./lib/drag-and-drop");
const makeToolbarItems = require("./lib/toolbar");

/**
 * We store the `NutrientViewer.Instance` in this variable so we can access it from
 * everywhere.
 */
let instance = null;

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
  if (instance) {
    NutrientViewer.unload(instance);
    hasUnsavedAnnotations = false;
    instance = null;
  }

  // Create our custom toolbar
  const toolbarItems = makeToolbarItems(
    function exportFile() {
      // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
      documentExport(instance, () => (hasUnsavedAnnotations = false));
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
    styleSheets: ["./nutrient.css"],
  };

  instance = await NutrientViewer.load(configuration);

  instance.setToolbarItems(toolbarItems);
  instance.addEventListener("annotations.change", createOnAnnotationsChange());

  dragAndDrop(instance, (file) => {
    if (hasUnsavedAnnotations) {
      askUserToDiscardChanges(() => load(file));
    } else {
      load(file);
    }
  });
}

// Open a default document, when the app is started.
window.onload = () => load("../assets/example.pdf");
