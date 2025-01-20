import React, { Component } from "react";

import Benchmark from "./Benchmark";
import Introduction from "./Introduction";

class App extends Component {
  render() {
    const {
      isWasm,
      error,
      state,
      tests,
      pspdfkitScore,
      loadTimeInPspdfkitScore,
      pdf,
      licenseKey,
    } = this.props;

    return (
      <div className="App">
        <Introduction isWasm={isWasm} />
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
            isWasm={isWasm}
            state={state}
            tests={tests}
            pspdfkitScore={pspdfkitScore}
            loadTimeInPspdfkitScore={loadTimeInPspdfkitScore}
            pdf={pdf}
            licenseKey={licenseKey}
          />
        )}
      </div>
    );
  }
}

export default App;
