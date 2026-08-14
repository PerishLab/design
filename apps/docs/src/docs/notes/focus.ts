import type { Entry } from "./lib.ts";

export const focus: Record<string, Entry> = {
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
		look: {
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
			en: "mark the button as working and refuse presses",
			zh: "标记按钮正在工作并拒绝按压",
		},
		halt: {
			kind: "flag",
			en: "refuse presses without claiming to be working",
			zh: "拒绝按压但并不声称正在工作",
		},
		submit: {
			kind: "flag",
			en: "submit the nearest form",
			zh: "是否提交最近的表单",
		},
	},
	Check: {
		label: { kind: "text", en: "the words beside the box", zh: "方框旁的文字" },
		held: {
			kind: "flag",
			en: "whether the box is currently ticked",
			zh: "方框当前是否被勾选",
		},
		change: {
			kind: "call",
			en: "called with the next ticked state",
			zh: "勾选状态变化时以新值调用",
		},
		look: {
			kind: "text",
			en: "a box to tick or a switch to throw",
			zh: "可勾选的方框或可拨动的开关",
		},
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
	Fold: {
		label: {
			kind: "text",
			en: "the words on the closed fold",
			zh: "折叠状态下显示的文字",
		},
		open: {
			kind: "flag",
			en: "whether the fold stands open",
			zh: "当前是否展开",
		},
		children: {
			kind: "node",
			en: "what the fold hides",
			zh: "折叠所隐藏的内容",
		},
	},
	Forge: {
		host: {
			kind: "text",
			en: "the origin of the forge that hosts the repository",
			zh: "承载该仓库的代码平台源",
		},
		repo: {
			kind: "text",
			en: "the owner and name of a repository",
			zh: "仓库的所有者与名称",
		},
	},
	Link: {
		label: { kind: "text", en: "the visible link text", zh: "可见的链接文字" },
		href: { kind: "text", en: "the link destination", zh: "链接目标" },
	},
	Pick: {
		label: {
			kind: "text",
			en: "the label above the choices",
			zh: "选项上方的标签",
		},
		value: { kind: "text", en: "the value chosen now", zh: "当前选中的值" },
		choices: {
			kind: "list",
			en: "the value and label pairs on offer",
			zh: "可供选择的值与标签对",
		},
		change: {
			kind: "call",
			en: "called with the next chosen value",
			zh: "选择变化时以新值调用",
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
	Tabs: {
		tabs: {
			kind: "list",
			en: "the value and label of each tab",
			zh: "每个标签页的值与文字",
		},
		value: {
			kind: "text",
			en: "the tab standing open",
			zh: "当前展开的标签页",
		},
		change: {
			kind: "call",
			en: "called with the next open tab",
			zh: "切换时以新的标签页调用",
		},
	},
};
