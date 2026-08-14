import type { Entry } from "./lib.ts";

export const document: Record<string, Entry> = {
	Frame: {
		children: {
			kind: "node",
			en: "the whole page inside the shell",
			zh: "外壳内的整个页面",
		},
	},
	Shell: {
		children: {
			kind: "node",
			en: "the complete product surface",
			zh: "完整的产品界面",
		},
		tone: {
			kind: "text",
			en: "the light or dark preference for this surface",
			zh: "这块界面的浅色或深色偏好",
		},
		system: {
			kind: "text",
			en: "the design system whose tokens dress this surface",
			zh: "为这块界面赋予令牌的设计系统",
		},
	},
};
