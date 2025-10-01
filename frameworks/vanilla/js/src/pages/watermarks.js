import "../styles/main.css";
import "../styles/viewer.css";
import { loadNutrientViewer } from "../nutrient/loadNutrientViewer.js";
import {
  loadWatermarksViewer,
  unloadWatermarksViewer,
} from "../nutrient/watermarks/implementation.js";

// Get the app container
const app = document.querySelector("#app");

// Create page content
app.innerHTML = `
  <div class="viewer-container">
    <nav class="viewer-nav">
      <a href="/" class="viewer-back-link">
        ← Back to Examples
      </a>
      <h2 class="viewer-title">Watermarks</h2>
      <span class="viewer-subtitle">
        Add watermarks to PDFs using JavaScript
      </span>
    </nav>
    <div id="viewer-content" class="viewer-content"></div>
  </div>
`;

// Load the viewer
const container = document.getElementById("viewer-content");

if (container) {
  loadNutrientViewer().then((nutrientViewer) => {
    loadWatermarksViewer(nutrientViewer, container);
  });

  // Cleanup on page unload
  window.addEventListener("beforeunload", () => {
    loadNutrientViewer().then((nutrientViewer) => {
      unloadWatermarksViewer(nutrientViewer, container);
    });
  });
}
