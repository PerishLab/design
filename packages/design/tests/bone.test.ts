import { expect, test } from "vitest";
import { shipped } from "./shipped.ts";

const bones = (await shipped()).filter((one) => one.pack === "@perishlab/bone");

test("the bone ships a sheet for every seam it offers", () => {
	expect(bones.map((one) => one.name).sort()).toEqual(["Bay", "Skin"]);
	for (const one of bones) expect(one.sheet).toContain("@layer bone");
});

test("the bone names no atom", () => {
	const said = bones
		.filter((one) => `${one.code}\n${one.sheet}`.includes("var(--"))
		.map((one) => one.name);
	expect(said).toEqual([]);
});
