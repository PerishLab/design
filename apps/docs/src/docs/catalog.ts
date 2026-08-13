export type Group = "content" | "control" | "layout" | "surface";

export const groups: Group[] = ["content", "control", "layout", "surface"];

export const catalog: Record<Group, string[]> = {
	content: ["Badge", "Code", "Ledger", "List", "Note", "Tag"],
	control: ["Button", "Copy", "Field", "Forge", "Link", "Search"],
	layout: [
		"Banner",
		"Card",
		"Footer",
		"Frame",
		"Grid",
		"Hero",
		"Line",
		"Nav",
		"Rail",
		"Split",
	],
	surface: ["Board", "Page", "Sheet", "Shell"],
};

export const copy = {
	en: {
		title: "perish design",
		line: "one system, many flavours",
		intro:
			"A living Svelte vocabulary for the workshop. Inspect each word in isolation, then shape it without leaving the page.",
		filter: "filter components",
		empty: "no component carries that word",
		preview: "preview",
		props: "props",
		language: "简体中文",
		theme: "dark",
		content: "content",
		control: "control",
		layout: "layout",
		surface: "surface",
	},
	zh: {
		title: "perish 设计系统",
		line: "一套系统，多种风味",
		intro:
			"为工作坊而生的 Svelte 活词汇。在隔离环境中观察每个词，也可以留在页面内直接调整它。",
		filter: "筛选组件",
		empty: "没有组件承载这个词",
		preview: "预览",
		props: "属性",
		language: "English",
		theme: "深色",
		content: "内容",
		control: "控件",
		layout: "布局",
		surface: "界面",
	},
};
