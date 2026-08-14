<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Frame.scss";

	let { children }: { children: Snippet } = $props();
</script>

<div class="frame">{@render children()}</div>
