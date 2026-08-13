<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Badge.scss";

	let { children }: { children: Snippet } = $props();
</script>

<span class="badge">{@render children()}</span>
