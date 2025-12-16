import { useState } from "react";
import PdfViewer from "./components/PdfViewer";
import "./App.css";

export default function App() {
  const [document, setDocument] = useState("document.pdf");

  const handleOpen = () => {
    setDocument((prev) =>
      prev === "document.pdf" ? "another-example.pdf" : "document.pdf",
    );
  };

  return (
    <div className="App">
      <button className="App-button" onClick={handleOpen} type="button">
        Open another document
      </button>
      <div className="App-viewer">
        <PdfViewer document={document} />
      </div>
    </div>
  );
}
