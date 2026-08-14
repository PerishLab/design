<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Grid.scss";

	let { cols, children }: { cols?: number; children: Snippet } = $props();
	let ruled = $derived(
		cols === undefined ? null : `repeat(${cols}, minmax(0, 1fr))`,
	);
</script>

<div class="grid" style:grid-template-columns={ruled}>{@render children()}</div>
