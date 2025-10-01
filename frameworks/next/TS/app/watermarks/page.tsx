"use client";

import type NutrientViewer from "@nutrient-sdk/viewer";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { loadNutrientViewer } from "../../nutrient/loadNutrientViewer";
import {
  loadWatermarksViewer,
  unloadWatermarksViewer,
} from "../../nutrient/watermarks/implementation";
import "../basic-viewer/BasicViewerPage.css";

function WatermarksPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    let nutrientViewer: typeof NutrientViewer | null = null;

    (async () => {
      nutrientViewer = await loadNutrientViewer();

      if (container && nutrientViewer) {
        loadWatermarksViewer(nutrientViewer, container);
      }
    })();

    return () => {
      if (nutrientViewer && container) {
        unloadWatermarksViewer(nutrientViewer, container);
      }
    };
  }, []);

  return (
    <div className="basic-viewer-container">
      <nav className="basic-viewer-nav">
        <Link href="/" className="basic-viewer-back-link">
          ← Back to Examples
        </Link>
        <h2 className="basic-viewer-title">Watermarks</h2>
        <span className="basic-viewer-subtitle">
          Add watermarks to PDFs using JavaScript
        </span>
      </nav>

      <div ref={containerRef} className="basic-viewer-content" />
    </div>
  );
}

export default WatermarksPage;
