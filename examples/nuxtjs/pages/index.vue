<script setup lang="ts">
import type * as Nutrient from "@nutrient-sdk/viewer";

const pdfFile = ref("/document.pdf");

function handleLoaded(instance: Nutrient.Instance) {
  console.log("Nutrient has loaded: ", instance);
}

function openDocument(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (!files || files.length === 0) return;

  if (pdfFile.value.startsWith("blob:")) {
    window.URL.revokeObjectURL(pdfFile.value);
  }

  pdfFile.value = window.URL.createObjectURL(files[0]);
}
</script>

<template>
  <div id="app">
    <label for="file-upload" class="custom-file-upload">Open PDF</label>
    <input id="file-upload" type="file" accept=".pdf" @change="openDocument" />
    <NutrientContainer :pdf-file="pdfFile" @loaded="handleLoaded" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

body {
  margin: 0;
}

input[type="file"] {
  display: none;
}

.custom-file-upload {
  border: 1px solid #ccc;
  border-radius: 4px;
  display: inline-block;
  padding: 10px 12px;
  cursor: pointer;
  background: #4a8fed;
  color: #fff;
  font: inherit;
  font-size: 16px;
  font-weight: bold;
  margin: auto;
}

.pdf-container {
  flex: 1;
}
</style>
