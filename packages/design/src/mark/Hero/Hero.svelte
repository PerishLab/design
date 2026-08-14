<script lang="ts">
	import "./Hero.scss";

	let { title, line, mark }: { title: string; line: string; mark?: string } = $props();
</script>

<header class="hero">{#if mark !== undefined}<span class="ghost" aria-hidden="true">{mark}</span>{/if}<h1>{title}</h1><p>{line}</p></header>
