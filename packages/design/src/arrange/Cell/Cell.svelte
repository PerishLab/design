<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Cell.scss";

	let {
		span = 1,
		start,
		look = "start",
		children,
	}: {
		span?: number;
		start?: number;
		look?: "start" | "fill";
		children: Snippet;
	} = $props();
	let seat = $derived(start === undefined ? `span ${span}` : `${start} / span ${span}`);
</script>

<div class="cell cell-{look}" style:--seat={seat}>{@render children()}</div>
