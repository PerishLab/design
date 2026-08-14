<script lang="ts">
	import Copy from "../../focus/Copy/Copy.svelte";
	import "./Code.scss";

	let { text, name, copy = false }: { text: string; name?: string; copy?: boolean } =
		$props();
	let lines = $derived(text.split("\n"));
	let orders = $derived(lines.some((line) => line.startsWith("$ ")));
</script>

<div class="code">
	{#if name !== undefined || copy}
		<header><span>{name}</span> {#if copy}<Copy {text} />{/if}</header>
	{/if}
	<pre><code>{#if orders}{#each lines as line}{#if line.startsWith("$ ")}<span class="order"><span class="sign">$</span>{line.slice(1)}{"\n"}</span>{:else}{line}{"\n"}{/if}{/each}{:else}{text}{/if}</code></pre>
</div>
