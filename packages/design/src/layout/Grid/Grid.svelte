<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Grid.scss";

	let { children }: { children: Snippet } = $props();
</script>

<div class="grid">{@render children()}</div>
