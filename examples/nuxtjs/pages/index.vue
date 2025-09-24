<template>
  <div id="app">
    <label for="file-upload" class="custom-file-upload"> Open PDF </label>
    <input id="file-upload" type="file" @change="openDocument" class="btn" />
    <NutrientContainer :pdfFile="pdfFile" @loaded="handleLoaded" />
  </div>
</template>

<script>
import NutrientContainer from "../components/NutrientContainer.vue";

export default {
  name: "app",
  /**
   * Render the `NutrientContainer` component.
   */
  components: {
    NutrientContainer,
  },

  data() {
    return {
      pdfFile: this.pdfFile || "/document.pdf",
    };
  },

  /**
   * Our component has two methods — one to check when the document is loaded, and the other to open the document.
   */
  methods: {
    handleLoaded(instance) {
      console.log("Nutrient has loaded: ", instance);
      // Do something.
    },

    openDocument(event) {
      if (this.pdfFile?.startsWith("blob:")) {
        window.URL.revokeObjectURL(this.pdfFile);
      }
      this.pdfFile = window.URL.createObjectURL(event.target.files[0]);
    },
  },
};
</script>

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
  padding: 6px 12px;
  cursor: pointer;
  background: #4a8fed;
  padding: 10px;
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
