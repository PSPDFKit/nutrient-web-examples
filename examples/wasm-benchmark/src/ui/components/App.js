import React, { Component } from "react";

import Benchmark from "./Benchmark";
import Introduction from "./Introduction";

class App extends Component {
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
