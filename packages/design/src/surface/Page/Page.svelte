<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Page.scss";

	let { title, children }: { title: string; children: Snippet } = $props();
</script>

<main class="page"><h1 class="page-title">{title}</h1>{@render children()}</main>
