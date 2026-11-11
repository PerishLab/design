export type Entry = {
	id: string;
	zh: string;
	en: string;
	owner: string;
	state: string;
	star: boolean;
	date: string;
};
export const records: Entry[] = [
	{
		id: "EXP-024",
		zh: "语义检索 · 第二轮对照实验",
		en: "Semantic retrieval · second comparison",
		owner: "Lin",
		state: "active",
		star: true,
		date: "11.10",
	},
	{
		id: "EXP-023",
		zh: "深色环境中的阅读节奏",
		en: "Reading rhythm in dark environments",
		owner: "Ada",
		state: "review",
		star: false,
		date: "11.09",
	},
	{
		id: "EXP-022",
		zh: "多语言长文本在窄屏中的可读性与操作路径验证",
		en: "Long multilingual content, narrow screens, and reliable operation paths",
		owner: "Lin",
		state: "active",
		star: false,
		date: "11.09",
	},
	{
		id: "EXP-021",
		zh: "边界条件与失败后的恢复",
		en: "Boundary conditions and recovery after failure",
		owner: "Mira",
		state: "draft",
		star: false,
		date: "11.08",
	},
	{
		id: "EXP-020",
		zh: "记录选择与上下文保留",
		en: "Selection and retained context",
		owner: "Ada",
		state: "review",
		star: true,
		date: "11.08",
	},
	{
		id: "EXP-019",
		zh: "对照组的最小可用结构",
		en: "A minimal structure for the control group",
		owner: "Mira",
		state: "draft",
		star: false,
		date: "11.07",
	},
	{
		id: "EXP-018",
		zh: "检验超长标识符",
		en: "Checking an unbroken identifier",
		owner: "lab_record_0123456789abcdef0123456789abcdef",
		state: "active",
		star: false,
		date: "11.06",
	},
	{
		id: "EXP-017",
		zh: "尚未分配负责人的实验",
		en: "An experiment awaiting an owner",
		owner: "",
		state: "draft",
		star: false,
		date: "11.05",
	},
];

import type { Book } from "./words.ts";
export type Locale = "zh" | "en";
export type Scene = "ready" | "loading" | "error" | "empty";
export type Draft = {
	name: string;
	owner: string;
	state: string;
	star: boolean;
};
export type Intent =
	| { kind: "save" }
	| { kind: "record"; id: string }
	| { kind: "locale"; locale: Locale }
	| { kind: "scene"; scene: Scene }
	| { kind: "reset" };
export type Data = {
	choice: { locale: string; scene: string };
	rows: Entry[];
	selected: string;
	draft: Draft;
	locale: Locale;
	tone: "light" | "dark";
	system: string;
	scene: Scene;
	group: string;
	query: string;
	filter: string;
	busy: boolean;
	opened: boolean;
	intent: Intent;
	error: string;
	failure: string;
	fault: boolean;
	notes: string[];
};
export type View = {
	book: Book;
	current?: Entry;
	found: Entry[];
	dirty: boolean;
	states: { value: string; label: string }[];
};
export type Actions = {
	select: (id: string) => void;
	submit: () => void;
	undo: () => void;
	correct: (value: string) => void;
	language: (value: string) => void;
	scene: (value: string) => void;
	reset: () => void;
	mark: (value: string) => void;
	confirm: () => Promise<void>;
};
export const systems = [
	"base",
	"folio",
	"glass",
	"carbon",
	"relief",
	"ant",
	"brutal",
	"material",
	"swiss",
	"cupertino",
	"terminal",
];
export function title(entry: Entry, locale: Locale): string {
	return entry[locale];
}
export function empty(): Draft {
	return { name: "", owner: "", state: "draft", star: false };
}
export function stored(entry: Entry | undefined, locale: Locale): Draft {
	return entry
		? {
				name: title(entry, locale),
				owner: entry.owner,
				state: entry.state,
				star: entry.star,
			}
		: empty();
}
export function belongs(entry: Entry, group: string): boolean {
	const scopes: { [key: string]: boolean } = {
		all: true,
		stars: entry.star,
		drafts: entry.state === "draft",
	};
	return scopes[group] ?? true;
}
export function statuses(book: Book): { value: string; label: string }[] {
	return (["active", "review", "draft", "archived"] as const).map((value) => ({
		value,
		label: book[value],
	}));
}
export function scene(value: string | null): Scene {
	const allowed: Scene[] = ["ready", "loading", "error", "empty"];
	return allowed.includes(value as Scene) ? (value as Scene) : "ready";
}
