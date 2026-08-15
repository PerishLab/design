import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

const root = join(dirname(fileURLToPath(import.meta.url)), "../src");

function walk(path: string): string[] {
	const found: string[] = [];
	for (const entry of readdirSync(path, { withFileTypes: true })) {
		const seat = join(path, entry.name);
		if (entry.isDirectory()) found.push(...walk(seat));
		else found.push(seat);
	}
	return found;
}

test("names no atom", () => {
	const said: string[] = [];
	for (const seat of walk(root)) {
		const text = readFileSync(seat, "utf8");
		if (text.includes("var(--")) said.push(seat);
		if (text.includes("@perish/token")) said.push(seat);
	}
	expect(said).toEqual([]);
});
