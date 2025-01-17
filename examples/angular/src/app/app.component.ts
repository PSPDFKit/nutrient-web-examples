import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import PSPDFKit from "pspdfkit";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "Nutrient Web SDK Angular Example";

  ngAfterViewInit() {
    PSPDFKit.load({
      // Use the assets directory URL as a base URL. PSPDFKit will download its library assets from here.
      baseUrl: `${location.protocol}//${location.host}/assets/`,
      document: "/assets/example.pdf",
      container: "#pspdfkit-container",
    }).then((instance) => {
      // For the sake of this demo, store the Nutrient Web SDK instance
      // on the global object so that you can open the dev tools and
      // play with the PSPDFKit API.
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      (window as any).instance = instance;
    });
  }
}
