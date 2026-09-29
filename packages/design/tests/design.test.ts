import { createRawSnippet as snippet } from "svelte";
import { render } from "svelte/server";
import { expect, test } from "vitest";
import * as design from "../src/lib.ts";

test("exports one-word components", () => {
	expect(Object.keys(design).sort()).toEqual([
		"Aside",
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
		"Navigator",
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
	const hero = render(design.Hero, {
		props: {
			title: "design",
			line: "singleword",
			mark: "◆",
			look: "claim",
		},
	}).body;
	expect(hero).toContain("◆");
	expect(hero).toContain('class="hero hero-claim"');
	expect(
		render(design.Course, {
			props: {
				full: true,
				children: snippet(() => ({ render: () => "inside" })),
			},
		}).body,
	).toContain("course-full");
	const stage = render(design.Stage, {
		props: {
			look: "show",
			label: "folio",
			meta: "02 / 11",
			children: snippet(() => ({ render: () => "inside" })),
		},
	}).body;
	expect(stage).toContain("stage-show");
	expect(stage).toContain("folio");
	expect(stage).toContain("02 / 11");
	expect(
		render(design.Grid, {
			props: {
				cols: 2,
				flow: "hold",
				children: snippet(() => ({ render: () => "inside" })),
			},
		}).body,
	).toContain("grid-hold");
	expect(
		render(design.Rail, {
			props: { stops: [{ mark: "01", name: "declare", text: "shape" }] },
		}).body,
	).toContain("declare");
	const tabs = render(design.Tabs, {
		props: {
			tabs: [
				{ value: "one", label: "one" },
				{ value: "two", label: "two" },
			],
			value: "two",
		},
	}).body;
	expect(tabs).toContain('role="tablist"');
	expect(tabs).toContain('aria-selected="true"');
	expect(
		render(design.Shell, {
			props: {
				tone: "dark",
				children: snippet(() => ({ render: () => "inside" })),
			},
		}).body,
	).toContain('data-tone="dark"');
});
