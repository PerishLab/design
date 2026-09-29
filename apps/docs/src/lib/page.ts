import { front as english } from "./i18n/en/front.ts";
import { pages as englishPages } from "./i18n/en/pages.ts";
import { front as chinese } from "./i18n/zh/front.ts";
import { pages as chinesePages } from "./i18n/zh/pages.ts";

type Meta = { title: string; description: string };
const site = "https://design.perish.uk";

const pages: Record<string, Meta> = {
	"/": english,
	"/zh-CN/": chinese,
	"/why/": {
		title: "Why — Perish Design",
		description: englishPages.why.description,
	},
	"/what/": {
		title: "What — Perish Design",
		description: englishPages.what.description,
	},
	"/how/": {
		title: "How — Perish Design",
		description: englishPages.how.description,
	},
	"/blog/": {
		title: "Blog — Perish Design",
		description: englishPages.blog.description,
	},
	"/zh-CN/why/": {
		title: "为什么 — Perish Design",
		description: chinesePages.why.description,
	},
	"/zh-CN/what/": {
		title: "是什么 — Perish Design",
		description: chinesePages.what.description,
	},
	"/zh-CN/how/": {
		title: "如何使用 — Perish Design",
		description: chinesePages.how.description,
	},
	"/zh-CN/blog/": {
		title: "博客 — Perish Design",
		description: chinesePages.blog.description,
	},
};

export function page(
	shell: string,
	body: string,
	path: string,
	lang: string,
): string {
	const front = pages[path];
	const url = `${site}${path}`;
	const document =
		front === undefined
			? shell
			: shell
					.replace(
						/<title>[^<]*<\/title>/,
						`<title>${front.title}</title>\n\t\t<meta name="description" content="${front.description}" />`,
					)
					.replace(
						`<link rel="canonical" href="${site}/" />`,
						`<link rel="canonical" href="${url}" />`,
					)
					.replace(
						'<meta property="og:title" content="Perish Design — Svelte design system" />',
						`<meta property="og:title" content="${front.title}" />`,
					)
					.replace(
						/<meta property="og:description" content="[^"]*" \/>/,
						`<meta property="og:description" content="${front.description}" />`,
					)
					.replace(
						`<meta property="og:url" content="${site}/" />`,
						`<meta property="og:url" content="${url}" />`,
					)
					.replace(
						'<meta name="twitter:title" content="Perish Design — Svelte design system" />',
						`<meta name="twitter:title" content="${front.title}" />`,
					)
					.replace(
						/<meta name="twitter:description" content="[^"]*" \/>/,
						`<meta name="twitter:description" content="${front.description}" />`,
					);
	return document
		.replace('<html lang="en">', `<html lang="${lang}">`)
		.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}
