<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Board.scss";

	let { title, brief, children }: { title: string; brief?: string; children: Snippet } = $props();
</script>

<section class="board"><header class="board-head"><h2 class="board-title">{title}</h2>{#if brief}<p class="board-brief">{brief}</p>{/if}</header><div class="board-body">{@render children()}</div></section>
