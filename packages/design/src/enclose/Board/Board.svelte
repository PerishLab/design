<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Board.scss";

	let {
		title,
		line,
		seat,
		look = "held",
		side,
		children,
	}: {
		title: string;
		line?: string;
		seat?: string;
		look?: "held" | "flush" | "bare";
		side?: Snippet;
		children: Snippet;
	} = $props();
</script>

<section class="board board-{look}" id={seat} tabindex="-1" aria-label={seat === undefined ? undefined : title}><header class="board-head" class:board-split={side !== undefined}><div class="board-copy"><h2 class="board-title">{title}</h2>{#if line}<p class="board-brief">{line}</p>{/if}</div>{#if side}<div class="board-side">{@render side()}</div>{/if}</header><div class="board-body">{@render children()}</div></section>
