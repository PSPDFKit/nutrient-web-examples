<template>
  <div class="page-container">
    <nav class="nav-bar">
      <NuxtLink to="/" class="back-link">
        ← Back to Examples
      </NuxtLink>
      <h2 class="page-title">Custom Overlays</h2>
      <span class="page-description">
        Interactive overlays that appear on page clicks
      </span>
    </nav>

    <div ref="containerRef" class="viewer-container" />
  </div>
</template>

<script setup lang="ts">
import {
  loadCustomOverlaysViewer,
  unloadCustomOverlaysViewer,
} from "~/examples/custom-overlays/implementation";

const containerRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  const container = containerRef.value;
  const { NutrientViewer } = window;

  if (container && NutrientViewer) {
    loadCustomOverlaysViewer(NutrientViewer, container);
  }
});

onUnmounted(() => {
  const container = containerRef.value;
  const { NutrientViewer } = window;

  if (NutrientViewer && container) {
    unloadCustomOverlaysViewer(NutrientViewer, container);
  }
});
</script>

<style scoped>
.page-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.nav-bar {
  padding: 1rem;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.back-link {
  text-decoration: none;
  color: #4a8fed;
  font-size: 0.9rem;
}

.page-title {
  margin: 0;
  font-size: 1.1rem;
}

.page-description {
  font-size: 0.9rem;
  color: #666;
}

.viewer-container {
  flex: 1;
  width: 100%;
}
</style>