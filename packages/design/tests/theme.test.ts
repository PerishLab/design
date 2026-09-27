import { pathToFileURL } from "node:url";
import * as sass from "sass";
import { expect, test } from "vitest";

const sheet = sass.compileString('@use "pkg:@perishlab/token/base.scss";', {
	importers: [new sass.NodePackageImporter()],
	url: pathToFileURL(`${process.cwd()}/theme.scss`),
}).css;

const dressed = [
	"ant",
	"brutal",
	"carbon",
	"console",
	"cupertino",
	"folio",
	"glass",
	"material",
	"paper",
	"relief",
	"signal",
	"swiss",
	"terminal",
];
const sheer = [
	"cupertino.ondeck",
	"glass.bright",
	"glass.ondeck",
	"glass.warn",
	"signal.ondeck",
];
const toned = ["light", "dark"];
const veiled = ["glass.rim", "glass.seam"];

function block(axis: string, name: string): Record<string, string> {
	const hook = `\\[${axis}="?${name}"?\\]\\s*\\{([^}]*)\\}`;
	const found = new RegExp(hook).exec(sheet);
	if (found === null) throw new Error(`no rule carries ${axis} ${name}`);
	const held: Record<string, string> = {};
	for (const line of found[1].split(";")) {
		const at = line.indexOf(":");
		const name = line.slice(0, at).trim();
		if (name.startsWith("--")) held[name.slice(2)] = line.slice(at + 1).trim();
	}
	return held;
}

function seed(): Record<string, string> {
	const found = /:root\s*\{([^}]*)\}/.exec(sheet);
	if (found === null) throw new Error("no rule carries the seed");
	const held: Record<string, string> = {};
	for (const line of found[1].split(";")) {
		const at = line.indexOf(":");
		const name = line.slice(0, at).trim();
		if (name.startsWith("--")) held[name.slice(2)] = line.slice(at + 1).trim();
	}
	return held;
}

function rhythm(held: Record<string, string>): string {
	return [1, 2, 3, 4, 5, 6].map((step) => held[`space-${step}`]).join(" ");
}

test("every system authors its own spatial rhythm", () => {
	const heard = new Map<string, string[]>();
	heard.set(rhythm(seed()), ["base"]);
	for (const name of dressed) {
		const run = rhythm(block("data-system", name));
		heard.set(run, [...(heard.get(run) ?? []), name]);
	}
	const copied = [...heard.entries()]
		.filter(([, names]) => names.length > 1)
		.map(([run, names]) => `${names.join(" ")} all state ${run}`);
	expect(copied).toEqual([]);
});

function channel(raw: number): number {
	const held = raw / 255;
	return held <= 0.04045 ? held / 12.92 : ((held + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
	const bare = hex.replace("#", "");
	const full =
		bare.length === 3
			? bare
					.split("")
					.map((one) => one + one)
					.join("")
			: bare;
	const parts = [0, 2, 4].map((at) =>
		channel(Number.parseInt(full.slice(at, at + 2), 16)),
	);
	return 0.2126 * parts[0] + 0.7152 * parts[1] + 0.0722 * parts[2];
}

function contrast(one: string, two: string): number | undefined {
	if (!one?.startsWith("#") || !two?.startsWith("#")) return undefined;
	const first = luminance(one);
	const other = luminance(two);
	return (Math.max(first, other) + 0.05) / (Math.min(first, other) + 0.05);
}

function pairs(
	held: Record<string, string>,
): Record<string, number | undefined> {
	return {
		onaccent: contrast(held.onaccent, held.accent),
		ink: contrast(held.ink, held.ground),
		bright: contrast(held.bright, held.panel),
		warn: contrast(held.warn, held.flush),
		muted: contrast(held.muted, held.ground),
		ondeck: contrast(held.ondeck, held.deck),
	};
}

function bounds(
	held: Record<string, string>,
): Record<string, number | undefined> {
	return {
		seam: contrast(held.edge, held.panel),
		rim: contrast(held.edge, held.ground),
	};
}

test("every boundary is visible against what it bounds", () => {
	const faint: string[] = [];
	const vague: string[] = [];
	for (const name of [...dressed, ...toned]) {
		const axis = toned.includes(name) ? "data-tone" : "data-system";
		const held = bounds(block(axis, name));
		for (const [role, ratio] of Object.entries(held)) {
			if (ratio === undefined) vague.push(`${name}.${role}`);
			else if (ratio < 3) faint.push(`${name}.${role} ${ratio.toFixed(2)}`);
		}
	}
	expect(faint).toEqual([]);
	expect(vague.sort()).toEqual(veiled);
});

test("every system states a legible foreground for every fill", () => {
	const thin: string[] = [];
	for (const name of dressed) {
		const held = pairs(block("data-system", name));
		for (const [role, ratio] of Object.entries(held)) {
			if (ratio !== undefined && ratio < 4.5) {
				thin.push(`${name}.${role} ${ratio.toFixed(2)}`);
			}
		}
	}
	expect(thin).toEqual([]);
});

test("only a declared sheer surface escapes the measurement", () => {
	const vague: string[] = [];
	for (const name of dressed) {
		const held = pairs(block("data-system", name));
		for (const [role, ratio] of Object.entries(held)) {
			if (ratio === undefined) vague.push(`${name}.${role}`);
		}
	}
	expect(vague.sort()).toEqual(sheer);
});

test("every tone states a legible foreground for every fill", () => {
	const thin: string[] = [];
	for (const name of toned) {
		const held = pairs(block("data-tone", name));
		for (const [role, ratio] of Object.entries(held)) {
			if (ratio !== undefined && ratio < 4.5) {
				thin.push(`${name}.${role} ${ratio.toFixed(2)}`);
			}
		}
	}
	expect(thin).toEqual([]);
});
