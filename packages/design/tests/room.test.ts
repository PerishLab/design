import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

const root = join(dirname(fileURLToPath(import.meta.url)), "../src");

function lodgers(room: string): { name: string; body: string }[] {
	return readdirSync(join(root, room), { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => ({
			name: entry.name,
			body: readFileSync(
				join(root, room, entry.name, `${entry.name}.svelte`),
				"utf8",
			),
		}));
}

const takers = /<(button|a|input|select|textarea|summary)[\s>]|tabindex=/;

test("every focus generator owns a focusable element", () => {
	const idle = lodgers("focus")
		.filter((one) => !takers.test(one.body))
		.map((one) => one.name);
	expect(idle).toEqual([]);
});

const opens = /\bopen\b\s*[=:?]/;

function shuts(body: string): boolean {
	return body.includes("showModal") || body.includes("Escape");
}

test("every layer that opens closes without a pointer", () => {
	const stuck = lodgers("layer")
		.filter((one) => opens.test(one.body) && !shuts(one.body))
		.map((one) => one.name);
	expect(stuck).toEqual([]);
});
