import { useEffect, useRef } from "react";

export default function PdfViewerComponent(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let NutrientViewer;

    (async () => {
      NutrientViewer = await import("@nutrient-sdk/viewer");
      await NutrientViewer.load({
        // Container where Nutrient should be mounted.
        container,
        // The document to open.
        document: props.document,
        // Use the public directory URL as a base URL. Nutrient will download its library assets from here.
        baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
      });
    })();

    return () => NutrientViewer?.unload(container);
  }, [props.document]);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}
