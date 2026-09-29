import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { render } from "svelte/server";
import App from "./App.svelte";
import { page } from "./lib/page.ts";

const shell = readFileSync("dist/index.html", "utf8");
const pages = [
	{ path: "/", lang: "en" },
	{ path: "/zh-CN/", lang: "zh-CN" },
	{ path: "/why/", lang: "en" },
	{ path: "/what/", lang: "en" },
	{ path: "/how/", lang: "en" },
	{ path: "/blog/", lang: "en" },
	{ path: "/zh-CN/why/", lang: "zh-CN" },
	{ path: "/zh-CN/what/", lang: "zh-CN" },
	{ path: "/zh-CN/how/", lang: "zh-CN" },
	{ path: "/zh-CN/blog/", lang: "zh-CN" },
	{ path: "/proof/", lang: "en" },
];

for (const held of pages) {
	const dir = held.path === "/" ? "dist" : `dist${held.path}`;
	const body = render(App, { props: { path: held.path } }).body;
	mkdirSync(dir, { recursive: true });
	writeFileSync(`${dir}/index.html`, page(shell, body, held.path, held.lang));
}
const missing = render(App, { props: { path: "/404" } }).body;
writeFileSync("dist/404.html", page(shell, missing, "/404", "en"));
