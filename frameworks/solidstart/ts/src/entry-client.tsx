// @refresh reload
import { StartClient, mount } from "@solidjs/start/client";

// biome-ignore lint/style/noNonNullAssertion: App element is guaranteed to exist in HTML
mount(() => <StartClient />, document.getElementById("app")!);
