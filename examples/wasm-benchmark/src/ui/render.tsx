import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./components/App";

import type { AppState } from "..";

export default function render(appState: AppState) {
  const {
    tests,
    state,
    error,
    nutrientScore,
    loadTimeInNutrientScore,
    document: pdf,
    licenseKey,
  } = appState;
  const root = createRoot(document.getElementById("root")!);

  root.render(
    <App
      tests={tests}
      state={state}
      error={error}
      nutrientScore={nutrientScore}
      loadTimeInNutrientScore={loadTimeInNutrientScore}
      pdf={pdf}
      licenseKey={licenseKey}
    />);
}
