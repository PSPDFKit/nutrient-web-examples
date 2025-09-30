<script lang="ts">
import { Link, Route, Router } from "svelte-routing";
import NutrientLogo from "./components/logos/NutrientLogo.svelte";
import SvelteLogo from "./components/logos/SvelteLogo.svelte";
import BasicViewerPage from "./pages/BasicViewerPage.svelte";
import CustomOverlaysPage from "./pages/CustomOverlaysPage.svelte";
import MagazineModePage from "./pages/MagazineModePage.svelte";

interface Example {
  path: string;
  title: string;
  description: string;
  features: string[];
}

const examples: Example[] = [
  {
    path: "/basic-viewer",
    title: "Basic Viewer",
    description: "Simple PDF document loading with basic controls",
    features: ["Document loading", "Zoom controls", "Page navigation"],
  },
  {
    path: "/magazine-mode",
    title: "Magazine Mode",
    description: "Advanced magazine-style reader with custom features",
    features: [
      "Double-page layout",
      "Custom toolbar",
      "Fullscreen support",
      "iOS optimization",
    ],
  },
  {
    path: "/custom-overlays",
    title: "Custom Overlays",
    description: "Interactive overlays that appear on page clicks",
    features: [
      "Page click events",
      "HTML overlay content",
      "Dynamic positioning",
      "Video embedding",
    ],
  },
];
</script>

<main>
  <Router>
    <Route path="/">
      <div class="homepage">
        <div class="homepage-container">
          <header class="homepage-header">
            <div class="homepage-tech-stack">
              <div class="tech-item">
                <NutrientLogo />
              </div>
              <div class="tech-plus">+</div>
              <div class="tech-item">
                <SvelteLogo />
              </div>
            </div>
            <p class="homepage-subtitle">Select an example to get started</p>
          </header>

          <div class="examples-grid">
            {#each examples as example}
              <div class="example-card">
                <h3 class="example-title">{example.title}</h3>
                <p class="example-description">{example.description}</p>
                
                <h4 class="features-title">Features:</h4>
                <ul class="features-list">
                  {#each example.features as feature}
                    <li>{feature}</li>
                  {/each}
                </ul>

                <div class="button-container">
                  <Link to={example.path} class="view-button">
                    View
                  </Link>
                </div>
              </div>
            {/each}
          </div>

          <footer class="homepage-footer">
            <p>
              Learn more:
              <a
                href="https://www.nutrient.io/guides/web/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Nutrient Web SDK Documentation
              </a>
            </p>
          </footer>
        </div>
      </div>
    </Route>
    
    <Route path="/basic-viewer">
      <BasicViewerPage />
    </Route>
    <Route path="/magazine-mode">
      <MagazineModePage />
    </Route>
    <Route path="/custom-overlays">
      <CustomOverlaysPage />
    </Route>
  </Router>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .homepage {
    background-color: #efebe7;
    min-height: 100vh;
    padding: 2em 0;
  }

  .homepage-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2em;
    padding-bottom: 2em;
  }

  .homepage-header {
    text-align: center;
    margin-bottom: 4em;
  }

  .homepage-tech-stack {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2em;
    margin-bottom: 2em;
  }

  .tech-item {
    display: flex;
    align-items: center;
    gap: 0.75em;
    width: 4em;
    justify-content: center;
  }

  .tech-plus {
    font-size: 3em;
    font-weight: 300;
    color: #888;
  }

  .homepage-subtitle {
    font-size: 1.1em;
    color: #666;
    margin-bottom: 4em;
  }

  .examples-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2em;
  }

  .example-card {
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 2em;
    background-color: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .example-card:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  .example-title {
    margin: 0 0 1em 0;
    color: #4A8FED;
    font-size: 1.25rem;
  }

  .example-description {
    color: #666;
    margin-bottom: 1em;
    line-height: 1.5;
  }

  .features-title {
    font-size: 0.9em;
    margin: 1em 0 0.5em 0;
    color: #333;
  }

  .features-list {
    font-size: 0.9em;
    color: #555;
    margin-bottom: 1em;
    padding-left: 1.2em;
  }

  .features-list li {
    margin-bottom: 0.25em;
  }

  .button-container {
    margin-top: auto;
    padding-top: 1em;
  }

  :global(.view-button) {
    display: block;
    width: 100%;
    padding: 0.75em 1em;
    background-color: #c2b8ae;
    color: black;
    text-decoration: none;
    border-radius: 8px;
    font-size: 0.9em;
    font-weight: 500;
    text-align: center;
    transition: all 0.2s ease;
    border: none;
    box-sizing: border-box;
    text-transform: uppercase;
  }

  :global(.view-button:hover) {
    background-color: #d4cbc4;
  }

  .homepage-footer {
    text-align: center;
    margin-top: 4em;
    padding-top: 2em;
    color: #666;
  }

  .homepage-footer a {
    color: #4A8FED;
    text-decoration: none;
  }

  .homepage-footer a:hover {
    text-decoration: underline;
  }
</style>