import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  loadCustomOverlaysViewer,
  unloadCustomOverlaysViewer,
} from "../nutrient/custom-overlays/implementation";
import { loadNutrientViewer } from "../nutrient/loadNutrientViewer";

function CustomOverlaysPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    let nutrientViewer: Awaited<ReturnType<typeof loadNutrientViewer>> | null =
      null;

    (async () => {
      nutrientViewer = await loadNutrientViewer();

      if (container && nutrientViewer) {
        unloadCustomOverlaysViewer(nutrientViewer, container);

        loadCustomOverlaysViewer(nutrientViewer, container);
      }
    })();

    return () => {
      if (nutrientViewer && container) {
        unloadCustomOverlaysViewer(nutrientViewer, container);
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
          to="/"
          style={{
            textDecoration: "none",
            color: "#4A8FED",
            fontSize: "0.9rem",
          }}
        >
          ← Back to Examples
        </Link>
        <h2 style={{ margin: 0, fontSize: "1.1rem" }}>Custom Overlays</h2>
        <span style={{ fontSize: "0.9rem", color: "#666" }}>
          Interactive overlays that appear on page clicks
        </span>
      </nav>

      <div ref={containerRef} style={{ flex: 1, width: "100%" }} />
    </div>
  );
}

export default CustomOverlaysPage;
