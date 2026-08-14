import type { Entry } from "./lib.ts";

export const layer: Record<string, Entry> = {
	Menu: {
		label: {
			kind: "text",
			en: "the words on the button that opens it",
			zh: "打开菜单的按钮上的文字",
		},
		items: {
			kind: "list",
			en: "the value and label of each entry",
			zh: "每个条目的值与文字",
		},
		open: {
			kind: "flag",
			en: "whether the list stands open",
			zh: "列表当前是否展开",
		},
		choose: {
			kind: "call",
			en: "called with the value that was picked",
			zh: "被选中时以该值调用",
		},
	},
	Modal: {
		title: {
			kind: "text",
			en: "the name of what the dialog is asking",
			zh: "对话框所询问之事的名称",
		},
		open: {
			kind: "flag",
			en: "whether the dialog holds the screen",
			zh: "对话框当前是否占据屏幕",
		},
		children: {
			kind: "node",
			en: "the contents of the dialog",
			zh: "对话框的内容",
		},
	},
	Tip: {
		text: {
			kind: "text",
			en: "the words the tip carries",
			zh: "提示所承载的文字",
		},
		children: {
			kind: "node",
			en: "what the tip explains",
			zh: "提示所解释的对象",
		},
	},
	Toast: {
		notes: {
			kind: "list",
			en: "the messages waiting to be read aloud",
			zh: "等待被朗读的消息",
		},
		mood: {
			kind: "text",
			en: "calm or warning emphasis",
			zh: "平静或警告强调",
		},
	},
};
