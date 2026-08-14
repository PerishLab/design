<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Text.scss";

	let { children }: { children: Snippet } = $props();
</script>

<p class="text">{@render children()}</p>
