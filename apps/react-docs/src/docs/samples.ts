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

export const seeds: Record<string, Record<string, unknown>> = {
	Badge: { children: "stable" },
	Banner: {
		mark: "◆",
		title: "a banner carries one line",
		line: "and an optional body beneath it",
		children: "",
	},
	Board: { title: "identity", brief: "one bounded concern", children: "rows" },
	Button: {
		children: "press",
		label: "",
		press: () => {},
		tone: "solid",
		wide: false,
		busy: false,
	},
	Card: { title: "laws", children: "eight of them" },
	Code: { children: 'const seal = "clean";\n', name: "seal.ts", copy: true },
	Copy: { text: "negentropy --strict ." },
	Field: {
		label: "name",
		value: "",
		change: () => {},
		kind: "text",
		hint: "perish",
	},
	Footer: { children: "beta" },
	Forge: { repo: "PerishFire/design" },
	Frame: { children: "a frame wraps the whole page" },
	Grid: { children: "cells" },
	Hero: {
		title: "perish design",
		text: "one system, many flavours",
		mark: "◆",
	},
	Ledger: { atoms },
	Line: { name: "shape", meta: "living", children: "clean" },
	Link: { label: "open", href: "/" },
	List: { children: "declare" },
	Nav: { children: "design" },
	Note: { text: "one quiet note", tone: "calm" },
	Page: { title: "workshop", children: "the current plane" },
	Rail: { stops },
	Search: { value: "", change: () => {}, hint: "filter components" },
	Sheet: { children: "a bounded surface" },
	Shell: { children: "a full product shell" },
	Split: { children: "two sides" },
	Tag: { text: "stable", tone: "calm" },
};
