import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasicViewerPage from "./pages/BasicViewerPage";
import HomePage from "./pages/HomePage";
import MagazineModePage from "./pages/MagazineModePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/basic-viewer" element={<BasicViewerPage />} />
        <Route path="/magazine-mode" element={<MagazineModePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
