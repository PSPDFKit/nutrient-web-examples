<script>
import { onDestroy, onMount } from "svelte";
import { loadNutrientViewer } from "../nutrient/loadNutrientViewer";
import {
  loadWatermarksViewer,
  unloadWatermarksViewer,
} from "../nutrient/watermarks/implementation";

let container = null;

let nutrientViewer = null;

onMount(async () => {
  if (!container) return;

  try {
    nutrientViewer = await loadNutrientViewer();

    loadWatermarksViewer(nutrientViewer, container);
  } catch (error) {
    console.error("Failed to load Nutrient Viewer:", error);
  }
});

onDestroy(() => {
  if (nutrientViewer && container) {
    unloadWatermarksViewer(nutrientViewer, container);
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
    <h2 class="title">Watermarks</h2>
    <span class="description">
      Add watermarks to PDFs using JavaScript
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
  color: #4a8fed;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;
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

