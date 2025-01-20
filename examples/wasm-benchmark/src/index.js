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
  isWasm: true,
  error: null,
  state: "running",
  pspdfkitScore: 0,
  loadTimeInPspdfkitScore: 0,
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

    const { pspdfkitConfig } = getConfigOptionsFromURL();

    const benchmark = createBenchmark(pdf, licenseKey, pspdfkitConfig);

    state.pdf = pdf;
    state.licenseKey = licenseKey;
    state.isWasm = benchmark.isWasm;
    render(state);

    // We pre-fetch some assets in order to not affect the benchmark results.
    const preFetchAssets = [
      !state.isWasm && "./vendor/pspdfkit/pspdfkit-lib/pspdfkit.asm.js",
      !state.isWasm && "./vendor/pspdfkit/pspdfkit-lib/pspdfkit.asm.js.mem",

      state.isWasm && "./vendor/pspdfkit/pspdfkit-lib/pspdfkit.wasm.js",
      state.isWasm && "./vendor/pspdfkit/pspdfkit-lib/pspdfkit.wasm",
    ]
      .filter(Boolean)
      .map((asset) => fetch(asset));

    await Promise.all(preFetchAssets);

    const score = await benchmark.run((updatedTests) => {
      state.tests = updatedTests;
      render(state);
    });

    state.state = "done";
    state.pspdfkitScore = Math.round(score.load + score.rest);
    state.loadTimeInPspdfkitScore = Math.round(
      (100 * score.load) / state.pspdfkitScore,
    );
    render(state);

    if (window.ga) {
      window.ga(
        "send",
        "event",
        "wasmbench",
        "score",
        state.isWasm ? "wasm-score" : "asmjs-score",
        state.pspdfkitScore,
      );
      window.ga(
        "send",
        "event",
        "wasmbench",
        "ratio",
        state.isWasm ? "wasm-ratio" : "asmjs-ratio",
        state.loadTimeInPspdfkitScore,
      );
    }
  } catch (e) {
    console.error(e);
    state.error = e;
    render(state);
  }
})();
