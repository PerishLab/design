import Front from "design-docs/front";
import { render } from "svelte/server";

type Row = Record<string, string>;
type Look = Record<string, Record<string, Row>>;

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

function traits(rows: Record<string, Row>): Record<string, unknown> {
	const board = rows[".board"];
	return {
		ground: paint(rows[".shell"].backgroundColor),
		ink: paint(board.color),
		accent: paint(rows[".button-solid"].backgroundColor),
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

export function voices(): string[] {
	const body = render(Front, { props: { tone: "system" } }).body;
	return [
		...body.matchAll(
			/<button class=\x22carousel-dot\x22[^>]*?aria-label=\x22([^\x22]*)\x22/g,
		),
	].map((hit) => hit[1]);
}

const least = 4;

export function still(looked: Look, shown: string[]): string[] {
	return shown
		.map((one, at) => [one, shown[(at + 1) % shown.length]])
		.map((two) => {
			const here = traits(looked[two[0]]);
			const there = traits(looked[two[1]]);
			const seen = Object.entries(noticed).filter(
				([name, edge]) => gap(here[name], there[name]) >= edge,
			).length;
			return { two, seen };
		})
		.filter((row) => row.seen < least)
		.map((row) => `${row.two.join("/")} ${row.seen}`);
}
