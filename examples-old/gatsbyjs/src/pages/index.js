import * as React from "react";
import { withLayout } from "../components/Layout";

const Home = () => (
  <div className="centered">
    <p>
      Integration of <a href="https://www.nutrient.io/try">Nutrient Web SDK</a>{" "}
      in GatsbyJS.
    </p>
    <p>Navigate between the different documents using the menu above</p>
  </div>
);

export default withLayout(Home);
