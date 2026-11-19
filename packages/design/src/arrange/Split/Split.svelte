<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Split.scss";

	let {
		look = "apart",
		label,
		children,
	}: {
		look?: "apart" | "close" | "end" | "bar";
		label?: string;
		children: Snippet;
	} = $props();
</script>

<div class="split split-{look}" role={label ? "group" : undefined} aria-label={label}>{#if label}<span class="split-label">{label}</span>{/if}{@render children()}</div>
