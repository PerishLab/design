<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Stage.scss";

	let {
		look = "view",
		children,
	}: {
		look?: "view" | "strip" | "pane";
		children: Snippet;
	} = $props();
</script>

<div class="stage stage-{look}">{@render children()}</div>
