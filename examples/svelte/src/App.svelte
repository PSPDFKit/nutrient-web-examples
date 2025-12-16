<script lang="ts">
import PdfViewer from "./lib/PdfViewer.svelte";

let currentDocument = $state("document.pdf");

function handleOpen() {
  currentDocument =
    currentDocument === "document.pdf" ? "another-example.pdf" : "document.pdf";
}
</script>

<main>
  <button class="app-button" type="button" onclick={handleOpen}>
    Open another document
  </button>
  <div class="app-viewer">
    <PdfViewer document={currentDocument} />
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  main {
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
  }
</style>
