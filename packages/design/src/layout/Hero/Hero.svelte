<script lang="ts">
	import "./Hero.scss";

	let { title, text, mark }: { title: string; text: string; mark?: string } = $props();
</script>

<header class="hero">{#if mark !== undefined}<span class="ghost" aria-hidden="true">{mark}</span>{/if}<h1>{title}</h1><p>{text}</p></header>
