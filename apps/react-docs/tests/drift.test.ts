import { readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { expect, test } from "vitest";
import type { Kind } from "../src/docs/notes";
import { notes } from "../src/docs/notes";

const root = dirname(
	createRequire(import.meta.url).resolve("@perish/react-components"),
);

function walk(dir: string): string[] {
	const found: string[] = [];
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) {
			found.push(...walk(path));
		} else if (entry.name.endsWith(".d.ts") && entry.name !== "lib.d.ts") {
			found.push(path);
		}
	}
	return found;
}

function kind(type: string): Kind {
	if (type.endsWith("=> void")) {
		return "call";
	}
	if (type.endsWith("[]")) {
		return "list";
	}
	if (type === "boolean") {
		return "flag";
	}
	return type === "ReactNode" ? "node" : "text";
}

function shipped(): Record<string, Record<string, Kind>> {
	const map: Record<string, Record<string, Kind>> = {};
	for (const path of walk(root)) {
		const text = readFileSync(path, "utf8");
		const body = /type Props = \{([\s\S]*?)\n\};/.exec(text);
		const name = path.slice(path.lastIndexOf("/") + 1).replace(".d.ts", "");
		const seat: Record<string, Kind> = {};
		for (const line of body ? body[1].trim().split("\n") : []) {
			const split = line.trim().replace(/;$/, "").split(":");
			seat[split[0].replace("?", "").trim()] = kind(
				split.slice(1).join(":").trim(),
			);
		}
		map[name] = seat;
	}
	return map;
}

const held = shipped();

test("covered", () => {
	expect(Object.keys(held).sort()).toEqual(Object.keys(notes).sort());
});

test("matched", () => {
	for (const [name, props] of Object.entries(held)) {
		expect({ [name]: Object.keys(notes[name] ?? {}).sort() }).toEqual({
			[name]: Object.keys(props).sort(),
		});
	}
});

test("typed", () => {
	const wrong: string[] = [];
	for (const [name, props] of Object.entries(held)) {
		for (const [prop, want] of Object.entries(props)) {
			const note = notes[name]?.[prop];
			if (note && note.kind !== want) {
				wrong.push(`${name}.${prop}: doc says ${note.kind}, type says ${want}`);
			}
		}
	}
	expect(wrong).toEqual([]);
});

test("spoken", () => {
	const empty: string[] = [];
	for (const [name, entry] of Object.entries(notes)) {
		for (const [prop, note] of Object.entries(entry)) {
			if (!note.en.trim()) {
				empty.push(`${name}.${prop}.en`);
			}
			if (!note.zh.trim()) {
				empty.push(`${name}.${prop}.zh`);
			}
		}
	}
	expect(empty).toEqual([]);
});
