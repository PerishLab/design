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
	Board: {
		title: { kind: "text", en: "the board heading", zh: "面板标题" },
		brief: {
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
	Button: {
		children: {
			kind: "node",
			en: "the label inside the button",
			zh: "按钮内的文字",
		},
		label: {
			kind: "text",
			en: "a text label when children are absent",
			zh: "没有子节点时使用的文字标签",
		},
		press: {
			kind: "call",
			en: "called when the button is pressed",
			zh: "按钮被按下时调用",
		},
		tone: {
			kind: "text",
			en: "solid or quiet visual emphasis",
			zh: "实心或安静的视觉强调",
		},
		wide: {
			kind: "flag",
			en: "fill the available width",
			zh: "是否占满可用宽度",
		},
		busy: {
			kind: "flag",
			en: "disable the button while work is running",
			zh: "工作进行时禁用按钮",
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
	Field: {
		label: { kind: "text", en: "the field label", zh: "字段标签" },
		value: { kind: "text", en: "the current field value", zh: "当前字段值" },
		change: {
			kind: "call",
			en: "called with the next field value",
			zh: "字段变化时以新值调用",
		},
		kind: {
			kind: "text",
			en: "plain text or password input",
			zh: "普通文本或密码输入",
		},
		hint: {
			kind: "text",
			en: "optional placeholder text",
			zh: "可选的占位提示文字",
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
	Line: {
		name: { kind: "text", en: "the primary row text", zh: "行的主要文字" },
		meta: { kind: "text", en: "optional secondary text", zh: "可选的次要文字" },
		children: {
			kind: "node",
			en: "optional controls or tags on the far side",
			zh: "另一侧的可选控件或标签",
		},
	},
	Link: {
		label: { kind: "text", en: "the visible link text", zh: "可见的链接文字" },
		href: { kind: "text", en: "the link destination", zh: "链接目标" },
	},
	List: {
		children: { kind: "node", en: "the list items", zh: "列表项" },
	},
	Nav: {
		children: { kind: "node", en: "the navigation contents", zh: "导航栏内容" },
	},
	Note: {
		text: { kind: "text", en: "the message to show", zh: "要显示的消息" },
		tone: {
			kind: "text",
			en: "calm or warning emphasis",
			zh: "平静或警告强调",
		},
	},
	Page: {
		title: { kind: "text", en: "the page heading", zh: "页面标题" },
		children: { kind: "node", en: "the page contents", zh: "页面内容" },
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
	Sheet: {
		children: {
			kind: "node",
			en: "the controls and copy on the bounded surface",
			zh: "有限界面中的控件与文字",
		},
	},
	Shell: {
		children: {
			kind: "node",
			en: "the complete product surface",
			zh: "完整的产品界面",
		},
	},
	Split: {
		children: {
			kind: "node",
			en: "the contents placed at opposite sides",
			zh: "分置两侧的内容",
		},
	},
	Tag: {
		text: { kind: "text", en: "the short tag text", zh: "简短的标签文字" },
		tone: {
			kind: "text",
			en: "calm or warning emphasis",
			zh: "平静或警告强调",
		},
	},
};
