import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./components/App";

export default function render({
  tests,
  state,
  error,
  nutrientScore,
  loadTimeInNutrientScore,
  pdf,
  licenseKey,
}) {
  ReactDOM.render(
    <App
      tests={tests}
      state={state}
      error={error}
      nutrientScore={nutrientScore}
      loadTimeInNutrientScore={loadTimeInNutrientScore}
      pdf={pdf}
      licenseKey={licenseKey}
    />,
    document.getElementById("root"),
  );
}
