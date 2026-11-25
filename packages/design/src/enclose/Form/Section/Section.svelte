<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Section.scss";

	let {
		title,
		line,
		disabled = false,
		side,
		children,
	}: {
		title: string;
		line?: string;
		disabled?: boolean;
		side?: Snippet;
		children: Snippet;
	} = $props();
</script>

<fieldset class="section" {disabled}>
	<legend class="section-title">{title}</legend>
	{#if line || side}
		<div class="section-meta">
			{#if line}<p class="section-line">{line}</p>{/if}
			{#if side}<div class="section-side">{@render side()}</div>{/if}
		</div>
	{/if}
	<div class="section-body">{@render children()}</div>
</fieldset>
