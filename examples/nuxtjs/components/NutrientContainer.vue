<script setup lang="ts">
import type * as Nutrient from "@nutrient-sdk/viewer";

interface Props {
  pdfFile: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  loaded: [instance: Nutrient.Instance];
}>();

const container = ref<HTMLDivElement | null>(null);
let instance: Nutrient.Instance | null = null;

async function loadViewer() {
  if (!container.value || !window.NutrientViewer) return;

  if (instance) {
    window.NutrientViewer.unload(container.value);
  }

  instance = await window.NutrientViewer.load({
    container: container.value,
    document: props.pdfFile,
    useCDN: true,
  });

  emit("loaded", instance);
}

watch(
  () => props.pdfFile,
  () => {
    loadViewer();
  },
);

onMounted(() => {
  loadViewer();
});

onUnmounted(() => {
  if (container.value) {
    window.NutrientViewer?.unload(container.value);
  }
});
</script>

<template>
  <div ref="container" class="pdf-container" />
</template>

<style scoped>
.pdf-container {
  height: 100vh;
  position: relative;
}
</style>
