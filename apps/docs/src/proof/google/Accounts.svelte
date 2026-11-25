<script lang="ts">
	import {
		Board,
		Button,
		Cell,
		Check,
		Field,
		Form,
		Frame,
		Grid,
		Hero,
		Modal,
		Note,
		Preference,
		Section,
		Sheet,
		Split,
		Tabs,
		Tag,
		Text,
		Toast,
		Vault,
	} from "@perishlab/design";
	import { wanted, type Snapshot } from "../../docs/themes.ts";
	import { codes } from "./model.ts";

	let {
		shown,
		busy,
		fault,
		lose = $bindable(false),
		vent = $bindable(false),
		asked,
		swap,
	}: {
		shown: Snapshot;
		busy: boolean;
		fault: string;
		lose: boolean;
		vent: boolean;
		asked: (seat: string) => void;
		swap: () => void;
	} = $props();

	let login = $state("ada@perish.uk");
	let pass = $state("");
	let ready = $state(false);
	let error = $state("");
	let missing = $state("");
	let hold = $state(false);
	let panel = $state("recovery");
	let reveal = $state(false);
	let saved = $state(false);
	let revoke = $state(false);
	let notes = $state<string[]>([]);

	const panels = [
		{ value: "recovery", label: "一次性恢复代码" },
		{ value: "theme", label: "外观与继承偏好" },
	];

	function notify(text: string): void {
		notes = [text];
	}

	async function submit(): Promise<void> {
		if (!login.trim() || !login.includes("@")) {
			missing = "请输入有效的电子邮箱地址。";
			return;
		}
		missing = "";
		ready = true;
		error = "";
		await new Promise((settle) => setTimeout(settle, 450));
		ready = false;
		pass = "";
		error = "这是本地交互样本，不会提交真实账号或密码。";
	}

	function confirm(): void {
		revoke = false;
		notify("已模拟吊销其余 2 台已登录设备的会话。");
	}
</script>

<Frame look="center">
	<Sheet look="spread">
		{#snippet lead()}
			<Hero title="登录" line="使用你的 Ensign 账号继续访问工作区。" mark="ensign" look="brief" />
		{/snippet}
		<Form label="身份入口样本" {submit} validate={false} busy={ready}>
			<Section title="账号凭据" line="支持浏览器密码管理器与自动填充">
				<Field
					label="电子邮箱"
					name="login"
					kind="email"
					autocomplete="username"
					look="float"
					help="输入所属组织或个人 Ensign 邮箱"
					error={missing || undefined}
					bind:value={login}
					required
					disabled={ready}
				/>
				<Field
					label="密码"
					name="pass"
					autocomplete="current-password"
					kind="password"
					look="float"
					bind:value={pass}
					required
					disabled={ready}
				/>
			</Section>
			{#if hold}
				<Note
					mood="hold"
					code="409"
					title="登录挑战已过期"
					text="另一标签页已更新认证状态，请重新加载挑战参数后再继续。"
				>
					<Button look="quiet" label="刷新状态" sign="sync" press={() => (hold = false)} />
				</Note>
			{:else}
				<Note text="仅在受信任的设备上保持登录状态。" />
			{/if}
			<Split look="apart">
				<Button look="text" label={hold ? "清除 409" : "模拟 409 冲突"} press={() => (hold = !hold)} />
				<Button label={ready ? "正在验证…" : "下一步"} busy={ready} submit />
			</Split>
		</Form>
		{#snippet foot()}
			{#if error}<Note text={error} mood="warn" live />{/if}
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
					{busy}
					error={fault === "" ? undefined : fault}
					inherit="跟随继承"
					change={asked}
					restore={() => asked("")}
				/>
				<Button label="切换到 Workspace" look="quiet" press={swap} />
			</Split>
		{/snippet}
	</Sheet>

	<Board title="账号安全与外观设置" line={fault === "" ? shown.line : fault} seat="theme">
		{#snippet side()}
			<Tag text={shown.id} look="quiet" />
		{/snippet}
		<Tabs label="账号样本分区" tabs={panels} bind:value={panel}>
			{#if panel === "recovery"}
				<Vault
					title="双因素恢复代码"
					line="每个代码仅可使用一次，请妥善保存后继续。"
					{codes}
					file="ensign-recovery-codes.txt"
					check="我已将这 8 组恢复代码安全保存"
					reveal="显示代码"
					hide="隐藏代码"
					save="下载 .txt"
					copy="复制全部"
					done="已复制"
					bind:shown={reveal}
					bind:held={saved}
				>
					<Button label="吊销其他会话" look="quiet" mood="warn" press={() => (revoke = true)} />
					<Button label="确认完成" halt={!saved} press={() => notify("恢复代码确认状态已记录。")} />
				</Vault>
			{:else}
				<Split look="bar" label="偏好写入测试">
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
			{/if}
		</Tabs>
	</Board>
</Frame>

<Modal title="吊销其他设备会话" mood="warn" bind:open={revoke}>
	<Text>吊销后除当前浏览器外的所有活跃会话将立即失效，需重新通过双因素验证登录。</Text>
	{#snippet foot()}
		<Button label="取消" look="quiet" press={() => (revoke = false)} />
		<Button label="确认吊销" mood="warn" press={confirm} />
	{/snippet}
</Modal>

<Toast {notes} />
