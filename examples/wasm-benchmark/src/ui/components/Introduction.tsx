import React from "react";

import logo from "../logo.svg";

export default function Introduction() {
  return (
    <React.Fragment>
      <header className="Header">
        <a href="https://www.nutrient.io/web" className="HeaderLogo">
          <img
            className="Logo"
            src={logo}
            alt="WebAssembly Benchmark by Nutrient"
          />
        </a>
      </header>
      <div className="Description">
        <p>
          Welcome to the WebAssembly Benchmark by Nutrient, a real-world
          benchmark based on{" "}
          <a href="https://www.nutrient.io/web">Nutrient Web SDK</a>. Want to
          know more about the benchmark? Read the{" "}
          <a href="https://www.nutrient.io/blog/a-real-world-webassembly-benchmark/">
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
