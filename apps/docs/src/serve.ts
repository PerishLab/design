import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { render } from "svelte/server";
import App from "./App.svelte";

const shell = readFileSync("dist/index.html", "utf8");
const pages = [
	{ path: "/", lang: "en" },
	{ path: "/zh-CN/", lang: "zh-CN" },
	{ path: "/gallery/", lang: "en" },
	{ path: "/zh-CN/gallery/", lang: "zh-CN" },
	{ path: "/proof/", lang: "en" },
];

function page(path: string, lang: string): string {
	const body = render(App, { props: { path } }).body;
	return shell
		.replace('<html lang="en">', `<html lang="${lang}">`)
		.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

for (const held of pages) {
	const dir = held.path === "/" ? "dist" : `dist${held.path}`;
	mkdirSync(dir, { recursive: true });
	writeFileSync(`${dir}/index.html`, page(held.path, held.lang));
}
writeFileSync("dist/404.html", page("/404", "en"));
