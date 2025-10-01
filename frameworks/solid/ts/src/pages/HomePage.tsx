import { A } from "@solidjs/router";
import NutrientLogo from "../components/logos/NutrientLogo";
import SolidLogo from "../components/logos/SolidLogo";
import "./HomePage.css";

interface Example {
  path: string;
  title: string;
  description: string;
  features: string[];
}

function HomePage() {
  const examples: Example[] = [
    {
      path: "/basic-viewer",
      title: "Basic Viewer",
      description: "Simple PDF document loading with basic controls",
      features: ["Document loading", "Zoom controls", "Page navigation"],
    },
    {
      path: "/magazine-mode",
      title: "Magazine Mode",
      description: "Advanced magazine-style reader with custom features",
      features: [
        "Double-page layout",
        "Custom toolbar",
        "Fullscreen support",
        "iOS optimization",
      ],
    },
    {
      path: "/custom-overlays",
      title: "Custom Overlays",
      description: "Interactive overlays that appear on page clicks",
      features: [
        "Page click events",
        "HTML overlay content",
        "Dynamic positioning",
        "Video embedding",
      ],
    },
  ];

  return (
    <div class="homepage">
      <div class="homepage-container">
        <header class="homepage-header">
          <div class="homepage-tech-stack">
            <div class="tech-item">
              <A
                href="https://www.nutrient.io"
                target="_blank"
                rel="noopener noreferrer"
                class="link-no-style"
              >
                <NutrientLogo />
              </A>
            </div>
            <div class="tech-plus">+</div>
            <div class="tech-item">
              <A
                href="https://www.solidjs.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="link-no-style"
              >
                <SolidLogo />
              </A>
            </div>
          </div>
          <p class="homepage-subtitle">Select an example to get started</p>
        </header>

        <div class="examples-grid">
          {examples.map((example) => (
            <div class="example-card" key={example.path}>
              <h3 class="example-title">{example.title}</h3>
              <p class="example-description">{example.description}</p>

              <h4 class="features-title">Features:</h4>
              <ul class="features-list">
                {example.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <div class="button-container">
                <A href={example.path} class="view-button">
                  View
                </A>
              </div>
            </div>
          ))}
        </div>

        <footer class="homepage-footer">
          <p>
            Learn more:{" "}
            <a
              href="https://www.nutrient.io/guides/web/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nutrient Web SDK Documentation
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
