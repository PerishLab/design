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

export const schema = {
	type: "object",
	required: ["name"],
	properties: {
		name: { type: "string", description: "Surface name" },
		mode: { type: "string", enum: ["light", "dark"], default: "light" },
	},
};

export const codes = ["ABCD-1234", "EFGH-5678"];

export const seeds: Record<string, Record<string, unknown>> = {
	Aside: { side: "beside", children: "the main region" },
	Navigator: {
		mark: "design",
		title: "perish workshop",
		line: "and the ways out of it",
		children: "",
	},
	Preference: {
		label: "system",
		name: "system",
		value: "google-workspace",
		source: "shared",
		declaration: "missing",
		origin: "inherited from shared",
		effect: "the effective value is google-workspace",
		choices: [
			{ value: "google-accounts", label: "Accounts" },
			{ value: "google-workspace", label: "Workspace" },
		],
		editable: true,
		busy: false,
		error: "",
		inherit: "restore shared value",
		look: "list",
		change: () => {},
		restore: () => {},
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
	Carousel: {
		items: picks,
		value: "one",
		label: "previews",
		pause: "pause rotation",
		play: "resume rotation",
		children: "one bounded preview",
	},
	Card: { title: "laws", children: "eight of them" },
	Code: { text: "let seal = true;\n", name: "seal.ts", copy: true },
	Cell: { span: 2, look: "start", children: "a cell that spans two" },
	Check: { label: "guarded", held: true, change: () => {}, look: "box" },
	Copy: { text: "ectropy ." },
	Course: { look: "raise", children: "a run across the page" },
	Drawer: {
		title: "inspect client",
		line: "slide-over detail",
		open: false,
		children: "bounded detail fields",
	},
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
	Forge: { host: "https://github.com", repo: "PerishLab/design" },
	Frame: { children: "a frame wraps the whole page" },
	Grid: { cols: 4, look: "even", flow: "fold", children: "cells" },
	Hero: {
		title: "perish design",
		line: "one system, many flavours",
		mark: "perish.code",
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
	Schema: { title: "contract", schema, mode: "tree" },
	Section: {
		title: "identity",
		line: "grouped form controls",
		children: "fields",
	},
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
	Shell: { fade: 180, shown: true, children: "a full product shell" },
	Split: { children: "two sides" },
	Stage: { look: "view", label: "", meta: "", children: "one thing, framed" },
	Toast: { notes: ["the guard is green"], mood: "calm" },
	Tag: { text: "stable", look: "solid", mood: "calm" },
	Text: { children: "one paragraph of prose, measured to the reading width" },
	Vault: {
		title: "recovery codes",
		line: "save these codes once",
		codes,
		check: "I stored these safely",
	},
};
