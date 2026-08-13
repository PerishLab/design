<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Sheet.scss";

	let { children }: { children: Snippet } = $props();
</script>

<section class="sheet">{@render children()}</section>
