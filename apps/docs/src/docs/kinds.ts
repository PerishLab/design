export type Kind = "text" | "flag" | "node" | "call" | "list";

export const kinds: Record<string, Record<string, Kind>> = {
	Aside: {
		side: "node",
		children: "node",
	},
	Navigator: {
		mark: "text",
		owner: "text",
		title: "text",
		line: "text",
		home: "text",
		look: "text",
		stick: "flag",
		children: "node",
	},
	Board: {
		title: "text",
		look: "text",
		line: "text",
		seat: "text",
		children: "node",
	},
	Button: {
		children: "node",
		sign: "text",
		label: "text",
		press: "call",
		look: "text",
		wide: "flag",
		busy: "flag",
		halt: "flag",
		submit: "flag",
	},
	Card: {
		title: "text",
		children: "node",
	},
	Cell: {
		span: "text",
		start: "text",
		look: "text",
		children: "node",
	},
	Check: {
		label: "text",
		held: "flag",
		change: "call",
		look: "text",
	},
	Code: {
		text: "text",
		name: "text",
		copy: "flag",
	},
	Copy: {
		text: "text",
	},
	Course: {
		look: "text",
		full: "flag",
		children: "node",
	},
	Face: {
		name: "text",
		src: "text",
	},
	Field: {
		label: "text",
		value: "text",
		change: "call",
		kind: "text",
		hint: "text",
	},
	Fold: {
		label: "text",
		open: "flag",
		children: "node",
	},
	Footer: {
		text: "text",
		children: "node",
	},
	Forge: {
		host: "text",
		repo: "text",
	},
	Frame: {
		children: "node",
	},
	Grid: {
		look: "text",
		cols: "text",
		flow: "text",
		children: "node",
	},
	Head: {
		text: "text",
		seat: "text",
	},
	Hero: {
		title: "text",
		line: "text",
		mark: "text",
		look: "text",
	},
	Item: {
		children: "node",
	},
	Ledger: {
		atoms: "list",
	},
	Line: {
		name: "text",
		meta: "text",
		children: "node",
	},
	Link: {
		label: "text",
		href: "text",
		look: "text",
		here: "flag",
	},
	List: {
		children: "node",
	},
	Menu: {
		label: "text",
		items: "list",
		value: "text",
		sign: "text",
		look: "text",
		open: "flag",
		choose: "call",
	},
	Meter: {
		label: "text",
		value: "text",
	},
	Modal: {
		title: "text",
		open: "flag",
		children: "node",
	},
	Nav: {
		look: "text",
		links: "list",
	},
	Note: {
		text: "text",
		mood: "text",
	},
	Sign: {
		name: "text",
		look: "text",
		label: "text",
	},
	Pick: {
		label: "text",
		value: "text",
		choices: "list",
		change: "call",
	},
	Rail: {
		stops: "list",
	},
	Search: {
		value: "text",
		change: "call",
		hint: "text",
	},
	Sheet: {
		children: "node",
	},
	Shell: {
		children: "node",
		tone: "text",
		system: "text",
		slide: "text",
		fade: "text",
		shown: "flag",
		settled: "call",
	},
	Split: {
		children: "node",
	},
	Stage: {
		look: "text",
		label: "text",
		meta: "text",
		children: "node",
	},
	Table: {
		heads: "list",
		rows: "list",
	},
	Tabs: {
		tabs: "list",
		value: "text",
		change: "call",
	},
	Tag: {
		text: "text",
		look: "text",
		mood: "text",
	},
	Text: {
		children: "node",
	},
	Tip: {
		text: "text",
		look: "text",
		children: "node",
	},
	Toast: {
		notes: "list",
		mood: "text",
	},
};
