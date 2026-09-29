<script lang="ts">
	import { Frame, Hero, Link, Menu, Navigator, Shell } from "@perishlab/design";
	import { named } from "@perishlab/crest/crest";
	import Front from "./front/Front.svelte";
	import Blog from "./front/Blog.svelte";
	import How from "./front/How.svelte";
	import What from "./front/What.svelte";
	import Why from "./front/Why.svelte";
	import { speak, stage, tongue } from "./lib/i18n/index.ts";
	import Proof from "./proof/Proof.svelte";

	type Tone = "system" | "light" | "dark";
	let { path }: { path: string } = $props();
	let zh = $derived(path.startsWith("/zh-CN"));
	let seat = $derived(path.replace("/zh-CN", "").replace(/\/$/, ""));
	stage(() => (zh ? "zh" : "en"));
	const t = speak();
	const heard = tongue();
	let tone: Tone = $state("system");
	let system = $state("base");
	let home = $derived(zh ? "/zh-CN/" : "/");
	let routes = $derived(
		["why", "what", "how", "blog"].map((name) => ({
			name,
			label: t(`pages.navigation.${name}`),
			href: `${zh ? "/zh-CN" : ""}/${name}/`,
		})),
	);
	let shades = $derived([
		{ value: "system", label: t("front.system") },
		{ value: "light", label: t("front.light") },
		{ value: "dark", label: t("front.theme") },
	]);
	const tongues = [
		{ value: "en", label: "English" },
		{ value: "zh", label: "简体中文" },
	];
	function travel(next: string): void {
		const tail = seat === "" ? "/" : `${seat}/`;
		globalThis.location.href = next === "en" ? tail : `/zh-CN${tail}`;
	}
</script>

{#if seat === "/proof"}<Proof />
{:else}<Shell tone={tone === "system" ? undefined : tone} system={system === "base" || system === "all" ? undefined : system}>
	<Navigator stick look="exact" mark="design" owner={named.design.owner} title={named.design.name} {home}>
		{#each routes as route (route.name)}<Link look="nav" href={route.href} label={route.label} here={seat === `/${route.name}`} />{/each}
		<Menu look="bare" sign="tongue" label={t("front.tongue")} value={heard()} items={tongues} choose={travel} />
		<Menu look="bare" sign="shade" label={t("front.shade")} value={tone} items={shades} choose={(next) => (tone = next as Tone)} />
	</Navigator>
	{#if seat === ""}<Front bind:system {tone} />
	{:else if seat === "/why"}<Why />
	{:else if seat === "/what"}<What />
	{:else if seat === "/how"}<How />
	{:else if seat === "/blog"}<Blog />
	{:else}<Frame><Hero mark="404" title={t("pages.missing.title")} line={t("pages.missing.line")} /><Link href={home} label={t("pages.missing.return")} /></Frame>
	{/if}
</Shell>
{/if}
