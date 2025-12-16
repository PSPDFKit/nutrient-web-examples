import type * as Nutrient from "@nutrient-sdk/viewer";
import { useEffect, useRef } from "react";

interface PdfViewerProps {
  document: string;
}

export default function PdfViewer({ document }: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<Nutrient.Instance | null>(null);

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
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    />
  );
}
