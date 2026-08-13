import { hydrate, mount } from "svelte";
import App from "./App.svelte";

const target = document.getElementById("root");
if (target !== null) {
	const props = { path: globalThis.location.pathname };
	(target.hasChildNodes() ? hydrate : mount)(App, { target, props });
}
