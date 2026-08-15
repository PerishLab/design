<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Grid.scss";

	let {
		cols,
		look = "even",
		children,
	}: {
		cols?: number;
		look?: "even" | "loose";
		children: Snippet;
	} = $props();
	let ruled = $derived(
		cols === undefined ? null : `repeat(${cols}, minmax(0, 1fr))`,
	);
</script>

<div class="grid grid-{look}" class:grid-auto={cols === undefined} style:--ruled={ruled}>{@render children()}</div>
