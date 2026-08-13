<script lang="ts">
	import { Note, Page } from "@perish/design";
	import Gallery from "./gallery/Gallery.svelte";

	let { path }: { path: string } = $props();
</script>

{#if path === "/"}<Gallery locale="en" />
{:else if path === "/zh-CN" || path === "/zh-CN/"}<Gallery locale="zh" />
{:else}<Page title="Not found"><Note text="That page does not exist." tone="warn" /></Page>
{/if}
