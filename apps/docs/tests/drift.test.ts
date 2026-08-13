import { existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";
import { catalog, groups } from "../src/docs/catalog.ts";
import { notes } from "../src/docs/notes.ts";

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

test("covers every styled component", () => {
	expect(walk(root).sort()).toEqual(Object.keys(notes).sort());
});

test("speaks every property in both languages", () => {
	const empty: string[] = [];
	for (const [name, entry] of Object.entries(notes)) {
		for (const [prop, note] of Object.entries(entry)) {
			if (!note.en.trim()) empty.push(`${name}.${prop}.en`);
			if (!note.zh.trim()) empty.push(`${name}.${prop}.zh`);
		}
	}
	expect(empty).toEqual([]);
});

test("groups every documented component once", () => {
	const names = groups.flatMap((group) => catalog[group]);
	expect(names.length).toBe(new Set(names).size);
	expect(names.sort()).toEqual(Object.keys(notes).sort());
});
