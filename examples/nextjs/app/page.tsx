"use client";

import type * as Nutrient from "@nutrient-sdk/viewer";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<Nutrient.Instance | null>(null);
  const [document, setDocument] = useState("/example.pdf");

  const handleOpen = () => {
    setDocument((prev) =>
      prev === "/example.pdf" ? "/another-example.pdf" : "/example.pdf",
    );
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !window.NutrientViewer) return;

    window.NutrientViewer.load({
      container,
      document,
      useCDN: true,
    }).then((instance) => {
      instanceRef.current = instance;
    });

    return () => {
      if (container) {
        window.NutrientViewer?.unload(container);
      }
    };
  }, [document]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <button
        onClick={handleOpen}
        type="button"
        style={{
          background: "#4a8fed",
          border: "none",
          borderRadius: "4px",
          color: "#fff",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          margin: "10px auto",
          padding: "10px 20px",
        }}
      >
        Open another document
      </button>
      <div ref={containerRef} style={{ flex: 1, position: "relative" }} />
    </div>
  );
}
