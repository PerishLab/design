<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Shell.scss";

	let { children }: { children: Snippet } = $props();
</script>

<div class="shell">{@render children()}</div>
