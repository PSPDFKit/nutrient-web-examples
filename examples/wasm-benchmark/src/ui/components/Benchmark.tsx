import React from "react";

import { isMobileOS } from "../../lib/utils";
import Footer from "./Footer";
import Nutrient from "./Nutrient";
import Test from "./Test";

type Props = {
  state: string;
  tests: Record<string, { state: string; progress: number }>;
  nutrientScore: number;
  loadTimeInNutrientScore: number;
  pdf: ArrayBuffer | null;
  licenseKey: string | null;
};

export default class Benchmark extends React.Component<Props> {
  render() {
    const {
      state,
      tests,
      nutrientScore,
      loadTimeInNutrientScore,
      pdf,
      licenseKey,
    } = this.props;

    return (
      <React.Fragment>
        <div className="BenchsHeader" aria-hidden="true">
          <div>Type of benchmark</div>
          <div>Median duration</div>
        </div>

        <Test
          id="Test-Rendering"
          data={tests["Test-Rendering"]}
          heading="Rendering all pages"
          description={
            <React.Fragment>
              <p>
                In this benchmark, we measure the rendering time for all pages
                using the{" "}
                <a
                  href="https://www.nutrient.io/api/web/NutrientViewer.Instance.html#renderPageAsArrayBuffer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instance#renderPageAsArrayBuffer API
                </a>
                .
              </p>
              <p>
                In production, we use multiple techniques to replace part of the
                rendered PDF pages as you zoom in to deliver a sharp document at
                any zoom level and resolution.
              </p>
            </React.Fragment>
          }
        />

        <Test
          id="Test-Searching"
          data={tests["Test-Searching"]}
          heading="Search a term"
          description={
            <p>
              In this benchmark, we use our{" "}
              <a
                href="https://www.nutrient.io/api/web/NutrientViewer.Instance.html#search"
                target="_blank"
                rel="noopener noreferrer"
              >
                search API
              </a>{" "}
              to search some text programmatically.
            </p>
          }
        />

        <Test
          id="Test-Exporting"
          data={tests["Test-Exporting"]}
          heading="Export"
          description={
            <React.Fragment>
              <p>
                In this benchmark, we export a PDF document to file, to
                InstantJSON, and to XFDF.
              </p>
              <p>
                Nutrient developed a JSON spec for PDF annotations and form
                fields called{" "}
                <a
                  href="https://www.nutrient.io/guides/web/importing-exporting/instant-json/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  InstantJSON
                </a>
                . This is a modern and clean JSON spec that all Nutrient
                products use to import and export metadata.
              </p>
              <p>
                Nutrient also comes with full{" "}
                <a
                  href="https://www.nutrient.io/guides/web/current/importing-exporting/xfdf-support/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  XFDF support
                </a>
                .
              </p>
            </React.Fragment>
          }
        />

        <Test
          id="Test-Annotations"
          data={tests["Test-Annotations"]}
          heading="Create 100 annotations"
          description={
            <p>
              In this benchmark, we use our{" "}
              <a
                href="https://www.nutrient.io/guides/web/current/annotations/introduction-to-annotations"
                target="_blank"
                rel="noopener noreferrer"
              >
                annotations API
              </a>{" "}
              to programmatically create 100 annotations and then export them as
              a PDF.
            </p>
          }
        />

        <Test
          id="Test-Initialization"
          data={tests["Test-Initialization"]}
          heading="Initialization: compilation and instantiation of the Wasm module"
          description={
              <React.Fragment>
                <p>
                  The initialization process consists of three steps:
                  downloading, compiling, and instantiation. In this benchmark,
                  we ignore download time.
                </p>
                <p>
                  Read about how you can{" "}
                  <a
                    href="https://www.nutrient.io/blog/2018/optimize-webassembly-startup-performance"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    optimize startup time
                  </a>
                  .
                </p>
                <p>
                  This test must run at the end to avoid penalizing browsers
                  that run a baseline compiler first. In those cases, multiple
                  initializations might start a background compilation which
                  slows down tests that run afterwards.
                </p>
              </React.Fragment>
          }
        />

        <div>
          <div className="Result">
            <div className="Result-message">
              {state === "running" ? (
                <React.Fragment>
                  Running
                  <span className="Progress">
                    <span className="Progress-dots">...</span>
                  </span>
                </React.Fragment>
              ) : (
                "All done!"
              )}
            </div>
            {state === "done" && (
              <div className="Result-score">
                <div className="Score">
                  { (
                    <div className="Score-label">Nutrient Wasm Score</div>
                  )}
                  <div className="Score-value">{nutrientScore}</div>
                </div>
              </div>
            )}
          </div>

          {state === "done" && (
            <div className="ResultDetails isDone isHidden">
              <p>
                The score is the total benchmark time. The lower the score, the
                better.
              </p>
              <p>
                In this benchmark, we defined two buckets to measure{" "}
                <em>compilation/instantiation</em> time and <em>computation</em>{" "}
                time. This enables us to perform a fairer comparison between
                vendors, since loading time can make a difference.
              </p>
              <div className="LoadTime">
                <div
                  className="LoadTime-bar"
                  style={{ width: `${loadTimeInNutrientScore}%` }}
                />
              </div>
              <p>
                For this browser, compilation/instantiation time accounts for{" "}
                {loadTimeInNutrientScore}% of the total time.
              </p>
            </div>
          )}
        </div>

        {state === "done" && (
          <div className="ResultCTA">
            <a href="https://www.nutrient.io/web/" className="Button">
              Learn more about Nutrient Web SDK
            </a>
          </div>
        )}

        {state === "done" && !isMobileOS() && (
          <Nutrient pdf={pdf} licenseKey={licenseKey} />
        )}

        <Footer />
      </React.Fragment>
    );
  }
}
