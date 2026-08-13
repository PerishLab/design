<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Line.scss";

	let { name, meta, children }: { name: string; meta?: string; children?: Snippet } = $props();
</script>

<div class="line"><div class="line-text"><span class="line-name">{name}</span>{#if meta}<span class="line-meta">{meta}</span>{/if}</div>{#if children}<div class="line-side">{@render children()}</div>{/if}</div>
