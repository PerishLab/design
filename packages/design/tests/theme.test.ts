import { pathToFileURL } from "node:url";
import * as sass from "sass";
import { expect, test } from "vitest";

const sheet = sass.compileString('@use "pkg:@perish/token/base.scss";', {
	importers: [new sass.NodePackageImporter()],
	url: pathToFileURL(`${process.cwd()}/theme.scss`),
}).css;

const dressed = [
	"ant",
	"brutal",
	"carbon",
	"cupertino",
	"folio",
	"glass",
	"material",
	"relief",
	"swiss",
	"terminal",
];
const sheer = ["glass.bright", "glass.warn"];
const toned = ["light", "dark"];

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
	};
}

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
