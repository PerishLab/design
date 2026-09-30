import { expect, test } from "vitest";
import { shipped } from "./shipped.ts";

const pieces = await shipped();

function lodgers(room: string) {
	return pieces.filter(
		(one) => one.pack === "@perishlab/design" && one.room === room,
	);
}

const takers = /<(button|a|input|select|textarea|summary)[\s>/]|tabindex/;

test("every focus generator owns a focusable element", () => {
	const idle = lodgers("focus")
		.filter((one) => !takers.test(one.code))
		.map((one) => one.name);
	expect(lodgers("focus").length).toBeGreaterThan(0);
	expect(idle).toEqual([]);
});

function opens(code: string): boolean {
	return code.includes('prop($$props, "open"') || code.includes("$$props.open");
}

function shuts(code: string): boolean {
	return code.includes("showModal") || code.includes('"Escape"');
}

test("every layer that opens closes without a pointer", () => {
	const stuck = lodgers("layer")
		.filter((one) => opens(one.code) && !shuts(one.code))
		.map((one) => one.name);
	expect(lodgers("layer").filter((one) => opens(one.code))).not.toEqual([]);
	expect(stuck).toEqual([]);
});
