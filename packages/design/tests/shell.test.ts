import * as sass from "sass";
import { expect, test } from "vitest";

const sheet = sass.compile("src/document/Shell/Shell.scss", {
	importers: [new sass.NodePackageImporter()],
}).css;

test("a shell inside a shell lets the outer ground show through", () => {
	expect(sheet).toMatch(
		/\.shell \.shell \{[^}]*background-color: transparent;/s,
	);
	expect(sheet).toMatch(/\.shell \.shell \{[^}]*background-image: none;/s);
});

test("a fading shell transitions its opacity", () => {
	expect(sheet).toMatch(/\.shell\[data-fade\][^{]*\{[^}]*transition: opacity/s);
});
