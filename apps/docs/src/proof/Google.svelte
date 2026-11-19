<script lang="ts">
	import { Board, Button, Cell, Check, Field, Form, Frame, Grid, Hero, Note, Preference, Sheet, Shell, Split, Tag, Text } from "@perishlab/design";
	import { fallback, legs, refused, snapshots, step, wanted, type Leg } from "../docs/themes.ts";

	const params = new URLSearchParams(globalThis.location?.search ?? "");
	const named = params.get("state");
	const start = legs.find((one) => one === named);
	const seen = params.get("tone") === "dark" ? "chosen" : "inherited";

	let family = $state(params.get("system") === "google-workspace" ? "google-workspace" : "google-accounts");
	let leg = $state<Leg>(start ?? seen);
	let busy = $state(false);
	let lose = $state(false);
	let vent = $state(false);
	let fault = $state("");
	let login = $state("");
	let pass = $state("");
	let ready = $state(false);
	let error = $state("");

	const shown = $derived(snapshots[`${family}/${leg}`] ?? fallback);
	const label = $derived(family === "google-accounts" ? "Workspace" : "Accounts");

	function swap(): void {
		if (busy) return;
		family = family === "google-accounts" ? "google-workspace" : "google-accounts";
		fault = "";
	}

	async function write(seat: string): Promise<void> {
		if (busy) return;
		busy = true;
		fault = "";
		await new Promise((settle) => setTimeout(settle, 700));
		busy = false;
		if (lose) {
			fault = refused;
			return;
		}
		leg = step(leg, seat);
	}

	function asked(seat: string): void {
		if (vent) throw new Error("模拟同步抛错：写入意图没有被接收");
		void write(seat);
	}

	async function submit(): Promise<void> {
		ready = true;
		error = "";
		await new Promise((settle) => setTimeout(settle, 600));
		ready = false;
		pass = "";
		error = "这是交互样本，不会提交账号或密码。";
	}
</script>

<Shell system={shown.presentation.system} tone={shown.presentation.tone}>
	<Frame look="center">
		<Sheet look="spread">
			{#snippet lead()}<Hero title="登录" line="使用你的 Ensign 账号继续。" mark="ensign" look="brief" />{/snippet}
			<Form label="身份入口样本" {submit} busy={ready}>
				<Field label="账号" name="login" autocomplete="username" look="float" bind:value={login} required disabled={ready} />
				<Field label="密码" name="pass" autocomplete="current-password" kind="password" look="float" bind:value={pass} required disabled={ready} />
				<Note text="仅在信任的设备上保持登录。" /><Split look="end"><Button label={ready ? "正在登录…" : "登录"} busy={ready} submit /></Split>
			</Form>
			{#snippet foot()}{#if error}<Note text={error} mood="warn" />{:else}<Note text="交互样本，不会提交账号或密码。" />{/if}{/snippet}
		</Sheet>

		<Board title="外观设置" line={fault === "" ? shown.line : fault} seat="theme">
			<Split look="bar" label="快捷入口">
				<Preference
					look="line"
					name={`${shown.tone.name}.quick`}
					label={shown.tone.label}
					value={shown.tone.effective}
					source={shown.tone.source}
					declaration={shown.tone.declaration}
					origin={shown.tone.origin}
					effect={shown.tone.effect}
					choices={shown.tone.choices}
					editable={shown.tone.editable}
					busy={busy}
					error={fault === "" ? undefined : fault}
					inherit="跟随继承"
					change={asked}
					restore={() => asked("")}
				/>
				<Button label={`切换系统：${label}`} look="quiet" press={swap} />
				<Check label="模拟写入失败" bind:held={lose} look="switch" />
				<Check label="模拟同步抛错" bind:held={vent} look="switch" />
			</Split>

			<Grid cols={3}>
				{#each [shown.family, shown.tone, shown.density] as item (item.name)}
					<Cell>
						<Preference
							name={item.name}
							label={item.label}
							value={item.effective}
							source={item.source}
							declaration={item.declaration}
							origin={item.origin}
							effect={item.effect}
							choices={item.choices}
							editable={item.editable}
							busy={busy && item.name === wanted}
							error={item.name === wanted && fault !== "" ? fault : undefined}
							inherit={item.name === wanted ? "跟随继承" : undefined}
							change={asked}
							restore={() => asked("")}
						/>
					</Cell>
				{/each}
			</Grid>
			<Text>凭据页与设置区共用同一份预计算快照；Shell 只取 <Tag text={shown.id} /> 的 system/tone。</Text>
		</Board>
	</Frame>
</Shell>
