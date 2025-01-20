import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./components/App";

export default function render({
  isWasm,
  tests,
  state,
  error,
  pspdfkitScore,
  loadTimeInPspdfkitScore,
  pdf,
  licenseKey,
}) {
  ReactDOM.render(
    <App
      isWasm={isWasm}
      tests={tests}
      state={state}
      error={error}
      pspdfkitScore={pspdfkitScore}
      loadTimeInPspdfkitScore={loadTimeInPspdfkitScore}
      pdf={pdf}
      licenseKey={licenseKey}
    />,
    document.getElementById("root"),
  );
}
