"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { loadNutrientViewer } from "../../nutrient/loadNutrientViewer";
import {
  loadMagazineViewer,
  unloadMagazineViewer,
} from "../../nutrient/magazine-mode/implementation";

function MagazineModePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    let nutrientViewer: Awaited<ReturnType<typeof loadNutrientViewer>> | null =
      null;

    (async () => {
      nutrientViewer = await loadNutrientViewer();

      if (container && nutrientViewer) {
        unloadMagazineViewer(nutrientViewer, container);

        loadMagazineViewer(nutrientViewer, container);
      }
    })();

    return () => {
      if (nutrientViewer && container) {
        unloadMagazineViewer(nutrientViewer, container);
      }
    };
  }, []);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <nav
        style={{
          padding: "1rem",
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "#4A8FED",
            fontSize: "0.9rem",
          }}
        >
          ← Back to Examples
        </Link>
        <h2 style={{ margin: 0, fontSize: "1.1rem" }}>Magazine Mode</h2>
        <span style={{ fontSize: "0.9rem", color: "#666" }}>
          Double-page layout with custom toolbar and fullscreen support
        </span>
      </nav>

      <div ref={containerRef} style={{ flex: 1, width: "100%" }} />
    </div>
  );
}

export default MagazineModePage;
