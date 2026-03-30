import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import Home from "./pages/index.jsx";
import Viewport from "./templates/Viewport.jsx";
import "./styles/global.css";

const DOCUMENTS = [
  "example1.pdf",
  "example2.pdf",
  "example3.pdf",
  "example4.pdf",
  "example5.pdf",
];

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout documents={DOCUMENTS} />}>
        <Route index element={<Home />} />
        <Route path=":slug" element={<Viewport />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
