import React from "react";
import { NutrientWindow } from "../../index";

export default function Footer() {
  return (
    <footer className="Footer">
      Version 2.0, Nutrient Web SDK {(NutrientWindow.NutrientViewer as any).version}.
    </footer>
  );
}
