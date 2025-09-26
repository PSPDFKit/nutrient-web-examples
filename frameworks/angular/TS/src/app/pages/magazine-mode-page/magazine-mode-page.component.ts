import {
  type AfterViewInit,
  Component,
  type ElementRef,
  type OnDestroy,
  ViewChild,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { loadNutrientViewer } from "../../../nutrient/loadNutrientViewer";
import { loadMagazineViewer } from "../../../nutrient/magazine-mode/implementation";

@Component({
  selector: "app-magazine-mode-page",
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="magazine-mode-container">
      <nav class="magazine-mode-nav">
        <a routerLink="/" class="magazine-mode-back-link">
          ← Back to Examples
        </a>
        <h2 class="magazine-mode-title">Magazine Mode</h2>
        <span class="magazine-mode-subtitle">
          Advanced magazine-style reader with custom features
        </span>
      </nav>

      <div #container class="magazine-mode-content"></div>
    </div>
  `,
  styleUrls: ["./magazine-mode-page.component.css"],
})
export class MagazineModePageComponent implements AfterViewInit, OnDestroy {
  @ViewChild("container", { static: true }) containerRef!: ElementRef;

  private nutrientViewer!: ReturnType<typeof loadNutrientViewer>;

  async ngAfterViewInit() {
    const container = this.containerRef.nativeElement;
    if (!container) return;

    try {
      this.nutrientViewer = await loadNutrientViewer();

      // Unload any existing instance
      this.nutrientViewer.unload(container);

      await loadMagazineViewer(this.nutrientViewer, container);
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
