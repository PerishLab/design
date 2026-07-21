import { createRoot } from "react-dom/client";
import { BrowserRouter, useRoutes } from "react-router";
import { routes } from "./lib/routes";

function Site() {
	return useRoutes(routes);
}

const seat = document.getElementById("root");

if (seat) {
	createRoot(seat).render(
		<BrowserRouter>
			<Site />
		</BrowserRouter>,
	);
}
