import {
  type AfterViewInit,
  Component,
  type ElementRef,
  type OnDestroy,
  ViewChild,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { loadCustomOverlaysViewer } from "../../../examples/custom-overlays/implementation";
import { loadNutrientViewer } from "../../utils/loadNutrientViewer";

@Component({
  selector: "app-custom-overlays-page",
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="custom-overlays-container">
      <nav class="custom-overlays-nav">
        <a routerLink="/" class="custom-overlays-back-link">
          ← Back to Examples
        </a>
        <h2 class="custom-overlays-title">Custom Overlays</h2>
        <span class="custom-overlays-subtitle">
          Interactive overlays that appear on page clicks
        </span>
      </nav>

      <div #container class="custom-overlays-content"></div>
    </div>
  `,
  styleUrls: ["./custom-overlays-page.component.css"],
})
export class CustomOverlaysPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild("container", { static: true }) containerRef!: ElementRef;

  private nutrientViewer: ReturnType<typeof loadNutrientViewer>;

  async ngAfterViewInit() {
    const container = this.containerRef.nativeElement;
    if (!container) return;

    try {
      this.nutrientViewer = await loadNutrientViewer();

      // Unload any existing instance
      this.nutrientViewer.unload(container);

      await loadCustomOverlaysViewer(this.nutrientViewer, container);
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
