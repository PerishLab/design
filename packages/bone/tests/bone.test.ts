import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "vitest";

const root = "src";

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
		if (text.includes("@perishlab/token")) said.push(seat);
	}
	expect(said).toEqual([]);
});
