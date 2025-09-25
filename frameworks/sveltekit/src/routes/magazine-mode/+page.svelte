<script>
import { onDestroy, onMount } from "svelte";
import { loadMagazineMode } from "../../lib/examples/magazine-mode/implementation.js";
import { loadNutrientViewer } from "../../lib/utils/loadNutrientViewer.js";

let container;
let nutrientViewer;

onMount(async () => {
  if (!container) return;

  try {
    nutrientViewer = await loadNutrientViewer();

    // Unload any existing instance
    nutrientViewer.unload(container);

    await loadMagazineMode(nutrientViewer, container);
  } catch (error) {
    console.error("Failed to load Nutrient Viewer:", error);
  }
});

onDestroy(() => {
  if (nutrientViewer && container) {
    nutrientViewer.unload(container);
  }
});
</script>

<svelte:head>
  <title>Magazine Mode - Nutrient Web SDK SvelteKit Example</title>
</svelte:head>

<div class="magazine-mode-container">
  <nav class="magazine-mode-nav">
    <a href="/" class="magazine-mode-back-link">
      ← Back to Examples
    </a>
    <h2 class="magazine-mode-title">Magazine Mode</h2>
    <span class="magazine-mode-subtitle">
      Advanced magazine-style reader with custom features
    </span>
  </nav>

  <div bind:this={container} class="magazine-mode-content"></div>
</div>

<style>
  .magazine-mode-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .magazine-mode-nav {
    padding: 1rem;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .magazine-mode-back-link {
    text-decoration: none;
    color: #4a8fed;
    font-size: 0.9rem;
  }

  .magazine-mode-title {
    margin: 0;
    font-size: 1.1rem;
  }

  .magazine-mode-subtitle {
    font-size: 0.9rem;
    color: #666;
  }

  .magazine-mode-content {
    flex: 1;
    width: 100%;
    position: relative;
    min-height: 400px;
  }
</style>