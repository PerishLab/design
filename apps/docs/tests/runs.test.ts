import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";
import { front as english } from "../src/lib/i18n/en/front.ts";
import { front as chinese } from "../src/lib/i18n/zh/front.ts";

const seat = join(
	dirname(fileURLToPath(import.meta.url)),
	"../src/front/Front.svelte",
);

const books: Record<string, Record<string, unknown>> = {
	en: english,
	zh: chinese,
};

function parts(): string[] {
	return readFileSync(seat, "utf8").split("<Course").slice(1);
}

function runs(): string[][] {
	return parts().map((part) =>
		[...part.matchAll(/"front\.(\w+)"/g)].map((hit) => hit[1]),
	);
}

function spoken(book: Record<string, unknown>, keys: string[]): string {
	return keys
		.filter((key) => key !== "counts")
		.map((key) => JSON.stringify(book[key] ?? ""))
		.join(" ")
		.toLowerCase();
}

function earliest(word: string, heard: string[]): number {
	const stem = word.endsWith("s") ? word.slice(0, -1) : word;
	for (let seat = 0; seat < heard.length; seat += 1)
		if (heard[seat].includes(stem.toLowerCase())) return seat;
	return -1;
}

const held = runs();
const carries = held.findIndex((keys) => keys.includes("counts"));

test("says every noun it counts, before the run that counts it", () => {
	const mute: string[] = [];
	for (const [tongue, book] of Object.entries(books)) {
		const heard = held.map((keys) => spoken(book, keys));
		for (const atom of book.counts as { word: string }[]) {
			const seat = earliest(atom.word, heard);
			if (seat < 0 || seat > carries) mute.push(`${tongue}: ${atom.word}`);
		}
	}
	expect(mute).toEqual([]);
});

function onward(part: string, keys: string[]): boolean {
	if (part.includes("href=")) return true;
	return keys.some((key) =>
		Object.values(books).some((book) =>
			JSON.stringify(book[key] ?? "").includes("href"),
		),
	);
}

test("offers a way on out of every run", () => {
	const shut = parts()
		.map((part, seat) => ({ part, seat }))
		.filter((row) => !onward(row.part, held[row.seat]))
		.map((row) => `run ${row.seat}`);
	expect(shut).toEqual([]);
});

test("stands in the last run when it sums more than one", () => {
	const sources = new Set<number>();
	for (const book of Object.values(books)) {
		const heard = held.map((keys) => spoken(book, keys));
		for (const atom of book.counts as { word: string }[])
			sources.add(earliest(atom.word, heard));
	}
	if (sources.size < 2) return;
	expect(carries).toBe(held.length - 1);
});

const dressed = join(
	dirname(fileURLToPath(import.meta.url)),
	"../../../packages/token/src/themes",
);

function ground(voice: string): string {
	const rooms = ["system", "draft", "tone"].map((room) =>
		join(dressed, room, `${voice === "base" ? "light" : voice}.scss`),
	);
	const found = rooms.find((path) => existsSync(path));
	const hit = readFileSync(found ?? "", "utf8").match(
		/ground:\s*(#[0-9a-f]{6})/i,
	);
	return hit === null ? "#000000" : hit[1];
}

function lab(hex: string): number[] {
	const raw = [1, 3, 5].map(
		(at) => Number.parseInt(hex.slice(at, at + 2), 16) / 255,
	);
	const [red, green, blue] = raw.map((one) =>
		one <= 0.04045 ? one / 12.92 : ((one + 0.055) / 1.055) ** 2.4,
	);
	const bent = [
		(0.4124 * red + 0.3576 * green + 0.1805 * blue) / 0.95047,
		0.2126 * red + 0.7152 * green + 0.0722 * blue,
		(0.0193 * red + 0.1192 * green + 0.9505 * blue) / 1.08883,
	].map((one) => (one > 0.008856 ? one ** (1 / 3) : 7.787 * one + 16 / 116));
	return [
		116 * bent[1] - 16,
		500 * (bent[0] - bent[1]),
		200 * (bent[1] - bent[2]),
	];
}

function paint(said: string): number[] {
	const raw = [...(said.match(/[\d.]+/g) ?? [])].map(Number);
	if (raw.length === 0) return lab("#000000");
	const over = raw.length > 3 ? raw[3] : 1;
	const flat = raw
		.slice(0, 3)
		.map((one) => Math.round(255 * (1 - over) + one * over));
	return lab(
		`#${flat.map((one) => one.toString(16).padStart(2, "0")).join("")}`,
	);
}

function size(said: string): number {
	const hit = said.match(/-?[\d.]+/);
	return hit === null ? 0 : Number(hit[0]);
}

const looked = JSON.parse(
	readFileSync(
		join(dirname(fileURLToPath(import.meta.url)), "look.json"),
		"utf8",
	),
) as Record<string, Record<string, Record<string, string>>>;

function traits(voice: string): Record<string, number[] | number | string> {
	const board = looked[voice][".board"];
	const solid = looked[voice][".button-solid"];
	return {
		ground: lab(ground(voice)),
		ink: paint(board.color),
		accent: paint(solid.backgroundColor),
		radius: size(board.borderRadius),
		rim: size(board.borderTopWidth),
		size: size(board.fontSize),
		face: board.fontFamily,
		shadow: board.boxShadow === "none" ? "flat" : "lifted",
	};
}

const noticed: Record<string, number> = {
	ground: 10,
	ink: 10,
	accent: 20,
	radius: 4,
	rim: 1,
	size: 2,
	face: 1,
	shadow: 1,
};

function gap(here: unknown, there: unknown): number {
	if (Array.isArray(here) && Array.isArray(there))
		return Math.hypot(...here.map((one, at) => one - there[at]));
	if (typeof here === "number" && typeof there === "number")
		return Math.abs(here - there);
	return here === there ? 0 : 1;
}

function moved(one: string, other: string): number {
	const here = traits(one);
	const there = traits(other);
	return Object.entries(noticed).filter(
		([name, edge]) => gap(here[name], there[name]) >= edge,
	).length;
}

function voices(): string[] {
	const hit = readFileSync(seat, "utf8").match(/voices = \[([^\]]*)\]/);
	return hit === null
		? []
		: [...hit[1].matchAll(/"(\w+)"/g)].map((one) => one[1]);
}

function running(shown: string[]): string[][] {
	return shown.map((one, at) => [one, shown[(at + 1) % shown.length]]);
}

const least = 4;

test("changes something the eye can see at every step it takes", () => {
	const still = running(voices())
		.map((two) => ({ two, seen: moved(two[0], two[1]) }))
		.filter((row) => row.seen < least)
		.map((row) => `${row.two.join("/")} ${row.seen}`);
	expect(still).toEqual([]);
});
