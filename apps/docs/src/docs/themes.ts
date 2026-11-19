export type Layer = { state: "missing" } | { state: "present"; value: string };

export type Item = {
	name: string;
	label: string;
	choices: { value: string; label: string }[];
	effective: string;
	source: "default" | "shared" | "app" | "policy";
	declaration: Layer;
	editable: boolean;
	origin: string;
	effect: string;
};

export type Leg =
	| "inherited"
	| "declared"
	| "chosen"
	| "held"
	| "sealed"
	| "fixed";

export type Snapshot = {
	id: string;
	line: string;
	presentation: { system: string; tone: "light" | "dark" };
	family: Item;
	tone: Item;
	density: Item;
};

type Press = {
	line: string;
	dark: boolean;
	source: "default" | "shared" | "app" | "policy";
	seal: Layer;
	origin: string;
	effect: string;
};

export const wanted = "theme.tone";

export const refused = "写入被拒绝；有效值、来源与声明都保持写入前的样子。";

export const families = [
	{ value: "google-accounts", label: "Accounts" },
	{ value: "google-workspace", label: "Workspace" },
];

const tones = [
	{ value: "light", label: "浅色" },
	{ value: "dark", label: "深色" },
];

const density = [
	{ value: "cozy", label: "舒展" },
	{ value: "compact", label: "紧凑" },
];

const light: Layer = { state: "present", value: "light" };
const dark: Layer = { state: "present", value: "dark" };
const missing: Layer = { state: "missing" };

const press: Record<Leg, Press> = {
	inherited: {
		line: "本应用没有声明明暗：控件选中「跟随继承」，有效值来自共享层。",
		dark: false,
		source: "shared",
		seal: missing,
		origin: "继承自共享设置",
		effect: "有效值：浅色",
	},
	declared: {
		line: "本应用声明了浅色。有效值与继承值相同，但声明确实存在。",
		dark: false,
		source: "app",
		seal: light,
		origin: "本应用已声明",
		effect: "有效值：浅色（声明也是浅色）",
	},
	chosen: {
		line: "本应用声明了深色，页面随之呈现深色。",
		dark: true,
		source: "app",
		seal: dark,
		origin: "本应用已声明",
		effect: "有效值：深色（声明也是深色）",
	},
	held: {
		line: "策略层覆盖：本应用声明浅色，有效值仍是深色。控件仍可编辑，写入也会被接受。",
		dark: true,
		source: "policy",
		seal: light,
		origin: "策略层覆盖本应用声明",
		effect: "有效值：深色（声明为浅色）",
	},
	sealed: {
		line: "写入被接受：声明已改为深色，但有效明暗仍由策略层固定为深色。",
		dark: true,
		source: "policy",
		seal: dark,
		origin: "策略层固定有效值",
		effect: "有效值：深色（声明为深色）",
	},
	fixed: {
		line: "声明已移除：有效明暗仍由策略层固定为深色。",
		dark: true,
		source: "policy",
		seal: missing,
		origin: "策略层固定有效值",
		effect: "有效值：深色",
	},
};

const walk: Record<Leg, Record<string, Leg>> = {
	inherited: { "": "inherited", light: "declared", dark: "chosen" },
	declared: { "": "inherited", light: "declared", dark: "chosen" },
	chosen: { "": "inherited", light: "declared", dark: "chosen" },
	held: { "": "fixed", light: "held", dark: "sealed" },
	sealed: { "": "fixed", light: "held", dark: "sealed" },
	fixed: { "": "fixed", light: "held", dark: "sealed" },
};

export const legs: Leg[] = [
	"inherited",
	"declared",
	"chosen",
	"held",
	"sealed",
	"fixed",
];

function chased(one: string): string {
	return families.find((each) => each.value === one)?.label ?? one;
}

export function step(leg: Leg, seat: string): Leg {
	return walk[leg][seat] ?? leg;
}

export function snapshot(family: string, leg: Leg): Snapshot {
	const here = press[leg];
	return {
		id: `${family}/${leg}`,
		line: here.line,
		presentation: { system: family, tone: here.dark ? "dark" : "light" },
		family: {
			name: "theme.family",
			label: "Google 主题簇",
			choices: families,
			effective: family,
			source: "shared",
			declaration: missing,
			editable: false,
			origin: "承载页面决定，样本用「切换系统」按钮换视图",
			effect: `有效值：${chased(family)}`,
		},
		tone: {
			name: wanted,
			label: "明暗",
			choices: tones,
			effective: here.dark ? "dark" : "light",
			source: here.source,
			declaration: here.seal,
			editable: true,
			origin: here.origin,
			effect: here.effect,
		},
		density: {
			name: "theme.density",
			label: "密度",
			choices: density,
			effective: "compact",
			source: "policy",
			declaration: { state: "present", value: "cozy" },
			editable: false,
			origin: "策略层固定有效值，本应用不可改写",
			effect: "有效值：紧凑（声明为舒展）",
		},
	};
}

export const snapshots: Record<string, Snapshot> = Object.fromEntries(
	families.flatMap((one) =>
		legs.map(
			(leg) => [`${one.value}/${leg}`, snapshot(one.value, leg)] as const,
		),
	),
);

export const fallback: Snapshot = snapshot("google-accounts", "inherited");
