<script>
import Nutrient from "./PdfViewerComponent.svelte";

let doc = "document.pdf";
const errorMsg = "";

function openDocument(e) {
  doc = window.URL.createObjectURL(e.target.files[0]);
}
</script>

<main>
  <form>
    <label for="file-upload" class="custom-file-upload"> Open PDF </label>
    <input
      id="file-upload"
      type="file"
      on:change={openDocument}
      accept="application/pdf"
    />
  </form>
  <span class="error">{errorMsg}</span>
  <Nutrient document={doc} bind:errorMsg />
</main>

<style>
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
    font-size: 20px;
    font-weight: bold;
    margin-top: 0.5rem;
  }
</style>
