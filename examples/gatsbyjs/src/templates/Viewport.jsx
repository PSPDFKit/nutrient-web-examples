import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const Viewport = () => {
  const { slug } = useParams();
  const containerRef = useRef();

  useEffect(() => {
    const containerElement = containerRef.current;

    if (containerElement) {
      let NutrientViewer;
      const nutrientScript = document.createElement("script");

      nutrientScript.onload = () => {
        NutrientViewer = window.NutrientViewer;
        NutrientViewer.load({
          container: containerElement,
          document: `/assets/${slug}`,
        });
      };
      nutrientScript.src =
        "https://cdn.cloud.pspdfkit.com/pspdfkit-web@1.8.0/nutrient-viewer.js";
      document.head.appendChild(nutrientScript);

      return () => {
        NutrientViewer?.unload(containerElement);
        nutrientScript.remove();
      };
    }
  }, [slug]);

  return <div className="viewport" ref={containerRef} />;
};

export default Viewport;
