<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Hero.scss";
	import { bearing, brand, type Surface } from "../../brand/lib.js";

	let {
		title,
		line,
		mark,
		decor,
		surface,
		look = "plain",
		side,
	}: {
		title: string;
		line: string;
		mark?: string;
		decor?: string;
		surface?: Surface;
		look?: "plain" | "claim" | "brief";
		side?: Snippet;
	} = $props();
	let drawn = $derived(mark === undefined ? undefined : brand(mark, surface));
</script>

{#snippet body()}{#if drawn && mark}<img class="crest" src={drawn.url} alt="" width="100" height="100" data-crest={drawn.id} data-kind={drawn.kind} use:bearing={{ product: mark, surface }} />{:else if decor !== undefined}<span class="ghost" aria-hidden="true">{decor}</span>{/if}<h1>{title}</h1><p>{line}</p>{/snippet}

<header class="hero hero-{look}">{#if side}<div class="hero-row"><div class="hero-copy">{@render body()}</div><div class="hero-side">{@render side()}</div></div>{:else}{@render body()}{/if}</header>
