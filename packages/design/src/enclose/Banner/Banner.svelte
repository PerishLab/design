<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Banner.scss";

	let { mark, title, line, children }: { mark: string; title: string; line: string; children?: Snippet } = $props();
</script>

<header class="banner"><span class="mark" aria-hidden="true">{mark}</span><div><h1>{title}</h1><p>{line}</p></div>{#if children}<nav>{@render children()}</nav>{/if}</header>
