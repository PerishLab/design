<script lang="ts">
	import "./Table.scss";

	let { heads, rows }: { heads: string[]; rows: string[][] } = $props();
</script>

<table class="table">
	<thead><tr>{#each heads as head (head)}<th scope="col">{head}</th>{/each}</tr></thead>
	<tbody>{#each rows as row (row[0])}<tr>{#each row as cell, at (heads[at])}<td>{cell}</td>{/each}</tr>{/each}</tbody>
</table>
