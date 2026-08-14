import type { Entry } from "./lib.ts";

export const enclose: Record<string, Entry> = {
	Banner: {
		mark: {
			kind: "text",
			en: "a single glyph shown before the title",
			zh: "标题前的单个字形",
		},
		title: { kind: "text", en: "the headline of the banner", zh: "横幅的标题" },
		line: {
			kind: "text",
			en: "one line of supporting text",
			zh: "一行辅助文字",
		},
		children: {
			kind: "node",
			en: "optional content below the line",
			zh: "文字下方的可选内容",
		},
	},
	Board: {
		title: { kind: "text", en: "the board heading", zh: "面板标题" },
		line: {
			kind: "text",
			en: "optional supporting text under the heading",
			zh: "标题下方的可选辅助文字",
		},
		children: {
			kind: "node",
			en: "the rows and controls inside the board",
			zh: "面板内的行与控件",
		},
	},
	Card: {
		title: { kind: "text", en: "the heading of the card", zh: "卡片的标题" },
		children: { kind: "node", en: "the body of the card", zh: "卡片的正文" },
	},
	Footer: {
		text: {
			kind: "text",
			en: "the colophon line the product speaks for itself",
			zh: "产品自己署上的版本说明行",
		},
		children: {
			kind: "node",
			en: "optional content for the footer",
			zh: "页脚的可选内容",
		},
	},
	Sheet: {
		children: {
			kind: "node",
			en: "the controls and copy on the bounded surface",
			zh: "有限界面中的控件与文字",
		},
	},
};
