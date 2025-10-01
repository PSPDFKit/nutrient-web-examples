import "./styles/main.css";
import "./styles/home.css";
import { createNutrientLogo, createVanillaLogo } from "./components/logos.js";

// Get the app container
const app = document.querySelector("#app");

// Create homepage content
app.innerHTML = `
  <div class="homepage">
    <div class="homepage-container">
      <header class="homepage-header">
        <div class="homepage-tech-stack">
          <div class="tech-item">
            <a href="https://www.nutrient.io" target="_blank" rel="noopener noreferrer" class="link-no-style">
              ${createNutrientLogo()}
            </a>
          </div>
          <div class="tech-plus">+</div>
          <div class="tech-item">
            ${createVanillaLogo()}
          </div>
        </div>
        <p class="homepage-subtitle">Select an example to get started</p>
      </header>

      <div class="examples-grid">
        <div class="example-card">
          <h3 class="example-title">Basic Viewer</h3>
          <p class="example-description">Simple PDF document loading with basic controls</p>

          <h4 class="features-title">Features:</h4>
          <ul class="features-list">
            <li>Document loading</li>
            <li>Zoom controls</li>
            <li>Page navigation</li>
          </ul>

          <div class="button-container">
            <a href="/basic-viewer.html" class="view-button">View</a>
          </div>
        </div>

        <div class="example-card">
          <h3 class="example-title">Magazine Mode</h3>
          <p class="example-description">Advanced magazine-style reader with custom features</p>

          <h4 class="features-title">Features:</h4>
          <ul class="features-list">
            <li>Double-page layout</li>
            <li>Custom toolbar</li>
            <li>Fullscreen support</li>
            <li>iOS optimization</li>
          </ul>

          <div class="button-container">
            <a href="/magazine-mode.html" class="view-button">View</a>
          </div>
        </div>

        <div class="example-card">
          <h3 class="example-title">Custom Overlays</h3>
          <p class="example-description">Interactive overlays that appear on page clicks</p>

          <h4 class="features-title">Features:</h4>
          <ul class="features-list">
            <li>Page click events</li>
            <li>HTML overlay content</li>
            <li>Dynamic positioning</li>
            <li>Video embedding</li>
          </ul>

          <div class="button-container">
            <a href="/custom-overlays.html" class="view-button">View</a>
          </div>
        </div>
      </div>

      <footer class="homepage-footer">
        <p>
          Learn more:
          <a href="https://www.nutrient.io/guides/web/" target="_blank" rel="noopener noreferrer">
            Nutrient Web SDK Documentation
          </a>
        </p>
      </footer>
    </div>
  </div>
`;
