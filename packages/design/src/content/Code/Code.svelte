<script lang="ts">
	import Copy from "../../control/Copy/Copy.svelte";
	import "./Code.scss";

	let { children, name, copy = false }: { children: string; name?: string; copy?: boolean } =
		$props();
	let lines = $derived(children.split("\n"));
	let orders = $derived(lines.some((line) => line.startsWith("$ ")));
</script>

<div class="code">
	{#if name !== undefined || copy}
		<header><span>{name}</span> {#if copy}<Copy text={children} />{/if}</header>
	{/if}
	<pre><code>{#if orders}{#each lines as line}{#if line.startsWith("$ ")}<span class="order"><span class="sign">$</span>{line.slice(1)}{"\n"}</span>{:else}{line}{"\n"}{/if}{/each}{:else}{children}{/if}</code></pre>
</div>
