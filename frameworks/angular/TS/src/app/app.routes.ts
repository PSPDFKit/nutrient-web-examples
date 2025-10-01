import { BasicViewerPageComponent } from "./pages/basic-viewer-page/basic-viewer-page.component";
import { CustomOverlaysPageComponent } from "./pages/custom-overlays-page/custom-overlays-page.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { MagazineModePageComponent } from "./pages/magazine-mode-page/magazine-mode-page.component";
import { WatermarksPageComponent } from "./pages/watermarks-page/watermarks-page.component";

export const routes = [
  { path: "", component: HomePageComponent },
  { path: "basic-viewer", component: BasicViewerPageComponent },
  { path: "magazine-mode", component: MagazineModePageComponent },
  { path: "custom-overlays", component: CustomOverlaysPageComponent },
  { path: "watermarks", component: WatermarksPageComponent },
  { path: "**", redirectTo: "" },
];
