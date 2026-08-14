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
		"Line",
		"Meter",
		"Note",
		"Tag",
		"Text",
	],
	arrange: ["Cell", "Grid", "Ledger", "List", "Nav", "Rail", "Split", "Table"],
	enclose: ["Banner", "Board", "Card", "Footer", "Sheet"],
	focus: [
		"Button",
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

export const copy = {
	en: {
		title: "perish design",
		line: "one system, many flavours",
		intro:
			"A living Svelte vocabulary for the workshop. Every word is filed by what it takes responsibility for.",
		filter: "filter components",
		empty: "no component carries that word",
		preview: "preview",
		props: "props",
		language: "简体中文",
		theme: "dark",
		mark: "mark",
		arrange: "arrange",
		enclose: "enclose",
		focus: "focus",
		layer: "layer",
		document: "document",
	},
	zh: {
		title: "perish 设计系统",
		line: "一套系统，多种风味",
		intro: "为工作坊而生的 Svelte 活词汇。每个词都按它所负责之事归档。",
		filter: "筛选组件",
		empty: "没有组件承载这个词",
		preview: "预览",
		props: "属性",
		language: "English",
		theme: "深色",
		mark: "标记",
		arrange: "排布",
		enclose: "围合",
		focus: "焦点",
		layer: "层",
		document: "文档",
	},
};
