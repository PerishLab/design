<script lang="ts">
	import { Frame, Hero, Link, Shell } from "@perish/design";
	import Front from "./front/Front.svelte";
	import Gallery from "./gallery/Gallery.svelte";
	import { stage } from "./lib/i18n/index.ts";
	import Proof from "./proof/Proof.svelte";

	let { path }: { path: string } = $props();
	let zh = $derived(path.startsWith("/zh-CN"));
	let seat = $derived(path.replace("/zh-CN", "").replace(/\/$/, ""));
	stage(() => (zh ? "zh" : "en"));
</script>

{#if seat === ""}<Front />
{:else if seat === "/gallery"}<Gallery />
{:else if seat === "/proof"}<Proof />
{:else}<Shell><Frame><Hero mark="404" title="Not found" line="That path carries no component." /><Link href="/" label="Return to the front" /></Frame></Shell>
{/if}
