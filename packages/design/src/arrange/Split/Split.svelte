<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Split.scss";

	let {
		look = "apart",
		children,
	}: {
		look?: "apart" | "close";
		children: Snippet;
	} = $props();
</script>

<div class="split split-{look}">{@render children()}</div>
