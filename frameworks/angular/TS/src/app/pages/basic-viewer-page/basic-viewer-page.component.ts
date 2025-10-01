import {
  type AfterViewInit,
  Component,
  type ElementRef,
  type OnDestroy,
  ViewChild,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { loadBasicViewer } from "../../../nutrient/basic-viewer/implementation";
import { loadNutrientViewer } from "../../../nutrient/loadNutrientViewer";

@Component({
  selector: "app-basic-viewer-page",
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="basic-viewer-container">
      <nav class="basic-viewer-nav">
        <a routerLink="/" class="basic-viewer-back-link">
          ← Back to Examples
        </a>
        <h2 class="basic-viewer-title">Basic Viewer</h2>
        <span class="basic-viewer-subtitle">
          Simple PDF viewing with standard controls
        </span>
      </nav>

      <div #container class="basic-viewer-content"></div>
    </div>
  `,
  styleUrls: ["./basic-viewer-page.component.css"],
})
export class BasicViewerPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild("container", { static: true }) containerRef!: ElementRef;

  private nutrientViewer!: Awaited<ReturnType<typeof loadNutrientViewer>>;

  async ngAfterViewInit() {
    const container = this.containerRef.nativeElement;
    if (!container) return;

    try {
      this.nutrientViewer = await loadNutrientViewer();

      // Unload any existing instance
      this.nutrientViewer.unload(container);

      await loadBasicViewer(this.nutrientViewer, container);
    } catch (error) {
      console.error("Failed to load Nutrient Viewer:", error);
    }
  }

  ngOnDestroy() {
    if (this.nutrientViewer && this.containerRef?.nativeElement) {
      this.nutrientViewer.unload(this.containerRef.nativeElement);
    }
  }
}
