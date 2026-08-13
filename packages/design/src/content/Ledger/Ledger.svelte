<script lang="ts">
	import "./Ledger.scss";

	let { atoms }: { atoms: { word: string; count: number }[] } = $props();
</script>

<ul class="ledger">
	{#each atoms as atom (atom.word)}
		<li><span>{atom.word}</span><span class="tail"></span> <span class="tally">{atom.count}</span></li>
	{/each}
</ul>
