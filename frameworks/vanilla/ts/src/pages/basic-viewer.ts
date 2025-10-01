import "../styles/main.css";
import "../styles/viewer.css";
import {
  loadBasicViewer,
  unloadBasicViewer,
} from "../nutrient/basic-viewer/implementation";
import { loadNutrientViewer } from "../nutrient/loadNutrientViewer";

// Get the app container
const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App container not found");
}

// Create page content
app.innerHTML = `
  <div class="viewer-container">
    <nav class="viewer-nav">
      <a href="/" class="viewer-back-link">
        ← Back to Examples
      </a>
      <h2 class="viewer-title">Basic Viewer</h2>
      <span class="viewer-subtitle">
        Simple PDF viewing with standard controls
      </span>
    </nav>
    <div id="viewer-content" class="viewer-content"></div>
  </div>
`;

// Load the viewer
const container = document.getElementById("viewer-content");

if (container) {
  loadNutrientViewer().then((nutrientViewer) => {
    loadBasicViewer(nutrientViewer, container);
  });

  // Cleanup on page unload
  window.addEventListener("beforeunload", () => {
    loadNutrientViewer().then((nutrientViewer) => {
      unloadBasicViewer(nutrientViewer, container);
    });
  });
}
