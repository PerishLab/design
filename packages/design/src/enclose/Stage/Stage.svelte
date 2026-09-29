<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Stage.scss";

	let {
		look = "view",
		label,
		meta,
		children,
	}: {
		look?: "view" | "strip" | "pane" | "show";
		label?: string;
		meta?: string;
		children: Snippet;
	} = $props();
</script>

<div class="stage stage-{look}">
	{#if label}<div class="stage-sign" aria-hidden="true"><span class="stage-meta">{meta}</span><strong class="stage-name">{label}</strong></div><div class="stage-body">{@render children()}</div>{:else}{@render children()}{/if}
</div>
