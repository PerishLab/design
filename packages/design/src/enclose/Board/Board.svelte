<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Board.scss";

	let { title, line, children }: { title: string; line?: string; children: Snippet } = $props();
</script>

<section class="board"><header class="board-head"><h2 class="board-title">{title}</h2>{#if line}<p class="board-brief">{line}</p>{/if}</header><div class="board-body">{@render children()}</div></section>
