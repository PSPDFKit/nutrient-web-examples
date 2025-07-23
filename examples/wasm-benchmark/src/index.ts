import { createBenchmark } from "./lib/tests";
import { getConfigOptionsFromURL } from "./lib/utils";
import render from "./ui/render";

import type NutrientViewer from "@nutrient-sdk/viewer";

export const NutrientWindow = window as unknown as Window & {
  NutrientViewer: typeof NutrientViewer,
  ga: any
}

// PDF to benchmark against.
const PDF = "./assets/default.pdf";

export type AppState = {
  tests: Record<string, { state: string; progress: number }>;
  error: Error | unknown | null;
  state: string;
  nutrientScore: number;
  loadTimeInNutrientScore: number;
  document: ArrayBuffer | null;
  licenseKey: string | null;
};

const state: AppState = {
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

    state.document = pdf;
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

    const score = await benchmark.run((updatedTests: Record<string, { state: string; progress: number }>) => {
      state.tests = updatedTests;
      render(state);
    });

    state.state = "done";
    state.nutrientScore = Math.round(score.load + score.rest);
    state.loadTimeInNutrientScore = Math.round(
      (100 * score.load) / state.nutrientScore,
    );
    render(state);

    if (NutrientWindow.ga) {
      NutrientWindow.ga(
        "send",
        "event",
        "wasmbench",
        "score",
        "wasm-score",
        state.nutrientScore,
      );
      NutrientWindow.ga(
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
