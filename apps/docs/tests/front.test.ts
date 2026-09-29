import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";
import { front as english } from "../src/lib/i18n/en/front.ts";
import { front as chinese } from "../src/lib/i18n/zh/front.ts";
import { page } from "../src/lib/page.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const shell = readFileSync(join(root, "index.html"), "utf8");
const composition = readFileSync(join(root, "src/front/Front.svelte"), "utf8");
const application = readFileSync(join(root, "src/App.svelte"), "utf8");
const gallery = readFileSync(join(root, "src/gallery/Gallery.svelte"), "utf8");
const specimen = readFileSync(join(root, "src/gallery/Sample.svelte"), "utf8");
const turn = readFileSync(join(root, "src/front/Turn.svelte"), "utf8");
const server = readFileSync(join(root, "src/serve.ts"), "utf8");

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

test.each(fronts)("$lang front states one proposition", (front) => {
	const body = `<h1>${front.book.claim}</h1>`;
	const document = page(shell, body, front.path, front.lang);
	expect(document).toContain(`<html lang="${front.lang}">`);
	expect(document.match(/<title>/g)).toHaveLength(1);
	expect(document).toContain(`<title>${front.title}</title>`);
	expect(document.match(/<meta name="description"/g)).toHaveLength(1);
	expect(document.match(/<h1>/g)).toHaveLength(1);
	expect(document).toContain(`<h1>${front.claim}</h1>`);
});

test("the proposition occupies the hero title", () => {
	expect(composition.match(/title=\{t\("front\.claim"\)\}/g)).toHaveLength(1);
});

test("the proposition opens in a full typographic course", () => {
	expect(composition).toContain("<Course full>");
	expect(composition).toContain('<Hero look="claim"');
});

test("the first course pairs the proposition with its visual proof", () => {
	const first = composition.slice(0, composition.indexOf("</Course>"));
	expect(first).toContain("<Grid cols={12}>");
	expect(first).toContain("<Cell span={5}>");
	expect(first).toContain("<Cell span={7}>");
	expect(first).toContain("<Turn");
	expect(first).not.toContain("front.voice");
	expect(first).not.toContain("front.voiced");
	expect(turn).not.toContain("<Tabs");
	expect(turn).not.toContain("label={voice}");
	expect(turn).not.toContain("meta={mark}");
});

test("the homepage owns the complete gallery", () => {
	expect(composition).toContain("<Gallery bind:system");
	expect(gallery).toContain("<Search bind:value={query}");
	expect(gallery).toContain("<Pick");
	expect(gallery).toContain("<Bench");
	expect(application).not.toContain('seat === "/gallery"');
	expect(server).not.toContain('path: "/gallery/"');
	expect(server).not.toContain('path: "/zh-CN/gallery/"');
	expect(composition).not.toContain('look="portal"');
});

test("the language proof renders a real component composition", () => {
	expect(turn).toContain('look="show"');
	expect(specimen).toContain('<Board title={said("title")}');
	expect(specimen).toContain("<Grid cols={2}");
});
