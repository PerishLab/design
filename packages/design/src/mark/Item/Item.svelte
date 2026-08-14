<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Item.scss";

	let { children }: { children: Snippet } = $props();
</script>

<li class="item">{@render children()}</li>
