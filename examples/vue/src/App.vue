<script setup lang="ts">
import type * as Nutrient from "@nutrient-sdk/viewer";
import { onMounted, onUnmounted, ref, useTemplateRef, watch } from "vue";

const containerRef = useTemplateRef("container");
const currentDocument = ref("document.pdf");
let instance: Nutrient.Instance | null = null;

async function loadDocument() {
  const container = containerRef.value;
  if (!container || !window.NutrientViewer) return;

  if (instance) {
    window.NutrientViewer.unload(container);
  }

  instance = await window.NutrientViewer.load({
    container,
    document: currentDocument.value,
    useCDN: true,
  });
}

function handleOpen() {
  currentDocument.value =
    currentDocument.value === "document.pdf"
      ? "another-example.pdf"
      : "document.pdf";
}

watch(currentDocument, () => {
  loadDocument();
});

onMounted(() => {
  loadDocument();
});

onUnmounted(() => {
  const container = containerRef.value;
  if (container) {
    window.NutrientViewer?.unload(container);
  }
});
</script>

<template>
  <div class="app">
    <button class="app-button" type="button" @click="handleOpen">
      Open another document
    </button>
    <div ref="container" class="app-viewer" />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.app-button {
  background: #4a8fed;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin: 10px auto;
  padding: 10px 20px;
}

.app-button:hover {
  background: #3a7ddd;
}

.app-viewer {
  flex: 1;
  position: relative;
}
</style>
