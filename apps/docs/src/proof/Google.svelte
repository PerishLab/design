<script lang="ts">
	import { Button, Field, Form, Frame, Hero, Note, Pick, Sheet, Shell, Split } from "@perishlab/design";
	const params = new URLSearchParams(globalThis.location?.search ?? "");
	let system = $state(params.get("system") === "google-workspace" ? "google-workspace" : "google-accounts");
	let tone: "light" | "dark" = $state(params.get("tone") === "dark" ? "dark" : "light");
	let login = $state("");
	let pass = $state("");
	let busy = $state(false);
	let error = $state("");
	async function submit(): Promise<void> {
		busy = true;
		error = "";
		await new Promise(resolve => setTimeout(resolve, 600));
		busy = false;
		pass = "";
		error = "这是交互样本，不会提交账号或密码。";
	}
</script>

<Shell {system} {tone}>
	<Frame look="center">
		<Sheet look="spread">
			{#snippet lead()}<Hero title="登录" line="使用你的 Ensign 账号继续。" mark="ensign" look="brief" />{/snippet}
			<Form label="身份入口样本" {submit} {busy}>
				<Field label="账号" name="login" autocomplete="username" look="float" bind:value={login} required disabled={busy} />
				<Field label="密码" name="pass" autocomplete="current-password" kind="password" look="float" bind:value={pass} required disabled={busy} />
				<Note text="仅在信任的设备上保持登录。" /><Split look="end"><Button label={busy ? "正在登录…" : "登录"} {busy} submit /></Split>
			</Form>
			{#snippet foot()}{#if error}<Note text={error} mood="warn" />{:else}<Note text="交互样本，不会提交账号或密码。" />{/if}{/snippet}
		</Sheet>
		<Split look="bar" label="Google 主题预览">
			<Pick look="bare" label="Google 主题簇" bind:value={system} choices={[{ value: "google-accounts", label: "Accounts" }, { value: "google-workspace", label: "Workspace" }]} />
			<Button label={tone === "light" ? "深色模式" : "浅色模式"} look="quiet" press={() => tone = tone === "light" ? "dark" : "light"} />
		</Split>
	</Frame>
</Shell>
