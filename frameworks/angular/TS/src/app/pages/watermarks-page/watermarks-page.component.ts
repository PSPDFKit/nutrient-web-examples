import {
  type AfterViewInit,
  Component,
  type ElementRef,
  type OnDestroy,
  ViewChild,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { loadNutrientViewer } from "../../../nutrient/loadNutrientViewer";
import {
  loadWatermarksViewer,
  unloadWatermarksViewer,
} from "../../nutrient/watermarks/implementation";

@Component({
  selector: "app-watermarks-page",
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="basic-viewer-container">
      <nav class="basic-viewer-nav">
        <a routerLink="/" class="basic-viewer-back-link">
          ← Back to Examples
        </a>
        <h2 class="basic-viewer-title">Watermarks</h2>
        <span class="basic-viewer-subtitle">
          Add watermarks to PDFs using JavaScript
        </span>
      </nav>

      <div #container class="basic-viewer-content"></div>
    </div>
  `,
  styleUrls: ["../basic-viewer-page/basic-viewer-page.component.css"],
})
export class WatermarksPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild("container", { static: true }) containerRef!: ElementRef;

  private nutrientViewer!: Awaited<ReturnType<typeof loadNutrientViewer>>;

  async ngAfterViewInit() {
    const container = this.containerRef.nativeElement;

    if (!container) return;

    try {
      this.nutrientViewer = await loadNutrientViewer();

      // Unload any existing instance
      unloadWatermarksViewer(this.nutrientViewer, container);

      await loadWatermarksViewer(this.nutrientViewer, container);
    } catch (error) {
      console.error("Failed to load Nutrient Viewer:", error);
    }
  }

  ngOnDestroy() {
    if (this.nutrientViewer && this.containerRef?.nativeElement) {
      unloadWatermarksViewer(
        this.nutrientViewer,
        this.containerRef.nativeElement,
      );
    }
  }
}
