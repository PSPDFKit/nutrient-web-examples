import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasicViewerPage from "./pages/BasicViewerPage";
import CustomOverlaysPage from "./pages/CustomOverlaysPage";
import HomePage from "./pages/HomePage";
import MagazineModePage from "./pages/MagazineModePage";
import WatermarksPage from "./pages/WatermarksPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/basic-viewer" element={<BasicViewerPage />} />
        <Route path="/magazine-mode" element={<MagazineModePage />} />
        <Route path="/custom-overlays" element={<CustomOverlaysPage />} />
        <Route path="/watermarks" element={<WatermarksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
