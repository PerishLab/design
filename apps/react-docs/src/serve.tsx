import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { renderToString } from "react-dom/server";
import { MemoryRouter, useRoutes } from "react-router";
import { locales, routes } from "./lib/routes";

function Site() {
	return useRoutes(routes);
}

function render(path: string): string {
	return renderToString(
		<MemoryRouter initialEntries={[path]}>
			<Site />
		</MemoryRouter>,
	);
}

const shell = readFileSync("dist/index.html", "utf8");

for (const seat of locales) {
	const body = render(seat.path);
	const tag = seat.locale === "zh" ? "zh-CN" : "en";
	const page = shell
		.replace('<html lang="en">', `<html lang="${tag}">`)
		.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
	const dir = seat.path === "/" ? "dist" : `dist${seat.path}`;
	mkdirSync(dir, { recursive: true });
	writeFileSync(`${dir}/index.html`, page);
	console.log(`prerendered ${seat.path} as ${tag}`);
}
