import React from "react";

import logo from "../logo.png";

export default function Introduction() {
  return (
    <React.Fragment>
      <a href="https://www.nutrient.io/web">
        <img
          className="Logo"
          src={logo}
          alt="WebAssembly Benchmark by Nutrient"
        />
      </a>
      <div className="Description">
        <p>
          Welcome to the WebAssembly Benchmark by Nutrient, a real-world
          benchmark based on{" "}
          <a href="https://www.nutrient.io/web">Nutrient Web SDK</a>. Want to
          know more about the benchmark? Read the{" "}
          <a href="https://www.nutrient.io/blog/2018/a-real-world-webassembly-benchmark/">
            announcement blog post
          </a>
          .
        </p>
      </div>

      <div className="Switch">
        { (
          <p>
            You’re running the WebAssembly Benchmark!
          </p>
        )}
      </div>
    </React.Fragment>
  );
}
