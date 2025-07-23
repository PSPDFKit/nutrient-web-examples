import React, { Component } from "react";

import Benchmark from "./Benchmark";
import Introduction from "./Introduction";

import type { AppState } from "../..";

type Props = {
  tests: any[];
  state: AppState;
  error?: Error;
  nutrientScore: number;
  loadTimeInNutrientScore: number;
  pdf: ArrayBuffer;
  licenseKey: string;
};

class App extends Component<Props> {
  render() {
    const {
      error,
      state,
      tests,
      nutrientScore,
      loadTimeInNutrientScore,
      pdf,
      licenseKey,
    } = this.props;

    return (
      <div className="App">
        <Introduction />
        {error ? (
          <div className="Error">
            An error occurred: {error.message}. Please{" "}
            <a href="#" onClick={location.reload}>
              reload
            </a>
            .
          </div>
        ) : (
          <Benchmark
            state={state}
            tests={tests}
            nutrientScore={nutrientScore}
            loadTimeInNutrientScore={loadTimeInNutrientScore}
            pdf={pdf}
            licenseKey={licenseKey}
          />
        )}
      </div>
    );
  }
}

export default App;
