<script setup lang="ts">
import type NutrientViewer from "frameworks/next/ts/node_modules/@nutrient-sdk/viewer/dist";
import { onMounted, onUnmounted, ref } from "vue";
import {
  loadBasicViewer,
  unloadBasicViewer,
} from "../examples/basic-viewer/implementation";
import { loadNutrientViewer } from "../utils/loadNutrientViewer";

const containerRef = ref<HTMLDivElement | null>(null);
let nutrientViewer: ReturnType<typeof loadNutrientViewer>;

onMounted(async () => {
  const container = containerRef.value;

  if (!container) return;

  try {
    nutrientViewer = loadNutrientViewer();

    loadBasicViewer(nutrientViewer, container);
  } catch (error) {
    console.error("Failed to load Nutrient Viewer:", error);
  }
});

onUnmounted(() => {
  const container = containerRef.value;

  if (nutrientViewer && container) {
    unloadBasicViewer(nutrientViewer, container);
  }
});
</script>

<template>
  <div class="basic-viewer-container">
    <nav class="basic-viewer-nav">
      <router-link to="/" class="basic-viewer-back-link">
        ← Back to Examples
      </router-link>
      <h2 class="basic-viewer-title">Basic Viewer</h2>
      <span class="basic-viewer-subtitle">
        Simple PDF viewing with standard controls
      </span>
    </nav>

    <div ref="containerRef" class="basic-viewer-content" />
  </div>
</template>

<style scoped>
.basic-viewer-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.basic-viewer-nav {
  padding: 1rem;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.basic-viewer-back-link {
  text-decoration: none;
  color: #4a8fed;
  font-size: 0.9rem;
}

.basic-viewer-title {
  margin: 0;
  font-size: 1.1rem;
}

.basic-viewer-subtitle {
  font-size: 0.9rem;
  color: #666;
}

.basic-viewer-content {
  flex: 1;
  width: 100%;
  position: relative;
  min-height: 400px;
}
</style>
