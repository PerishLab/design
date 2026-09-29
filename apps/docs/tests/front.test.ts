import { readFileSync } from "node:fs";
import { render } from "svelte/server";
import { expect, test, vi } from "vitest";
import App from "../src/App.svelte";
import Front from "../src/front/Front.svelte";
import { front as english } from "../src/lib/i18n/en/front.ts";
import { front as chinese } from "../src/lib/i18n/zh/front.ts";
import { page } from "../src/lib/page.ts";

vi.mock(
	"@perishlab/design",
	() => import("../../../packages/design/src/lib.ts"),
);
vi.mock("@perishlab/bone", () => import("../../../packages/bone/src/lib.ts"));

const template = readFileSync("index.html", "utf8");

const fronts = [
	{
		path: "/",
		lang: "en",
		title: "Perish Design — Svelte design system",
		claim: "Language changes. Structure remains.",
		book: english,
	},
	{
		path: "/zh-CN/",
		lang: "zh-CN",
		title: "Perish Design — Svelte 设计系统",
		claim: "审美会变，骨架不变",
		book: chinese,
	},
];

function shown(path: string): string {
	return render(App, { props: { path } }).body.replace(/<!--[^>]*-->/g, "");
}

const composed = render(Front, { props: { tone: "system" } }).body.replace(
	/<!--[^>]*-->/g,
	"",
);

const bare = new Set(["input", "img", "br", "hr", "meta", "link", "source"]);

function tops(html: string): string[] {
	const found: string[] = [];
	let depth = 0;
	for (const hit of html.matchAll(/<(\/?)([a-z][\w-]*)[^>]*?(\/?)>/g)) {
		if (hit[1] === "/") depth -= 1;
		else if (hit[3] === "/" || bare.has(hit[2])) {
			if (depth === 0) found.push(hit[0]);
		} else {
			if (depth === 0) found.push(hit[0]);
			depth += 1;
		}
	}
	return found;
}

function first(html: string): string {
	return html.slice(0, html.indexOf('<div class="course course-well">'));
}

test.each(fronts)("$lang front states one proposition", (front) => {
	const body = `<h1>${front.book.claim}</h1>`;
	const document = page(template, body, front.path, front.lang);
	expect(document).toContain(`<html lang="${front.lang}">`);
	expect(document.match(/<title>/g)).toHaveLength(1);
	expect(document).toContain(`<title>${front.title}</title>`);
	expect(document.match(/<meta name="description"/g)).toHaveLength(1);
	expect(document.match(/<h1>/g)).toHaveLength(1);
	expect(document).toContain(`<h1>${front.claim}</h1>`);
});

test.each(fronts)("$lang proposition occupies the hero title", (front) => {
	const html = shown(front.path);
	expect(html.split(`<h1>${front.claim}</h1>`)).toHaveLength(2);
	expect(first(html)).toMatch(
		new RegExp(`<header class="hero hero-claim"><h1>${front.claim}</h1>`),
	);
});

test("the proposition opens in a full typographic course", () => {
	expect(tops(composed)[0]).toBe(
		'<div class="course course-plain course-full">',
	);
	expect(first(composed)).toContain('<header class="hero hero-claim">');
});

test("the first course pairs the proposition with its visual proof", () => {
	const held = first(composed);
	expect(held).toContain("--ruled: repeat(12, minmax(0, 1fr));");
	expect(held).toContain(
		'<div class="cell cell-start" style="--seat: span 5;">',
	);
	expect(held).toContain(
		'<div class="cell cell-fill" style="--seat: span 7;">',
	);
	expect(held).toContain('<section class="carousel"');
	expect(held).not.toContain("front.voice");
	expect(held).toContain('role="tablist"');
	expect(held.match(/aria-selected="true"/g)).toHaveLength(1);
});

test("the homepage owns the complete gallery", () => {
	expect(tops(composed)).toEqual([
		'<div class="course course-plain course-full">',
		'<div class="course course-well">',
	]);
	const gallery = composed.slice(first(composed).length);
	expect(gallery).toContain('<input class="search-input" type="search"');
	expect(gallery).toContain('<select class="pick-input"');
	expect(gallery).toContain('<div class="stage stage-view">');
	expect(composed).not.toContain("portal");
	expect(shown("/gallery/")).toBe(shown("/404"));
	expect(shown("/zh-CN/gallery/")).toBe(shown("/zh-CN/404"));
	for (const path of ["/gallery/", "/zh-CN/gallery/"])
		expect(page(template, "", path, "en")).toBe(template);
});

test("the language proof renders a real component composition", () => {
	const layer = first(composed).slice(composed.indexOf("carousel-layer"));
	const inner = layer.slice(layer.indexOf(">") + 1);
	expect(
		inner.startsWith('<div class="shell"><div class="stage stage-open">'),
	).toBe(true);
	expect(layer).toContain('<section class="board board-bare">');
	expect(layer).toContain("--ruled: repeat(2, minmax(0, 1fr));");
});

test("the former homepage material has focused destinations", () => {
	const routes = ["why", "what", "how", "blog"];
	for (const path of routes.map((route) => `/${route}/`)) {
		expect(shown(path)).not.toBe(shown("/404"));
		expect(shown(`/zh-CN${path}`)).not.toBe(shown("/zh-CN/404"));
		expect(page(template, "", path, "en")).not.toBe(template);
		expect(page(template, "", `/zh-CN${path}`, "zh-CN")).not.toBe(template);
	}
});
