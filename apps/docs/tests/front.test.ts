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
const specimen = readFileSync(join(root, "src/gallery/Sample.svelte"), "utf8");
const turn = readFileSync(join(root, "src/front/Turn.svelte"), "utf8");

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

test("the first course ends in one concise gallery portal", () => {
	expect(english.start).toBe("Gallery");
	expect(chinese.start).toBe("画廊");
	expect(composition).toContain('<Button look="portal"');
	expect(composition).toContain('label={t("front.start")} sign="next" wide');
	expect(composition.indexOf('<Button look="portal"')).toBeLessThan(
		composition.indexOf("</Course>"),
	);
	expect(composition.indexOf("<Footer text={stamp}>")).toBeLessThan(
		composition.indexOf(
			'<Link look="nav" href="https://github.com/PerishLab/design" label={t("front.source")} />',
		),
	);
});

test("the language proof is an exhibit before its markup", () => {
	expect(composition.indexOf("<Turn")).toBeLessThan(
		composition.indexOf("text={borne}"),
	);
	expect(turn).toContain('look="show"');
	expect(specimen).toContain('<Board title={said("title")}');
	expect(specimen).toContain("<Grid cols={2}");
});
