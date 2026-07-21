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
	Button: { children: "press" },
	Card: { title: "laws", children: "eight of them" },
	Code: { children: 'const seal = "clean";\n', name: "seal.ts", copy: true },
	Copy: { text: "negentropy --strict ." },
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
	List: { children: "declare" },
	Nav: { children: "design" },
	Rail: { stops },
	Search: { value: "", change: () => {}, hint: "filter components" },
};
