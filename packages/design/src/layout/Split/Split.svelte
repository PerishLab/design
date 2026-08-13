<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Split.scss";

	let { children }: { children: Snippet } = $props();
</script>

<div class="split">{@render children()}</div>
