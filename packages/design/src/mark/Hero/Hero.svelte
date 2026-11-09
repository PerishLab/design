<script lang="ts">
	import "./Hero.scss";
	import { bearing, brand, type Surface } from "../../brand/lib.js";

	let {
		title,
		line,
		mark,
		decor,
		surface,
		look = "plain",
	}: {
		title: string;
		line: string;
		mark?: string;
		decor?: string;
		surface?: Surface;
		look?: "plain" | "claim";
	} = $props();
	let drawn = $derived(mark === undefined ? undefined : brand(mark, surface));
</script>

<header class="hero hero-{look}">{#if drawn && mark}<img class="crest" src={drawn.url} alt="" width="100" height="100" data-crest={drawn.id} data-kind={drawn.kind} use:bearing={{ product: mark, surface }} />{:else if decor !== undefined}<span class="ghost" aria-hidden="true">{decor}</span>{/if}<h1>{title}</h1><p>{line}</p></header>
