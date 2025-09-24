import React, { Component } from "react";

import Benchmark from "./Benchmark";
import Introduction from "./Introduction";

type Props = {
  tests: Record<string, { state: string; progress: number }>;
  state: string;
  error?: Error | unknown | null;
  nutrientScore: number;
  loadTimeInNutrientScore: number;
  pdf?: ArrayBuffer | null;
  licenseKey?: string | null;
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
            An error occurred: {error instanceof Error ? error.message : String(error)}. Please{" "}
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
            pdf={pdf || null}
            licenseKey={licenseKey || ''}
          />
        )}
      </div>
    );
  }
}

export default App;
