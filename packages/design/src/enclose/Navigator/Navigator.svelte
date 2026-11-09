<script lang="ts">
	import { Bay, Skin } from "@perishlab/bone";
	import { bearing, brand, type Surface } from "../../brand/lib.js";
	import type { Snippet } from "svelte";
	import "./Navigator.scss";

	let {
		mark,
		surface,
		owner,
		title,
		line,
		home,
		look = "plain",
		stick = false,
		children,
	}: {
		mark?: string;
		surface?: Surface;
		owner?: string;
		title: string;
		line?: string;
		home?: string;
		look?: "plain" | "exact";
		stick?: boolean;
		children?: Snippet;
	} = $props();
	let drawn = $derived(mark === undefined ? undefined : brand(mark, surface));
</script>

{#snippet lock()}{#if drawn && mark}<img class="mark" src={drawn.url} width="100" height="100" alt="" data-crest={drawn.id} data-kind={drawn.kind} use:bearing={{ product: mark, surface }} />{/if}<span class="navigator-type">{#if owner}<span class="navigator-own">{owner}</span>{/if}<span class="navigator-said">{title}</span></span>{/snippet}

<Bay part={stick ? "navigator-bay navigator-band" : "navigator-bay"} {stick} drive={stick}>
	<Skin part="navigator-skin" drive={stick}>
		<header class="navigator navigator-{look}"><div class="navigator-word">{#if home}<a class="navigator-name navigator-home" href={home}>{@render lock()}</a>{:else}<span class="navigator-name">{@render lock()}</span>{/if}{#if line}<p class="navigator-line">{line}</p>{/if}</div>{#if children}<nav>{@render children()}</nav>{/if}</header>
	</Skin>
</Bay>
