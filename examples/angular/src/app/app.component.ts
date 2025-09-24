import { Component } from "@angular/core";
import NutrientViewer from "@nutrient-sdk/viewer";

import type * as Nutrient from "@nutrient-sdk/viewer";

type NutrientWindow = Window & { instance: Nutrient.Instance };

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "Nutrient Web SDK Angular Example";

  ngAfterViewInit() {
    NutrientViewer.load({
      // Use the assets directory URL as a base URL. Nutrient Web SDK will download its library assets from here.
      baseUrl: `${location.protocol}//${location.host}/assets/`,
      document: "/assets/example.pdf",
      container: "#nutrient-container",
    }).then((instance: Nutrient.Instance) => {
      // For the sake of this demo, store the Nutrient Web SDK instance
      // on the global object so that you can open the dev tools and
      // play with the Nutrient Web SDK API.
      (window as unknown as NutrientWindow).instance = instance;
    });
  }
}
