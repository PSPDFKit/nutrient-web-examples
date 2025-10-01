import "../styles/main.css";
import "../styles/viewer.css";
import {
  loadCustomOverlaysViewer,
  unloadCustomOverlaysViewer,
} from "../nutrient/custom-overlays/implementation.js";
import { loadNutrientViewer } from "../nutrient/loadNutrientViewer.js";

// Get the app container
const app = document.querySelector("#app");

// Create page content
app.innerHTML = `
  <div class="viewer-container">
    <nav class="viewer-nav">
      <a href="/" class="viewer-back-link">
        ← Back to Examples
      </a>
      <h2 class="viewer-title">Custom Overlays</h2>
      <span class="viewer-subtitle">
        Interactive overlays that appear on page clicks
      </span>
    </nav>
    <div id="viewer-content" class="viewer-content"></div>
  </div>
`;

// Load the viewer
const container = document.getElementById("viewer-content");

if (container) {
  loadNutrientViewer().then((nutrientViewer) => {
    loadCustomOverlaysViewer(nutrientViewer, container);
  });

  // Cleanup on page unload
  window.addEventListener("beforeunload", () => {
    loadNutrientViewer().then((nutrientViewer) => {
      unloadCustomOverlaysViewer(nutrientViewer, container);
    });
  });
}
