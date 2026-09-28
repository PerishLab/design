import { front as english } from "./i18n/en/front.ts";
import { front as chinese } from "./i18n/zh/front.ts";

const fronts: Record<string, typeof english> = {
	"/": english,
	"/zh-CN/": chinese,
};

export function page(
	shell: string,
	body: string,
	path: string,
	lang: string,
): string {
	const front = fronts[path];
	const document =
		front === undefined
			? shell
			: shell.replace(
					/<title>[^<]*<\/title>/,
					`<title>${front.title}</title>\n\t\t<meta name="description" content="${front.description}" />`,
				);
	return document
		.replace('<html lang="en">', `<html lang="${lang}">`)
		.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}
