// @refresh reload
import { StartClient, mount } from "@solidjs/start/client";

export default function () {
  mount(() => <StartClient />, document.getElementById("app"));
}
