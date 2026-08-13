import { render } from "svelte/server";
import { expect, test } from "vitest";
import * as design from "../src/lib.ts";

test("exports one-word components", () => {
	expect(Object.keys(design).sort()).toEqual([
		"Badge",
		"Banner",
		"Board",
		"Button",
		"Card",
		"Code",
		"Copy",
		"Field",
		"Footer",
		"Forge",
		"Frame",
		"Grid",
		"Hero",
		"Ledger",
		"Line",
		"Link",
		"List",
		"Nav",
		"Note",
		"Page",
		"Rail",
		"Search",
		"Sheet",
		"Shell",
		"Split",
		"Tag",
		"Views",
		"path",
	]);
});

test("renders component identity", () => {
	expect(render(design.Button, { props: { label: "press" } }).body).toContain(
		'type="button"',
	);
	expect(
		render(design.Note, { props: { text: "held", tone: "warn" } }).body,
	).toContain("note-warn");
	expect(
		render(design.Hero, {
			props: { title: "design", text: "singleword", mark: "◆" },
		}).body,
	).toContain("◆");
	expect(
		render(design.Rail, {
			props: { stops: [{ mark: "01", name: "declare", text: "shape" }] },
		}).body,
	).toContain("declare");
});
