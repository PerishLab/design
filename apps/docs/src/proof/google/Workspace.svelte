<script lang="ts">
	import { Aside, Board, Button, Cell, Check, Face, Frame, Grid, Head, Hero, Line, Menu, Nav, Navigator, Note, Pick, Schema, Search, Split, Table, Tabs, Tag, Toast, Vault } from "@perishlab/design";
	import type { Snapshot } from "../../docs/themes.ts";
	import Panel from "./Panel.svelte";
	import { actions, arrange, contract, heads, links, modes, secret, seed, states, type Client } from "./model.ts";

	let { shown, asked, swap }: { shown: Snapshot; asked: (seat: string) => void; swap: () => void } = $props();

	let clients = $state<Client[]>(seed.map((item) => ({ ...item })));
	let route = $state("#clients");
	let compact = $state(false);
	let drawer = $state(false);
	let query = $state("");
	let status = $state("all");
	let sort = $state("客户端");
	let order = $state<"asc" | "desc">("asc");
	let view = $state<"ready" | "loading" | "empty" | "error">("ready");
	let chosen = $state(0);
	let detail = $state(false);
	let revoke = $state(false);
	let hold = $state(false);
	let pkce = $state(true);
	let rotate = $state(false);
	let revealed = $state(false);
	let confirmed = $state(false);
	let notes = $state<string[]>([]);
	let draft = $state({ name: "", redirect: "", notes: "" });

	const dark = $derived(shown.presentation.tone === "dark");
	const visible = $derived(
		arrange(
			clients.filter(
				(item) =>
					(status === "all" || item.state === status) &&
					`${item.name} ${item.id} ${item.scope} ${item.region}`
						.toLowerCase()
						.includes(query.toLowerCase()),
			),
			sort,
			order,
		),
	);
	const rows = $derived(
		visible.map((item) => [
			item.name,
			item.kind,
			item.state,
			item.scope,
			item.region,
			item.updated,
		]),
	);
	const picked = $derived(visible[chosen] ?? clients[0]);
	const nav = $derived(links(route));
	const crumbs = $derived([
		{ label: "PerishLab", href: "#root" },
		{ label: "Workspace", href: "#workspace" },
		{
			label: nav.find((item) => item.href === route)?.label ?? "客户端与凭据",
			href: route,
			live: true,
		},
	]);

	function notify(text: string): void {
		notes = [text];
	}

	function toggle(): void {
		if (globalThis.matchMedia?.("(max-width: 47.9375rem)").matches) {
			drawer = !drawer;
			return;
		}
		compact = !compact;
	}

	function resort(head: string): void {
		if (sort === head) {
			order = order === "asc" ? "desc" : "asc";
			return;
		}
		sort = head;
		order = "asc";
	}

	function inspect(index: number): void {
		chosen = index;
		const item = visible[index];
		if (item === undefined) return;
		draft = { name: item.name, redirect: item.redirect, notes: item.notes };
		detail = true;
	}

	function save(): void {
		if (picked === undefined || !draft.name.trim()) return;
		clients = clients.map((item) =>
			item.id === picked.id
				? {
						...item,
						name: draft.name.trim(),
						redirect: draft.redirect.trim(),
						notes: draft.notes.trim(),
					}
				: item,
		);
		detail = false;
		notify(`已保存 ${draft.name.trim()} 的配置。`);
	}

	function confirm(): void {
		if (picked === undefined) return;
		clients = clients.map((item) =>
			item.id === picked.id ? { ...item, state: "Suspended" } : item,
		);
		revoke = false;
		detail = false;
		notify(`已吊销 ${picked.name} 的活跃凭据。`);
	}

	const handlers: Record<string, () => void> = {
		accounts: () => swap(),
		rotate: () => {
			rotate = true;
			notify("已展开一次性密钥轮换面板。");
		},
		out: () => notify("交互样本：已触发退出登录动作。"),
	};

	function command(value: string): void {
		handlers[value]?.();
	}

	function jump(href: string): void {
		route = href;
		drawer = false;
	}

	function flip(): void {
		asked(dark ? "light" : "dark");
	}
</script>

