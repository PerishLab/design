<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Frame.scss";

	let {
		look = "page",
		children,
	}: {
		look?: "page" | "read" | "sheet" | "full" | "center";
		children: Snippet;
	} = $props();
</script>

<div class="frame frame-{look}" role={look === "center" ? "main" : undefined}>{@render children()}</div>
