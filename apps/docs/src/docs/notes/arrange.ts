import type { Entry } from "./lib.ts";

export const arrange: Record<string, Entry> = {
	Cell: {
		span: {
			kind: "text",
			en: "how many columns of the grid this cell takes",
			zh: "这一格占据栅格的几列",
		},
		start: {
			kind: "text",
			en: "the column it starts at, when the place is chosen",
			zh: "起始列,用于指定位置时",
		},
		children: {
			kind: "node",
			en: "what stands in the cell",
			zh: "格子里放置的内容",
		},
	},
	Grid: {
		cols: {
			kind: "text",
			en: "a fixed column count, or nothing to fill by cell width",
			zh: "固定列数,留空则按单元宽度自动填充",
		},
		children: {
			kind: "node",
			en: "the cells to lay out",
			zh: "要排布的单元格",
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
		links: {
			kind: "list",
			en: "the label, target, and live state of each entry",
			zh: "每个条目的文字、目标与当前态",
		},
	},
	Rail: {
		stops: {
			kind: "list",
			en: "the ordered stops along the rail",
			zh: "轨道上有序的站点",
		},
	},
	Split: {
		children: {
			kind: "node",
			en: "the contents placed at opposite sides",
			zh: "分置两侧的内容",
		},
	},
	Table: {
		heads: {
			kind: "list",
			en: "the column headings",
			zh: "各列的表头",
		},
		rows: {
			kind: "list",
			en: "the cells of each row in column order",
			zh: "按列序排列的每行单元格",
		},
	},
};