<Navigator look="bar" stick mark="ensign" owner="PerishLab" title="Workspace">
	{#snippet lead()}
		<Button look="text" sign="menu" name="切换导航" press={toggle} />
	{/snippet}
	<Button look="text" sign="shade" name={dark ? "切换到浅色" : "切换到深色"} press={flip} />
	<Menu label="账号菜单" kind="action" items={actions} choose={command}>
		{#snippet cue()}
			<Face name="Ada Lovelace" />
		{/snippet}
		{#snippet head()}
			<Line name="Ada Lovelace" meta="ada@perish.uk"><Tag text="Admin" look="quiet" /></Line>
		{/snippet}
	</Menu>
</Navigator>

<Frame look="page">
	<Aside under bind:open={drawer} rail={compact} label="Workspace 导航">
		{#snippet side()}
			<Nav look="rail" rail={compact} links={nav} pick={jump} label="工作区主导航" />
		{/snippet}

		<Nav look="crumb" links={crumbs} pick={jump} label="面包屑导航" />

		<Hero
			look="brief"
			title="客户端与访问控制"
			line="管理 OIDC 客户端凭据、Draft 2020-12 策略模式与密钥轮换仪式。"
		>
			{#snippet side()}
				<Button look="quiet" label={hold ? "恢复连接" : "模拟 503"} sign="sync" press={() => (hold = !hold)} />
				<Button label="查看选中详情" press={() => inspect(chosen)} />
			{/snippet}
		</Hero>

		{#if hold}
			<Note
				mood="hold"
				code="503"
				title="写入结果暂不确定"
				text="控制平面响应超时，本地未重试写操作。请先刷新核对当前修订后再决定是否重放。"
				live
			>
				<Button look="quiet" label="刷新核对" sign="sync" press={() => (hold = false)} />
			</Note>
		{/if}

		<Board
			title="受管客户端"
			line={`共 ${visible.length} 项 · 点击任意行展开侧滑抽屉，点击列标题切换排序方向。`}
			seat="clients"
		>
			{#snippet side()}
				<Tabs
					label="表格状态预览"
					tabs={modes}
					value={view}
					change={(next) => (view = next as "ready" | "loading" | "empty" | "error")}
				/>
			{/snippet}
			<Split look="apart">
				<Search bind:value={query} label="筛选客户端" hint="按名称、ID、作用域或区域筛选" />
				<Pick label="状态" choices={states} bind:value={status} />
			</Split>
			<Table
				{heads}
				{rows}
				{sort}
				{order}
				reorder={resort}
				selected={chosen}
				pick={inspect}
				state={view}
				note={view === "error" ? "上游目录服务暂时不可用，请稍后重试。" : "没有匹配的客户端记录。"}
				retry={() => (view = "ready")}
				action="重新加载"
				label="受管客户端列表"
			/>
		</Board>

		<Head text="策略与安全治理" seat="governance" />

		<Grid cols={2}>
			<Cell>
				<Board title="策略模式检查器" line="Draft 2020-12 JSON Schema 与当前选中记录载荷" seat="schema">
					<Schema title={picked.name} schema={contract} data={picked} tree="结构化" raw="JSON" />
				</Board>
			</Cell>
			<Cell>
				<Board title="安全基线与密钥轮换" line="分组设置行与一次性密钥仪式" look="flush" seat="settings">
					<Line name="强制 PKCE 校验" meta="仅允许 S256 挑战方式">
						<Check label="已启用" bind:held={pkce} look="switch" />
					</Line>
					<Line name="令牌签名密钥" meta="RS256 · 每 90 天自动轮换">
						<Tag text="合规" look="quiet" />
					</Line>
					<Line name="客户端密钥轮换" meta="生成仅展示一次的新凭据">
						<Button look="quiet" label={rotate ? "收起仪式" : "轮换密钥"} press={() => (rotate = !rotate)} />
					</Line>
					{#if rotate}
						<Vault
							title="一次性客户端密钥"
							line="离开此界面后将无法再次查看明文密钥。"
							codes={[secret]}
							file={`${picked.id}-secret.txt`}
							check="我已将新密钥安全存入凭据库"
							reveal="显示密钥"
							hide="隐藏密钥"
							save="下载 .txt"
							copy="复制"
							done="已复制"
							bind:shown={revealed}
							bind:held={confirmed}
						>
							<Button
								label="完成轮换"
								halt={!confirmed}
								press={() => {
									rotate = false;
									notify("新客户端密钥已激活。");
								}}
							/>
						</Vault>
					{/if}
				</Board>
			</Cell>
		</Grid>
	</Aside>
</Frame>

<Panel {picked} bind:draft bind:detail bind:revoke {save} {confirm} />

<Toast {notes} />
