import type { Entry } from "./lib.ts";

export const mark: Record<string, Entry> = {
	Code: {
		text: {
			kind: "text",
			en: "the source text to display",
			zh: "要展示的源码文本",
		},
		name: {
			kind: "text",
			en: "an optional file name shown above",
			zh: "可选的文件名,显示在上方",
		},
		copy: { kind: "flag", en: "show a copy control", zh: "是否显示复制控件" },
	},
	Face: {
		name: {
			kind: "text",
			en: "the person or thing the face stands for",
			zh: "这张面孔所代表的人或物",
		},
		src: {
			kind: "text",
			en: "an optional picture to show instead of initials",
			zh: "可选的图片,用以替代缩写",
		},
	},
	Head: {
		text: { kind: "text", en: "the section heading", zh: "区块标题" },
		seat: {
			kind: "text",
			en: "an optional anchor a link can reach",
			zh: "可选的锚点,供链接抵达",
		},
	},
	Hero: {
		title: {
			kind: "text",
			en: "the largest line on the page",
			zh: "页面上最大的一行",
		},
		line: {
			kind: "text",
			en: "one line under the title",
			zh: "标题下的一行文字",
		},
		mark: {
			kind: "text",
			en: "an optional glyph beside the title",
			zh: "标题旁的可选字形",
		},
	},
	Item: {
		children: {
			kind: "node",
			en: "the contents of one item",
			zh: "单个条目的内容",
		},
	},
	Line: {
		name: { kind: "text", en: "the primary row text", zh: "行的主要文字" },
		meta: { kind: "text", en: "optional secondary text", zh: "可选的次要文字" },
		children: {
			kind: "node",
			en: "optional controls or tags on the far side",
			zh: "另一侧的可选控件或标签",
		},
	},
	Meter: {
		label: {
			kind: "text",
			en: "what the bar is measuring",
			zh: "这条进度条在度量什么",
		},
		value: {
			kind: "text",
			en: "a share between zero and one, or nothing while it waits",
			zh: "0 到 1 之间的比例,留空表示仍在等待",
		},
	},
	Note: {
		text: { kind: "text", en: "the message to show", zh: "要显示的消息" },
		mood: {
			kind: "text",
			en: "calm or warning emphasis",
			zh: "平静或警告强调",
		},
	},
	Tag: {
		text: { kind: "text", en: "the short tag text", zh: "简短的标签文字" },
		look: {
			kind: "text",
			en: "a filled tag or an outlined one",
			zh: "填充标签或描边标签",
		},
		mood: {
			kind: "text",
			en: "calm or warning emphasis",
			zh: "平静或警告强调",
		},
	},
	Text: {
		children: {
			kind: "node",
			en: "one paragraph of prose",
			zh: "一段正文",
		},
	},
};
