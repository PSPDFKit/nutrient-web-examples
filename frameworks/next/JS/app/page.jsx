import Link from "next/link";
import "./page.css";
import { NutrientLogo } from "./components/logos/NutrientLogo";
import ReactLogo from "./components/logos/ReactLogo";

function HomePage() {
  const examples = [
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
    <div className="homepage">
      <div className="homepage-container">
        <header className="homepage-header">
          <div className="homepage-tech-stack">
            <div className="tech-item">
              <a
                href="https://www.nutrient.io"
                target="_blank"
                rel="noopener noreferrer"
                className="link-no-style"
              >
                <NutrientLogo />
              </a>
            </div>
            <div className="tech-plus">+</div>
            <div className="tech-item">
              <a
                href="https://react.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-no-style"
              >
                <ReactLogo />
              </a>
            </div>
          </div>
          <p className="homepage-subtitle">Select an example to get started</p>
        </header>

        <div className="examples-grid">
          {examples.map((example) => (
            <div key={example.path} className="example-card">
              <h3 className="example-title">{example.title}</h3>
              <p className="example-description">{example.description}</p>

              <h4 className="features-title">Features:</h4>
              <ul className="features-list">
                {example.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <div className="button-container">
                <Link href={example.path} className="view-button">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>

        <footer className="homepage-footer">
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
