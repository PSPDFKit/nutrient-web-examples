import React from "react";
import { Menu } from "./Menu";

const withLayout = (Viewport) => (props) => (
  <div>
    <Menu />
    <Viewport {...props} />
  </div>
);

export { withLayout };
