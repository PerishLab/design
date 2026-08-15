import { createRawSnippet as snippet } from "svelte";
import { render } from "svelte/server";
import { expect, test } from "vitest";
import * as design from "../src/lib.ts";

test("exports one-word components", () => {
	expect(Object.keys(design).sort()).toEqual([
		"Aside",
		"Banner",
		"Board",
		"Button",
		"Card",
		"Cell",
		"Check",
		"Code",
		"Copy",
		"Course",
		"Face",
		"Field",
		"Fold",
		"Footer",
		"Forge",
		"Frame",
		"Grid",
		"Head",
		"Hero",
		"Item",
		"Ledger",
		"Line",
		"Link",
		"List",
		"Menu",
		"Meter",
		"Modal",
		"Nav",
		"Note",
		"Pick",
		"Rail",
		"Search",
		"Sheet",
		"Shell",
		"Sign",
		"Split",
		"Stage",
		"Table",
		"Tabs",
		"Tag",
		"Text",
		"Tip",
		"Toast",
		"Views",
		"path",
	]);
});

test("renders component identity", () => {
	expect(render(design.Button, { props: { label: "press" } }).body).toContain(
		'type="button"',
	);
	expect(
		render(design.Note, { props: { text: "held", mood: "warn" } }).body,
	).toContain("note-warn");
	expect(
		render(design.Hero, {
			props: { title: "design", line: "singleword", mark: "◆" },
		}).body,
	).toContain("◆");
	expect(
		render(design.Rail, {
			props: { stops: [{ mark: "01", name: "declare", text: "shape" }] },
		}).body,
	).toContain("declare");
	expect(
		render(design.Shell, {
			props: {
				tone: "dark",
				children: snippet(() => ({ render: () => "inside" })),
			},
		}).body,
	).toContain('data-tone="dark"');
});
