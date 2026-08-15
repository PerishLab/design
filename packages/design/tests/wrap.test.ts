import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

const root = join(dirname(fileURLToPath(import.meta.url)), "../src");

function walk(path: string): string[] {
	const found: string[] = [];
	for (const entry of readdirSync(path, { withFileTypes: true })) {
		const seat = join(path, entry.name);
		if (entry.isDirectory()) found.push(...walk(seat));
		else if (entry.name.endsWith(".svelte")) found.push(seat);
	}
	return found;
}

function flows(body: string): boolean {
	return /<(p|h1|h2|h3|h4|h5|h6)[ >]/.test(body);
}

test("every generator that sets running text states how it wraps", () => {
	const loose: string[] = [];
	for (const seat of walk(root)) {
		if (!flows(readFileSync(seat, "utf8"))) continue;
		const dress = seat.replace(/\.svelte$/, ".scss");
		const said = existsSync(dress) ? readFileSync(dress, "utf8") : "";
		if (!said.includes("text-wrap"))
			loose.push(seat.slice(root.length + 1).replace(/\.svelte$/, ""));
	}
	expect(loose).toEqual([]);
});

test("a wrap discipline is balance or pretty and nothing else", () => {
	const odd: string[] = [];
	for (const seat of walk(root)) {
		const dress = seat.replace(/\.svelte$/, ".scss");
		if (!existsSync(dress)) continue;
		for (const hit of readFileSync(dress, "utf8").matchAll(
			/text-wrap:\s*([\w-]+)/g,
		))
			if (hit[1] !== "balance" && hit[1] !== "pretty")
				odd.push(`${seat.slice(root.length + 1)} ${hit[1]}`);
	}
	expect(odd).toEqual([]);
});
