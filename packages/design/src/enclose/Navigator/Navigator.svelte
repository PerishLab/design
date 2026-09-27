<script lang="ts">
	import { Bay, Skin } from "@perishlab/bone";
	import { crest, frame } from "@perishlab/crest/crest";
	import type { Snippet } from "svelte";
	import "./Navigator.scss";

	let {
		mark,
		owner,
		title,
		line,
		home,
		look = "plain",
		stick = false,
		children,
	}: {
		mark?: string;
		owner?: string;
		title: string;
		line?: string;
		home?: string;
		look?: "plain" | "exact";
		stick?: boolean;
		children?: Snippet;
	} = $props();
	let drawn = $derived(mark === undefined ? [] : crest(mark));
</script>

{#snippet lock()}{#if drawn.length > 0}<svg class="mark" viewBox="0 0 {frame} {frame}" aria-hidden="true">{#each drawn as one (one)}<path d={one} />{/each}</svg>{/if}<span class="navigator-type">{#if owner}<span class="navigator-own">{owner}</span>{/if}<span class="navigator-said">{title}</span></span>{/snippet}

<Bay part={stick ? "navigator-bay navigator-band" : "navigator-bay"} {stick} drive={stick}>
	<Skin part="navigator-skin" drive={stick}>
		<header class="navigator navigator-{look}"><div class="navigator-word">{#if home}<a class="navigator-name navigator-home" href={home}>{@render lock()}</a>{:else}<span class="navigator-name">{@render lock()}</span>{/if}{#if line}<p class="navigator-line">{line}</p>{/if}</div>{#if children}<nav>{@render children()}</nav>{/if}</header>
	</Skin>
</Bay>
