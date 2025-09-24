<template>
  <div :style="{ height: '100vh', display: 'flex', flexDirection: 'column' }">
    <nav
      :style="{
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }"
    >
      <router-link
        to="/"
        :style="{
          textDecoration: 'none',
          color: '#4A8FED',
          fontSize: '0.9rem',
        }"
      >
        ← Back to Examples
      </router-link>
      <h2 :style="{ margin: 0, fontSize: '1.1rem' }">Basic Viewer</h2>
      <span :style="{ fontSize: '0.9rem', color: '#666' }">
        Simple PDF viewing with standard controls
      </span>
    </nav>

    <div ref="containerRef" :style="{ flex: 1, width: '100%' }" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import {
  loadBasicViewer,
  unloadBasicViewer,
} from "../examples/basic-viewer/implementation";

const containerRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  const container = containerRef.value;
  const { NutrientViewer } = window;

  if (container && NutrientViewer) {
    loadBasicViewer(NutrientViewer, container);
  }
});

onUnmounted(() => {
  const container = containerRef.value;
  const { NutrientViewer } = window;

  if (container && NutrientViewer) {
    unloadBasicViewer(NutrientViewer, container);
  }
});
</script>
