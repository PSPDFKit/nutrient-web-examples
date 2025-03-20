import "details-polyfill";

import { createBenchmark } from "./lib/tests";
import { getConfigOptionsFromURL } from "./lib/utils";
import render from "./ui/render";

// PDF to benchmark against.
const PDF = "./assets/default.pdf";

const state = {
  tests: {
    // We set the first test to running so we avoid a state where all is idle.
    "Test-Initialization": { state: "running", progress: 0 },
  },
  error: null,
  state: "running",
  nutrientScore: 0,
  loadTimeInNutrientScore: 0,
  document: null,
  licenseKey: null,
};

render(state);

(async () => {
  try {
    // Load the PDF and the license key.
    const [pdf, licenseKey] = await Promise.all([
      await fetch(PDF).then((r) => r.arrayBuffer()),
      await fetch("./license-key").then((response) => response.text()),
    ]);

    const { nutrientConfig } = getConfigOptionsFromURL();

    const benchmark = createBenchmark(pdf, licenseKey, nutrientConfig);

    state.pdf = pdf;
    state.licenseKey = licenseKey;
    render(state);

    // We pre-fetch some assets in order to not affect the benchmark results.
    const preFetchAssets = [
       "./vendor/@nutrient-sdk/viewer/nutrient-viewer-lib/nutrient-viewer.wasm.js",
       "./vendor/@nutrient-sdk/viewer/nutrient-viewer-lib/nutrient-viewer.wasm",
    ]
      .filter(Boolean)
      .map((asset) => fetch(asset));

    await Promise.all(preFetchAssets);

    const score = await benchmark.run((updatedTests) => {
      state.tests = updatedTests;
      render(state);
    });

    state.state = "done";
    state.nutrientScore = Math.round(score.load + score.rest);
    state.loadTimeInNutrientScore = Math.round(
      (100 * score.load) / state.nutrientScore,
    );
    render(state);

    if (window.ga) {
      window.ga(
        "send",
        "event",
        "wasmbench",
        "score",
        "wasm-score",
        state.nutrientScore,
      );
      window.ga(
        "send",
        "event",
        "wasmbench",
        "ratio",
        "wasm-ratio",
        state.loadTimeInNutrientScore,
      );
    }
  } catch (e) {
    console.error(e);
    state.error = e;
    render(state);
  }
})();
