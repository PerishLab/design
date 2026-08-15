import { expect, test } from "vitest";
import { shown, spell, wired } from "../src/docs/front.ts";

const steps = [
	{ name: "terminal", body: spell, kind: "shell" },
	{ name: "vite.config.ts", body: wired, kind: "module" },
	{ name: "App.svelte", body: shown, kind: "module" },
];

function names(body: string): string[] {
	const tags = [...body.matchAll(/<([A-Z][A-Za-z]*)/g)].map((hit) => hit[1]);
	const calls = [...body.matchAll(/\b([a-z][A-Za-z]*)\(\)/g)].map(
		(hit) => hit[1],
	);
	return [...new Set([...tags, ...calls])];
}

function brought(body: string): string[] {
	const held: string[] = [];
	for (const line of body.split("\n")) {
		const hit = line.match(/^\s*import\s*\{([^}]*)\}/);
		if (hit !== null)
			held.push(...hit[1].split(",").map((word) => word.trim()));
	}
	return held;
}

test("every step brings in what it uses", () => {
	const loose: string[] = [];
	for (const step of steps) {
		if (step.kind !== "module") continue;
		const said = brought(step.body);
		for (const name of names(step.body))
			if (!said.includes(name)) loose.push(`${step.name}: ${name}`);
	}
	expect(loose).toEqual([]);
});

const column = 52;

test("every step fits the column it is shown in", () => {
	const wide = steps
		.flatMap((step) =>
			step.body.split("\n").map((line) => ({ name: step.name, line })),
		)
		.filter((row) => row.line.length > column)
		.map((row) => `${row.name}: ${row.line.length} chars`);
	expect(wide).toEqual([]);
});
