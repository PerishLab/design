import App from "design-docs/app";
import { front as english } from "design-docs/i18n/en";
import { front as chinese } from "design-docs/i18n/zh";
import { render } from "svelte/server";
import { expect, test } from "vitest";

type Book = { counts: { word: string }[] };

const tongues: { name: string; path: string; book: Book }[] = [
	{ name: "en", path: "/what/", book: english },
	{ name: "zh", path: "/zh-CN/what/", book: chinese },
];

function close(html: string, from: number): number {
	const tag = /<(\/?)div\b[^>]*>/g;
	tag.lastIndex = from;
	let depth = 0;
	for (let hit = tag.exec(html); hit !== null; hit = tag.exec(html)) {
		depth += hit[1] === "/" ? -1 : 1;
		if (depth === 0) return tag.lastIndex;
	}
	return html.length;
}

function runs(path: string): string[] {
	const html = render(App, { props: { path } }).body;
	const found: string[] = [];
	const open = /<div class="course[ "]/g;
	for (let hit = open.exec(html); hit !== null; hit = open.exec(html)) {
		const end = close(html, hit.index);
		found.push(html.slice(hit.index, end));
		open.lastIndex = end;
	}
	return found;
}

const ledger = /<ul class="ledger">[\s\S]*?<\/ul>/;

function spoken(run: string): string {
	return run
		.replace(ledger, "")
		.replace(/<[^>]*>/g, " ")
		.toLowerCase();
}

function earliest(word: string, heard: string[]): number {
	const stem = word.endsWith("s") ? word.slice(0, -1) : word;
	return heard.findIndex((run) => run.includes(stem.toLowerCase()));
}

const read = tongues.map((tongue) => {
	const held = runs(tongue.path);
	return {
		...tongue,
		held,
		heard: held.map(spoken),
		carries: held.findIndex((run) => ledger.test(run)),
	};
});

test("renders the page as runs with one ledger", () => {
	for (const one of read) {
		expect(one.held.length).toBeGreaterThan(1);
		expect(one.carries).toBeGreaterThanOrEqual(0);
	}
});

test("says every noun it counts, before the run that counts it", () => {
	const mute: string[] = [];
	for (const one of read)
		for (const atom of one.book.counts) {
			const seat = earliest(atom.word, one.heard);
			if (seat < 0 || seat > one.carries)
				mute.push(`${one.name}: ${atom.word}`);
		}
	expect(mute).toEqual([]);
});

test("offers a way on out of every run", () => {
	const shut = read.flatMap((one) =>
		one.held
			.map((run, seat) => ({ run, seat }))
			.filter(
				({ run }) => !run.includes('href="') && !run.includes('class="copy'),
			)
			.map(({ seat }) => `${one.name} run ${seat}`),
	);
	expect(shut).toEqual([]);
});

test("stands in the last run when it sums more than one", () => {
	for (const one of read) {
		const sources = new Set(
			one.book.counts.map((atom) => earliest(atom.word, one.heard)),
		);
		if (sources.size < 2) continue;
		expect(one.carries).toBe(one.held.length - 1);
	}
});
