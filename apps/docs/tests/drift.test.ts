import { catalog, groups } from "design-docs/catalog";
import * as english from "design-docs/i18n/en";
import * as chinese from "design-docs/i18n/zh";
import { kinds } from "design-docs/kinds";
import { expect, test } from "vitest";
import { shipped } from "./shipped.ts";

const styled = (await shipped()).filter((one) => one.styled);

function names(room?: string): string[] {
	return styled
		.filter((one) => room === undefined || one.room === room)
		.map((one) => one.name)
		.sort();
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
	expect(names()).toEqual(Object.keys(kinds).sort());
});

test("files every component in the room its source stands in", () => {
	for (const group of groups)
		expect(names(group)).toEqual([...catalog[group]].sort());
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
