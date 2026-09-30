import { expect, test } from "vitest";
import { shipped } from "./shipped.ts";

const pieces = (await shipped()).filter(
	(one) => one.pack === "@perishlab/design",
);

function flows(code: string): boolean {
	return /<(p|h1|h2|h3|h4|h5|h6)[\s>/]/.test(code);
}

test("every generator that sets running text states how it wraps", () => {
	const loose = pieces
		.filter((one) => flows(one.code) && !one.sheet.includes("text-wrap"))
		.map((one) => `${one.room}/${one.name}`);
	expect(pieces.filter((one) => flows(one.code)).length).toBeGreaterThan(0);
	expect(loose).toEqual([]);
});

test("a wrap discipline is balance or pretty and nothing else", () => {
	const odd: string[] = [];
	for (const one of pieces)
		for (const hit of one.sheet.matchAll(/text-wrap:\s*([\w-]+)/g))
			if (hit[1] !== "balance" && hit[1] !== "pretty")
				odd.push(`${one.room}/${one.name} ${hit[1]}`);
	expect(odd).toEqual([]);
});
