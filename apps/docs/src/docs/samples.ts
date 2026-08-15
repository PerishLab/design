export const atoms = [
	{ word: "kernel", count: 12 },
	{ word: "grammar", count: 8 },
	{ word: "seal", count: 3 },
];

export const stops = [
	{ mark: "01", name: "declare", text: "the library names the design" },
	{ mark: "02", name: "materialise", text: "the plugin wires it up" },
	{ mark: "03", name: "consume", text: "an app eats what we shipped" },
];

export const choices = [
	{ value: "design", label: "design" },
	{ value: "ectropy", label: "ectropy" },
];

export const picks = [
	{ value: "one", label: "preview" },
	{ value: "two", label: "props" },
];

export const heads = ["plane", "state"];

export const grid = [
	["design", "published"],
	["ectropy", "clean"],
];

export const seeds: Record<string, Record<string, unknown>> = {
	Aside: { side: "beside", children: "the main region" },
	Banner: {
		mark: "◆",
		title: "a banner carries one line",
		line: "and an optional body beneath it",
		children: "",
	},
	Board: {
		title: "identity",
		line: "one bounded concern",
		seat: "identity",
		children: "rows",
	},
	Button: {
		children: "press",
		label: "",
		press: () => {},
		look: "solid",
		wide: false,
		busy: false,
		halt: false,
		submit: false,
	},
	Card: { title: "laws", children: "eight of them" },
	Code: { text: "let seal = true;\n", name: "seal.ts", copy: true },
	Cell: { span: 2, children: "a cell that spans two" },
	Check: { label: "guarded", held: true, change: () => {}, look: "box" },
	Copy: { text: "ectropy ." },
	Course: { look: "raise", children: "a run across the page" },
	Voice: {
		title: "one structure",
		children: "The same generators, dressed by one language.",
		label: "press",
	},
	Field: {
		label: "name",
		value: "",
		change: () => {},
		kind: "text",
		hint: "perish",
	},
	Footer: { text: "a workshop colophon", children: "beta" },
	Forge: { host: "https://git.perish.top", repo: "PerishFire/design" },
	Frame: { children: "a frame wraps the whole page" },
	Grid: { cols: 4, look: "even", children: "cells" },
	Hero: {
		title: "perish design",
		line: "one system, many flavours",
		mark: "◆",
	},
	Head: { text: "Laws", seat: "laws" },
	Item: { children: "declare" },
	Ledger: { atoms },
	Line: { name: "shape", meta: "living", children: "clean" },
	Link: { label: "open", href: "/" },
	List: { children: "declare" },
	Nav: {
		children: "design",
		look: "bar",
		links: [{ label: "design", href: "#nav" }],
	},
	Face: { name: "Ada Lovelace" },
	Fold: {
		label: "why one word",
		open: false,
		children: "because two words is a composition",
	},
	Menu: {
		label: "actions",
		items: [
			{ value: "cut", label: "cut a release" },
			{ value: "prove", label: "prove the guard" },
		],
		open: false,
		choose: () => {},
	},
	Meter: { label: "guard", value: 0.62 },
	Modal: {
		title: "cut a release",
		open: false,
		children: "the transaction is exact",
	},
	Sign: { name: "next", label: "next" },
	Note: { text: "one quiet note", mood: "calm" },
	Pick: {
		label: "plane",
		value: "design",
		choices: [
			{ value: "design", label: "design" },
			{ value: "ectropy", label: "ectropy" },
		],
		change: () => {},
	},
	Rail: { stops },
	Table: {
		heads: ["plane", "state"],
		rows: [
			["design", "published"],
			["ectropy", "clean"],
		],
	},
	Tabs: {
		tabs: [
			{ value: "one", label: "preview" },
			{ value: "two", label: "props" },
		],
		value: "one",
		change: () => {},
	},
	Tip: { text: "one word, one meaning", children: "hover me" },
	Search: { value: "", change: () => {}, hint: "filter components" },
	Sheet: { children: "a bounded surface" },
	Shell: { children: "a full product shell" },
	Split: { children: "two sides" },
	Stage: { children: "one thing, framed" },
	Toast: { notes: ["the guard is green"], mood: "calm" },
	Tag: { text: "stable", look: "solid", mood: "calm" },
	Text: { children: "one paragraph of prose, measured to the reading width" },
};
