import { existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";
import { catalog, groups } from "../src/docs/catalog.ts";
import { kinds } from "../src/docs/kinds.ts";
import * as english from "../src/lib/i18n/en/index.ts";
import * as chinese from "../src/lib/i18n/zh/index.ts";

const root = join(
	dirname(fileURLToPath(import.meta.url)),
	"../../../packages/design/src",
);

function walk(path: string): string[] {
	const found: string[] = [];
	for (const entry of readdirSync(path, { withFileTypes: true })) {
		const seat = join(path, entry.name);
		if (entry.isDirectory()) found.push(...walk(seat));
		else if (
			entry.name.endsWith(".svelte") &&
			existsSync(seat.replace(/\.svelte$/, ".scss"))
		)
			found.push(entry.name.slice(0, -7));
	}
	return found;
}

function paths(held: unknown, stem: string): string[] {
	if (typeof held === "string") return [stem];
	if (Array.isArray(held))
		return held.flatMap((one, seat) => paths(one, `${stem}.${seat}`));
	if (held !== null && typeof held === "object")
		return Object.entries(held).flatMap(([key, one]) =>
			paths(one, stem === "" ? key : `${stem}.${key}`),
		);
	return [];
}

test("covers every styled component", () => {
	expect(walk(root).sort()).toEqual(Object.keys(kinds).sort());
});

test("files every component in the room its source stands in", () => {
	for (const group of groups)
		expect(walk(join(root, group)).sort()).toEqual([...catalog[group]].sort());
});

test("says the same keys in every tongue", () => {
	expect(paths(chinese, "").sort()).toEqual(paths(english, "").sort());
});

test("speaks every property it documents", () => {
	const dumb: string[] = [];
	for (const [name, entry] of Object.entries(kinds))
		for (const prop of Object.keys(entry)) {
			const said = english.notes[name as keyof typeof english.notes] as Record<
				string,
				string
			>;
			if (said?.[prop] === undefined) dumb.push(`${name}.${prop}`);
		}
	expect(dumb).toEqual([]);
});

test("groups every documented component once", () => {
	const names = groups.flatMap((group) => catalog[group]);
	expect(names.length).toBe(new Set(names).size);
	expect(names.sort()).toEqual(Object.keys(kinds).sort());
});
