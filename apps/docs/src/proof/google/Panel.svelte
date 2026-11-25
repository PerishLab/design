<script lang="ts">
	import {
		Button,
		Drawer,
		Field,
		Form,
		Modal,
		Schema,
		Section,
		Tag,
		Text,
	} from "@perishlab/design";
	import { contract, type Client } from "./model.ts";

	let {
		picked,
		draft = $bindable(),
		detail = $bindable(false),
		revoke = $bindable(false),
		save,
		confirm,
	}: {
		picked: Client;
		draft: { name: string; redirect: string; notes: string };
		detail: boolean;
		revoke: boolean;
		save: () => void;
		confirm: () => void;
	} = $props();
</script>

<Drawer bind:open={detail} title={picked.name} line={`${picked.id} · ${picked.region}`}>
	{#snippet side()}
		<Tag text={picked.state} mood={picked.state === "Suspended" ? "warn" : "calm"} />
	{/snippet}
	<Form label="编辑客户端配置" submit={save}>
		<Section title="回调与元数据" line="保存后仅更新当前样本状态">
			<Field label="客户端名称" look="float" bind:value={draft.name} required />
			<Field
				label="回调地址"
				kind="url"
				look="float"
				help="必须使用受信任的 HTTPS 端点"
				bind:value={draft.redirect}
				required
			/>
			<Field
				label="变更备注"
				kind="area"
				help="说明本次配置修改的背景"
				bind:value={draft.notes}
			/>
		</Section>
	</Form>
	<Schema title="实时策略载荷" schema={contract} data={picked} tree="结构化" raw="JSON" />
	{#snippet foot()}
		<Button label="吊销凭据" look="quiet" mood="warn" press={() => (revoke = true)} />
		<Button label="取消" look="quiet" press={() => (detail = false)} />
		<Button label="保存变更" press={save} />
	{/snippet}
</Drawer>

<Modal title={`吊销 ${picked.name}`} mood="warn" bind:open={revoke}>
	<Text>吊销后该客户端当前签发的访问令牌将立即失效，依赖此凭据的服务会中断认证。</Text>
	{#snippet foot()}
		<Button label="保留凭据" look="quiet" press={() => (revoke = false)} />
		<Button label="确认吊销" mood="warn" press={confirm} />
	{/snippet}
</Modal>
