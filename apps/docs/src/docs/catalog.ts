export type Group =
	| "mark"
	| "arrange"
	| "enclose"
	| "focus"
	| "layer"
	| "document";

export const groups: Group[] = [
	"mark",
	"arrange",
	"enclose",
	"focus",
	"layer",
	"document",
];

export const catalog: Record<Group, string[]> = {
	mark: [
		"Code",
		"Face",
		"Head",
		"Hero",
		"Item",
		"Meter",
		"Note",
		"Sign",
		"Tag",
		"Text",
	],
	arrange: [
		"Aside",
		"Cell",
		"Grid",
		"Ledger",
		"Line",
		"List",
		"Nav",
		"Rail",
		"Split",
		"Table",
	],
	enclose: ["Board", "Card", "Course", "Footer", "Navigator", "Sheet", "Stage"],
	focus: [
		"Button",
		"Carousel",
		"Check",
		"Copy",
		"Field",
		"Fold",
		"Forge",
		"Link",
		"Pick",
		"Search",
		"Tabs",
	],
	layer: ["Menu", "Modal", "Tip", "Toast"],
	document: ["Frame", "Shell"],
};
