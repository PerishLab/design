import * as design from "@perishlab/design";
import { createRawSnippet as snippet } from "svelte";
import { render } from "svelte/server";
import { expect, test } from "vitest";

test("exports one-word components", () => {
	expect(Object.keys(design).sort()).toEqual([
		"Aside",
		"Board",
		"Button",
		"Card",
		"Carousel",
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
	const portal = render(design.Button, {
		props: { href: "/gallery/", label: "Gallery", look: "portal", wide: true },
	}).body;
	expect(portal).toContain('href="/gallery/"');
	expect(portal).toContain("button-portal");
	expect(portal).toContain("button-wide");
	expect(
		render(design.Note, { props: { text: "held", mood: "warn" } }).body,
	).toContain("note-warn");
	const navigator = render(design.Navigator, {
		props: { mark: "design", title: "design" },
	}).body;
	expect(navigator).toContain("--crest-ink: #2f679c");
	expect(navigator).toContain("--crest-dark: #8fc7f2");
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
				fade: 180,
				shown: false,
				children: snippet(() => ({ render: () => "inside" })),
			},
		}).body,
	).toContain('data-tone="dark"');
	expect(
		render(design.Shell, {
			props: {
				fade: 180,
				shown: false,
				children: snippet(() => ({ render: () => "inside" })),
			},
		}).body,
	).toMatch(/data-fade="" data-hidden=""[^>]*--faded: 180ms/);
});
