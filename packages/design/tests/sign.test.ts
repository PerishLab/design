import { sets } from "@perish/sign/sets";
import { expect, test } from "vitest";

const roster = Object.keys(sets.base.drawn).sort();

const spurned = [
	"terminal.bounds",
	"terminal.copy",
	"terminal.draws",
	"terminal.keeps",
	"terminal.owns",
	"terminal.places",
	"terminal.shade",
	"terminal.takes",
	"terminal.tongue",
];

test("the authored language answers its own roster", () => {
	expect(roster.length).toBeGreaterThan(0);
	expect(sets.base.spurns ?? []).toEqual([]);
});

test("every set addresses every semantic and invents none", () => {
	const adrift: string[] = [];
	for (const [name, held] of Object.entries(sets)) {
		const said = [...Object.keys(held.drawn), ...(held.spurns ?? [])];
		for (const one of roster)
			if (!said.includes(one)) adrift.push(`${name} says nothing for ${one}`);
		for (const one of said)
			if (!roster.includes(one)) adrift.push(`${name} invents ${one}`);
	}
	expect(adrift).toEqual([]);
});

test("a semantic is drawn or spurned, never both", () => {
	const torn: string[] = [];
	for (const [name, held] of Object.entries(sets))
		for (const one of held.spurns ?? [])
			if (held.drawn[one] !== undefined) torn.push(`${name}.${one}`);
	expect(torn).toEqual([]);
});

test("only a written refusal escapes the roster", () => {
	const shed: string[] = [];
	for (const [name, held] of Object.entries(sets))
		for (const one of held.spurns ?? []) shed.push(`${name}.${one}`);
	expect(shed.sort()).toEqual(spurned);
});

test("no set copies a shape the authored language already drew", () => {
	const aped: string[] = [];
	for (const [name, held] of Object.entries(sets)) {
		if (name === "base") continue;
		for (const [one, strokes] of Object.entries(held.drawn))
			if (strokes.join() === (sets.base.drawn[one] ?? []).join())
				aped.push(`${name}.${one}`);
	}
	expect(aped).toEqual([]);
});

test("a second tone only lights a semantic the set draws", () => {
	const stray: string[] = [];
	for (const [name, held] of Object.entries(sets))
		for (const one of Object.keys(held.lit ?? {}))
			if (held.drawn[one] === undefined) stray.push(`${name}.${one}`);
	expect(stray).toEqual([]);
});

test("every drawn semantic carries at least one stroke", () => {
	const blank: string[] = [];
	for (const [name, held] of Object.entries(sets))
		for (const [one, strokes] of Object.entries(held.drawn))
			if (strokes.length === 0) blank.push(`${name}.${one}`);
	expect(blank).toEqual([]);
});
