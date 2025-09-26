import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { loadBasicViewer } from "../nutrient/basic-viewer/implementation.js";
import { loadNutrientViewer } from "../nutrient/loadNutrientViewer.js";
import "./BasicViewerPage.css";

function BasicViewerPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    let nutrientViewer = null;

    (async () => {
      nutrientViewer = await loadNutrientViewer();

      if (container && nutrientViewer) {
        unloadBasicViewer(nutrientViewer, container);

        loadBasicViewer(nutrientViewer, container);
      }
    })();

    return () => {
      if (nutrientViewer && container) {
        unloadBasicViewer(nutrientViewer, container);
      }
    };
  }, []);

  return (
    <div className="basic-viewer-container">
      <nav className="basic-viewer-nav">
        <Link to="/" className="basic-viewer-back-link">
          ← Back to Examples
        </Link>
        <h2 className="basic-viewer-title">Basic Viewer</h2>
        <span className="basic-viewer-subtitle">
          Simple PDF viewing with standard controls
        </span>
      </nav>

      <div ref={containerRef} className="basic-viewer-content" />
    </div>
  );
}

export default BasicViewerPage;
