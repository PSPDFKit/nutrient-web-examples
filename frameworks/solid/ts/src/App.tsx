import { Route, Router } from "@solidjs/router";
import BasicViewerPage from "./pages/BasicViewerPage";
import CustomOverlaysPage from "./pages/CustomOverlaysPage";
import HomePage from "./pages/HomePage";
import MagazineModePage from "./pages/MagazineModePage";

function App() {
  return (
    <Router>
      <Route path="/" component={HomePage} />
      <Route path="/basic-viewer" component={BasicViewerPage} />
      <Route path="/magazine-mode" component={MagazineModePage} />
      <Route path="/custom-overlays" component={CustomOverlaysPage} />
    </Router>
  );
}

export default App;
