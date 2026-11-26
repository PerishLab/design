export type Client = {
	id: string;
	name: string;
	kind: string;
	state: "Active" | "Pending" | "Suspended";
	scope: string;
	region: string;
	updated: string;
	redirect: string;
	notes: string;
};

export const heads = ["客户端", "类型", "状态", "作用域", "区域", "更新时间"];

export const states = [
	{ value: "all", label: "全部状态" },
	{ value: "Active", label: "Active" },
	{ value: "Pending", label: "Pending" },
	{ value: "Suspended", label: "Suspended" },
];

export const seed: Client[] = [
	{
		id: "cli_ensign_web",
		name: "Ensign Web Portal",
		kind: "OIDC SPA",
		state: "Active",
		scope: "org / accounts",
		region: "eu-west",
		updated: "2026-11-24",
		redirect: "https://accounts.perish.uk/callback",
		notes: "Primary identity portal with PKCE enforced.",
	},
	{
		id: "cli_folio_docs",
		name: "Folio Workspace",
		kind: "Confidential",
		state: "Active",
		scope: "org / workspace",
		region: "eu-west",
		updated: "2026-11-23",
		redirect: "https://folio.perish.uk/auth/callback",
		notes: "Workspace document studio and schema inspector.",
	},
	{
		id: "cli_plumb_cli",
		name: "Plumb Release CLI",
		kind: "Device Flow",
		state: "Pending",
		scope: "team / release",
		region: "global",
		updated: "2026-11-21",
		redirect: "https://cli.perish.uk/device",
		notes: "Short-lived release operator sessions.",
	},
	{
		id: "cli_legacy_hook",
		name: "Legacy Webhook Bridge",
		kind: "Service",
		state: "Suspended",
		scope: "service / hooks",
		region: "us-east",
		updated: "2026-10-19",
		redirect: "https://hooks.perish.uk/oidc",
		notes: "Paused pending secret rotation and scope audit.",
	},
];

export const codes = [
	"9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
	"4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce",
	"6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b",
	"d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35",
	"ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d",
	"e7f6c011776e8db7cd330b54174fd76f7d0216b612387a5ffcfb81e6f0919683",
];

export const secret = "ens_live_7f4b9c2e18d640a3b9e21f7c4a0d85e1";

export const actions = [
	{ value: "accounts", label: "前往 Accounts 门户", sign: "away" },
	{ value: "rotate", label: "轮换工作区密钥", sign: "takes" },
	{ value: "out", label: "退出登录", sign: "shut", mood: "warn" as const },
];

export const modes = [
	{ value: "ready", label: "就绪" },
	{ value: "loading", label: "加载中" },
	{ value: "empty", label: "空态" },
	{ value: "error", label: "故障" },
];

const needed: string[] = ["id", "name", "state", "redirect"];
const kinds: string[] = ["OIDC SPA", "Confidential", "Device Flow", "Service"];

export const contract = {
	$defs: {
		Redirect: {
			type: "string",
			format: "uri",
			description: "受信任的 HTTPS OIDC 回调地址",
		},
	},
	type: "object",
	required: needed,
	properties: {
		id: { type: "string", description: "稳定客户端唯一标识" },
		name: { type: "string", description: "工作区展示名称" },
		kind: {
			type: "string",
			enum: kinds,
			default: "Confidential",
			description: "客户端授权类型",
		},
		state: {
			type: "string",
			enum: ["Active", "Pending", "Suspended"],
			default: "Active",
			description: "当前生命周期状态",
		},
		region: { type: "string", default: "eu-west", description: "部署区域" },
		redirect: { $ref: "#/$defs/Redirect" },
	},
};

export function links(current: string) {
	return [
		{
			label: "客户端与凭据",
			href: "#clients",
			group: "工作区",
			sign: "places",
			live: current === "#clients",
		},
		{
			label: "模式检查",
			href: "#schema",
			group: "工作区",
			sign: "keeps",
			live: current === "#schema",
		},
		{
			label: "安全与密钥",
			href: "#settings",
			group: "治理",
			sign: "bounds",
			live: current === "#settings",
		},
		{
			label: "策略审计",
			href: "#audit",
			group: "治理",
			sign: "owns",
			live: current === "#audit",
		},
	];
}

export function arrange(
	list: Client[],
	sort: string,
	order: "asc" | "desc",
): Client[] {
	const index = heads.indexOf(sort);
	if (index < 0) return list;
	const factor = order === "desc" ? -1 : 1;
	const keys: (keyof Client)[] = [
		"name",
		"kind",
		"state",
		"scope",
		"region",
		"updated",
	];
	const key = keys[index] ?? "name";
	return [...list].sort(
		(left, right) => left[key].localeCompare(right[key]) * factor,
	);
}
