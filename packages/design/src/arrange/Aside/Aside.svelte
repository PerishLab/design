<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Aside.scss";

	let {
		side,
		under = false,
		children,
	}: {
		side: Snippet;
		under?: boolean;
		children: Snippet;
	} = $props();
</script>

<div class="aside" class:aside-under={under}>
	<div class="aside-side">{@render side()}</div>
	<div class="aside-main">{@render children()}</div>
</div>
