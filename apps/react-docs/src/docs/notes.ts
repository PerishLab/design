export type Kind = "text" | "flag" | "node" | "call" | "list";

type Note = { kind: Kind; en: string; zh: string };

export type Entry = Record<string, Note>;

export const notes: Record<string, Entry> = {
	Badge: {
		children: {
			kind: "node",
			en: "the short label to carry",
			zh: "要承载的短标签",
		},
	},
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
	Button: {
		children: {
			kind: "node",
			en: "the label inside the button",
			zh: "按钮内的文字",
		},
	},
	Card: {
		title: { kind: "text", en: "the heading of the card", zh: "卡片的标题" },
		children: { kind: "node", en: "the body of the card", zh: "卡片的正文" },
	},
	Code: {
		children: {
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
	Copy: {
		text: {
			kind: "text",
			en: "the text placed on the clipboard",
			zh: "写入剪贴板的文本",
		},
	},
	Footer: {
		children: {
			kind: "node",
			en: "optional content for the footer",
			zh: "页脚的可选内容",
		},
	},
	Forge: {
		repo: {
			kind: "text",
			en: "the owner and name of a repository",
			zh: "仓库的所有者与名称",
		},
	},
	Frame: {
		children: {
			kind: "node",
			en: "the whole page inside the shell",
			zh: "外壳内的整个页面",
		},
	},
	Grid: {
		children: {
			kind: "node",
			en: "the cells to lay out",
			zh: "要排布的单元格",
		},
	},
	Hero: {
		title: {
			kind: "text",
			en: "the largest line on the page",
			zh: "页面上最大的一行",
		},
		text: {
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
	Ledger: {
		atoms: {
			kind: "list",
			en: "the word and count pairs to tally",
			zh: "要统计的词与计数对",
		},
	},
	List: {
		children: { kind: "node", en: "the list items", zh: "列表项" },
	},
	Nav: {
		children: { kind: "node", en: "the navigation contents", zh: "导航栏内容" },
	},
	Rail: {
		stops: {
			kind: "list",
			en: "the ordered stops along the rail",
			zh: "轨道上有序的站点",
		},
	},
	Search: {
		value: { kind: "text", en: "the current query text", zh: "当前的查询文本" },
		change: {
			kind: "call",
			en: "called with the next query text",
			zh: "查询文本变化时被调用",
		},
		hint: {
			kind: "text",
			en: "optional placeholder text",
			zh: "可选的占位提示文字",
		},
	},
};
