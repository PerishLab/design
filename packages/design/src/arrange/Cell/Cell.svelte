<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Cell.scss";

	let {
		span = 1,
		start,
		children,
	}: {
		span?: number;
		start?: number;
		children: Snippet;
	} = $props();
	let seat = $derived(start === undefined ? `span ${span}` : `${start} / span ${span}`);
</script>

<div class="cell" style:grid-column={seat}>{@render children()}</div>
