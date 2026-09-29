<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Board.scss";

	let {
		title,
		line,
		seat,
		look = "held",
		children,
	}: {
		title: string;
		line?: string;
		seat?: string;
		look?: "held" | "flush" | "bare";
		children: Snippet;
	} = $props();
</script>

<section class="board board-{look}" id={seat}><header class="board-head"><h2 class="board-title">{title}</h2>{#if line}<p class="board-brief">{line}</p>{/if}</header><div class="board-body">{@render children()}</div></section>
