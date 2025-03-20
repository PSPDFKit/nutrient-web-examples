import NutrientViewer from "@nutrient-sdk/viewer";
import { Elm } from "./Main";

let instance;

const appNode = document.createElement("div");
appNode.id = "my-app";
document.body.appendChild(appNode);

const app = Elm.Main.init({
  node: appNode,
});

app.ports.configure.subscribe((data) => {
  const initialViewState = new NutrientViewer.ViewState(data.viewState);
  const config = { ...data, initialViewState };

  NutrientViewer.load(config).then(async (nutrient) => {
    instance = nutrient;
  });
});

app.ports.annotate.subscribe((data) => {
  const annotations = data.annotations.map(
    (a) =>
      new NutrientViewer.Annotations.TextAnnotation({
        ...a,
        fontColor: new NutrientViewer.Color(NutrientViewer.Color[a.fontColor]),
        backgroundColor: new NutrientViewer.Color(
          NutrientViewer.Color[a.backgroundColor],
        ),
        boundingBox: new NutrientViewer.Geometry.Rect(a.boundingBox),
      }),
  );

  instance.create(annotations);
});
