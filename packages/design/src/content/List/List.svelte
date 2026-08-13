<script lang="ts">
	import type { Snippet } from "svelte";
	import "./List.scss";

	let { children }: { children: Snippet } = $props();
</script>

<ul class="list">{@render children()}</ul>
