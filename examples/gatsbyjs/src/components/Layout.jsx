import React from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "./Menu.jsx";

const Layout = ({ documents }) => (
  <div>
    <Menu documents={documents} />
    <Outlet />
  </div>
);

export { Layout };
