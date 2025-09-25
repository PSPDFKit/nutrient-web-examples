import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { loadBasicViewer } from "../examples/basic-viewer/implementation";
import { loadNutrientViewer } from "../utils/loadNutrientViewer";
import "./BasicViewerPage.css";

function BasicViewerPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let nutrientViewer: Awaited<ReturnType<typeof loadNutrientViewer>>;

    const initViewer = async () => {
      try {
        nutrientViewer = await loadNutrientViewer();

        // Unload any existing instance
        nutrientViewer.unload(container);

        await loadBasicViewer(nutrientViewer, container);
      } catch (error) {
        console.error("Failed to load Nutrient Viewer:", error);
      }
    };

    initViewer();

    return () => {
      if (nutrientViewer && container) {
        // Use synchronous unload like the working example
        nutrientViewer.unload(container);
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
