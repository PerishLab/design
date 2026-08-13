<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Nav.scss";

	let { children }: { children: Snippet } = $props();
</script>

<nav class="nav">{@render children()}</nav>
