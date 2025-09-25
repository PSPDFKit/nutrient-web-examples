<script setup lang="ts">
import NutrientLogo from "../components/logos/NutrientLogo.vue";
import VueLogo from "../components/logos/VueLogo.vue";

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

<template>
  <div class="homepage">
    <div class="homepage-container">
      <header class="homepage-header">
        <h1 class="homepage-title">TypeScript Examples</h1>
        <div class="homepage-tech-stack">
          <div class="tech-item">
            <a
              to="https://www.nutrient.io"
              target="_blank"
              rel="noopener noreferrer"
              class="link-no-style"
            >
              <NutrientLogo />
            </a>
          </div>
          <div class="tech-plus">+</div>
          <div class="tech-item">
            <a
              to="https://vuejs.org/"
              target="_blank"
              rel="noopener noreferrer"
              class="link-no-style"
            >
              <VueLogo />
            </a>
          </div>
        </div>
        <p class="homepage-subtitle">Select an example to get started</p>
      </header>

      <div class="examples-grid">
        <div
          v-for="example in examples"
          :key="example.path"
          class="example-card"
        >
          <h3 class="example-title">{{ example.title }}</h3>
          <p class="example-description">
            {{ example.description }}
          </p>

          <h4 class="features-title">Features:</h4>
          <ul class="features-list">
            <li v-for="feature in example.features" :key="feature">
              {{ feature }}
            </li>
          </ul>

          <div class="button-container">
            <router-link :to="example.path" class="view-button">
              View
            </router-link>
          </div>
        </div>
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
</template>

<style scoped>
.homepage {
  background-color: #efebe7;
  min-height: 100vh;
  padding: 2em 0;
  font-family: "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace;
}

.homepage-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2em;
  padding-bottom: 2em;
}

.homepage-logo {
  text-align: center;
  margin-bottom: 2em;
}

.homepage-logo svg {
  max-width: 208px;
  margin: 0 auto;
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
}

.tech-item svg {
  width: 100%;
}

.react-title {
  margin: 0;
  font-size: 2em;
  color: #61dafb;
}

.nutrient-title {
  margin: 0;
  font-size: 2em;
  color: #1a1414;
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
}

.example-title {
  margin: 0 0 1em 0;
}

.example-description {
  color: #666;
  margin-bottom: 1em;
}

.features-title {
  font-size: 0.9em;
  margin: 1em 0 0.5em 0;
}

.features-list {
  font-size: 0.9em;
  color: #555;
}

.button-container {
  margin-top: auto;
  padding-top: 1em;
}

.view-button {
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

.view-button:hover {
  background-color: #d4cbc4;
}

.homepage-footer {
  text-align: center;
  margin-top: 4em;
  padding-top: 2em;
  color: #666;
}

.link-no-style {
  text-decoration: none;
  color: inherit;
}
</style>
