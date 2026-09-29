<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Grid.scss";

	let {
		cols,
		look = "even",
		flow = "fold",
		children,
	}: {
		cols?: number;
		look?: "even" | "loose";
		flow?: "fold" | "hold";
		children: Snippet;
	} = $props();
	let ruled = $derived(
		cols === undefined ? null : `repeat(${cols}, minmax(0, 1fr))`,
	);
</script>

<div class="grid grid-{look}" class:grid-auto={cols === undefined} class:grid-hold={flow === "hold"} style:--ruled={ruled}>{@render children()}</div>
