"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { loadNutrientViewer } from "../utils/loadNutrientViewer.js";
import "./BasicViewerPage.css";

export default function BasicViewerPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let nutrientViewer = null;

    const initViewer = async () => {
      try {
        nutrientViewer = await loadNutrientViewer();

        // Unload any existing instance
        nutrientViewer.unload(container);

        // Load the viewer with basic configuration
        await nutrientViewer.load({
          container,
          document: "https://www.nutrient.io/downloads/nutrient-web-demo.pdf",
        });
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
