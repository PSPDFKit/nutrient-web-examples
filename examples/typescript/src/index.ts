import NutrientViewer from "@nutrient-sdk/viewer";

let instance: unknown = null;

function load(document: string) {
  console.log(`Loading ${document}...`);
  NutrientViewer.load({
    document,
    container: ".container",
    baseUrl: "",
    toolbarItems: [
      {
        type: "custom",
        title: "Random annotation",
        className: "randomAnnotation",
        onPress: () => {
          if (!(instance instanceof NutrientViewer.Instance)) return;

          // Get page 0 dimensions
          const { width, height } = instance.pageInfoForIndex(0);
          // Create a rectangle annotation in page 0 with random position
          // and dimensions
          const left =
            Math.random() *
            (width - NutrientViewer.Options.MIN_SHAPE_ANNOTATION_SIZE);
          const top =
            Math.random() *
            (height - NutrientViewer.Options.MIN_SHAPE_ANNOTATION_SIZE);
          const annotationProperties = {
            boundingBox: new NutrientViewer.Geometry.Rect({
              left,
              top,
              width: Math.random() * (width - left),
              height: Math.random() * (height - top),
            }),
            strokeColor: new NutrientViewer.Color({
              r: Math.floor(Math.random() * 255),
              g: Math.floor(Math.random() * 255),
              b: Math.floor(Math.random() * 255),
            }),
            fillColor: new NutrientViewer.Color({
              r: Math.floor(Math.random() * 255),
              g: Math.floor(Math.random() * 255),
              b: Math.floor(Math.random() * 255),
            }),
            strokeDashArray: [[1, 1], [3, 3], [6, 6], null][
              Math.floor(Math.random() * 4)
            ] as [number, number] | null,
            strokeWidth: Math.random() * 30,
          };
          const annotationClass = [
            NutrientViewer.Annotations.RectangleAnnotation,
            NutrientViewer.Annotations.EllipseAnnotation,
          ][Math.floor(Math.random() * 2)];

          instance.create(
            new annotationClass({
              ...annotationProperties,
              pageIndex: 0,
            }),
          );
        },
      },
    ],
  })
    .then((_instance) => {
      instance = _instance;
      _instance.addEventListener("annotations.change", () => {
        console.log(`${document} loaded!`);
      });
    })
    .catch(console.error);
}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

let objectUrl = "";

document.addEventListener("change", (event: HTMLInputEvent) => {
  if (
    event.target &&
    event.target.className === "chooseFile" &&
    event.target.files instanceof FileList
  ) {
    NutrientViewer.unload(".container");

    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }

    objectUrl = URL.createObjectURL(event.target.files[0]);
    load(objectUrl);
  }
});

load("example.pdf");
