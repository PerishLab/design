import { expect, test } from "vitest";
import { shipped } from "./shipped.ts";

const sheet =
	(await shipped()).find(
		(one) => one.pack === "@perishlab/design" && one.name === "Shell",
	)?.sheet ?? "";

test("a shell inside a shell lets the outer ground show through", () => {
	expect(sheet).toMatch(
		/\.shell \.shell \{[^}]*background-color: transparent;/s,
	);
	expect(sheet).toMatch(/\.shell \.shell \{[^}]*background-image: none;/s);
});

test("a fading shell transitions its opacity", () => {
	expect(sheet).toMatch(/\.shell\[data-fade\][^{]*\{[^}]*transition: opacity/s);
});
