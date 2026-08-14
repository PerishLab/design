<script lang="ts">
	import { Frame, Hero, Link, Shell } from "@perish/design";
	import Gallery from "./gallery/Gallery.svelte";
	import Proof from "./proof/Proof.svelte";

	let { path }: { path: string } = $props();
</script>

{#if path === "/"}<Gallery locale="en" />
{:else if path === "/zh-CN" || path === "/zh-CN/"}<Gallery locale="zh" />
{:else if path === "/proof" || path === "/proof/"}<Proof />
{:else}<Shell><Frame><main><Hero mark="404" title="Not found" line="That path carries no component." /><Link href="/" label="Return to the gallery" /></main></Frame></Shell>
{/if}
