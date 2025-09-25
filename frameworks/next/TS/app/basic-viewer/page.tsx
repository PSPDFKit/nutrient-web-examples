import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  loadBasicViewer,
  unloadBasicViewer,
} from "../../examples/basic-viewer/implementation";
import { loadNutrientViewer } from "../utils/loadNutrientViewer";
import "./BasicViewerPage.css";

function BasicViewerPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    let nutrientViewer: ReturnType<typeof loadNutrientViewer>;

    try {
      nutrientViewer = loadNutrientViewer();

      loadBasicViewer(nutrientViewer, container);
    } catch (error) {
      console.error("Failed to load Nutrient Viewer:", error);
    }

    return () => {
      if (nutrientViewer && container) {
        unloadBasicViewer(nutrientViewer, container);
      }
    };
  }, []);

  return (
    <div className="basic-viewer-container">
      <nav className="basic-viewer-nav">
        <Link href="/" className="basic-viewer-back-link">
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
