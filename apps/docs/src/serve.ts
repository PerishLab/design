import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { render } from "svelte/server";
import App from "./App.svelte";

const shell = readFileSync("dist/index.html", "utf8");
const locales = [
	{ path: "/", lang: "en" },
	{ path: "/zh-CN/", lang: "zh-CN" },
];

function page(path: string, lang: string): string {
	const body = render(App, { props: { path } }).body;
	return shell
		.replace('<html lang="en">', `<html lang="${lang}">`)
		.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

for (const locale of locales) {
	const dir = locale.path === "/" ? "dist" : `dist${locale.path}`;
	mkdirSync(dir, { recursive: true });
	writeFileSync(`${dir}/index.html`, page(locale.path, locale.lang));
}
writeFileSync("dist/404.html", page("/404", "en"));
