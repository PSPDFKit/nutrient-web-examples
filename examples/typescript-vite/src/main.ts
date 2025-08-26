// main.ts
import "./style.css";

async function load() {
  const container = document.querySelector(".container") as HTMLElement;

  if (!window.NutrientViewer) {
    return;
  }

  // Ensure there's only one NutrientViewer instance
  window.NutrientViewer.unload(container);

  if (container) {
    window.NutrientViewer.load({
      container,
      document: "https://www.nutrient.io/downloads/nutrient-web-demo.pdf",
    })
      .then((instance) => {
        console.log("Nutrient loaded", instance);
      })
      .catch(console.error);
  }
}

load();
