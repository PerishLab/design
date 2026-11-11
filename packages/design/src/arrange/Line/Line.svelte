<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Line.scss";

	let { name, meta, children, flow = "hold" }: { name: string; meta?: string; children?: Snippet; flow?: "fold" | "hold" } = $props();
</script>

<div class="line" class:line-fold={flow === "fold"}><div class="line-text"><span class="line-name">{name}</span>{#if meta}<span class="line-meta">{meta}</span>{/if}</div>{#if children}<div class="line-side">{@render children()}</div>{/if}</div>
