import React from "react";

import logo from "../logo.png";

export default function Introduction({ isWasm }) {
  return (
    <React.Fragment>
      <a href="https://www.nutrient.io/web">
        <img
          className="Logo"
          src={logo}
          alt="WebAssembly Benchmark by PSPDFKit"
        />
      </a>
      <div className="Description">
        <p>
          Welcome to the WebAssembly Benchmark by PSPDFKit, a real-world
          benchmark based on{" "}
          <a href="https://www.nutrient.io/web">PSPDFKit for Web</a>. Want to
          know more about the benchmark? Read the{" "}
          <a href="https://www.nutrient.io/blog/2018/a-real-world-webassembly-benchmark/">
            announcement blog post
          </a>
          .
        </p>
      </div>

      <div className="Switch">
        {isWasm && (
          <p>
            You’re running the WebAssembly Benchmark! For browsers that don’t
            support Wasm, we made a benchmark that runs a JavaScript version of
            PSPDFKit for Web.
            {isWasm && (
              <React.Fragment>
                {" "}
                You can find it <a href="?disableWebAssembly=true">here</a>.
              </React.Fragment>
            )}
          </p>
        )}
        {!isWasm && (
          <p>
            You’re running our benchmark using a compiled-to-JavaScript version
            of our PDF engine instead of the WebAssembly one. You can find the
            original benchmark <a href="?">here</a>.
          </p>
        )}
      </div>
    </React.Fragment>
  );
}
