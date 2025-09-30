<script>
import { onDestroy, onMount } from "svelte";
import {
  loadCustomOverlaysViewer,
  unloadCustomOverlaysViewer,
} from "../nutrient/custom-overlays/implementation";
import { loadNutrientViewer } from "../nutrient/loadNutrientViewer";

let container = null;
let nutrientViewer = null;

onMount(async () => {
  if (!container) return;

  try {
    nutrientViewer = await loadNutrientViewer();

    loadCustomOverlaysViewer(nutrientViewer, container);
  } catch (error) {
    console.error("Failed to load Nutrient Viewer:", error);
  }
});

onDestroy(() => {
  if (nutrientViewer && container) {
    unloadCustomOverlaysViewer(nutrientViewer, container);
  }
});

function goBack() {
  window.history.back();
}
</script>

<div class="page">
  <nav class="nav">
    <button on:click={goBack} class="back-link">
      ← Back to Examples
    </button>
    <h2 class="title">Basic Viewer</h2>
    <span class="description">
      Simple PDF viewing with standard controls
    </span>
  </nav>

  <div 
    bind:this={container} 
    class="container"
  ></div>
</div>

<style>
  .page {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .nav {
    padding: 1rem;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .back-link {
    background: none;
    border: none;
    color: #4A8FED;
    font-size: 0.9rem;
    cursor: pointer;
    text-decoration: none;
  }

  .back-link:hover {
    text-decoration: underline;
  }

  .title {
    margin: 0;
    font-size: 1.1rem;
  }

  .description {
    font-size: 0.9rem;
    color: #666;
  }

  .container {
    flex: 1;
    width: 100%;
    position: relative;
    min-height: 400px;
  }
</style>