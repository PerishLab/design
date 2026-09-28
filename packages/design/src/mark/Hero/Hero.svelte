<script lang="ts">
	import "./Hero.scss";

	let {
		title,
		line,
		mark,
		look = "plain",
	}: {
		title: string;
		line: string;
		mark?: string;
		look?: "plain" | "claim";
	} = $props();
</script>

<header class="hero hero-{look}">{#if mark !== undefined}<span class="ghost" aria-hidden="true">{mark}</span>{/if}<h1>{title}</h1><p>{line}</p></header>
