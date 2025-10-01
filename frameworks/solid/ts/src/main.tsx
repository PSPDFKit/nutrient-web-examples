import { render } from "solid-js/web";
import App from "./App";
import "./index.css";

// biome-ignore lint/style/noNonNullAssertion: SolidJS root element is guaranteed to exist
render(() => <App />, document.getElementById("root")!);
