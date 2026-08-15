<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Frame.scss";

	let {
		look = "page",
		children,
	}: {
		look?: "page" | "read" | "sheet" | "full";
		children: Snippet;
	} = $props();
</script>

<div class="frame frame-{look}">{@render children()}</div>
