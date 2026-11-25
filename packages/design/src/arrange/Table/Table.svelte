<script lang="ts">
	import Button from "../../focus/Button/Button.svelte";
	import Note from "../../mark/Note/Note.svelte";
	import Sign from "../../mark/Sign/Sign.svelte";
	import "./Table.scss";

	const bones = [0, 1, 2, 3];

	let {
		heads,
		rows,
		sort,
		order = "asc",
		reorder,
		selected,
		pick,
		state = "ready",
		note,
		retry,
		action = "Retry",
		label,
	}: {
		heads: string[];
		rows: string[][];
		sort?: string;
		order?: "asc" | "desc";
		reorder?: (head: string) => void;
		selected?: number;
		pick?: (index: number) => void;
		state?: "ready" | "loading" | "empty" | "error";
		note?: string;
		retry?: () => void;
		action?: string;
		label?: string;
	} = $props();

	function direction(head: string): "ascending" | "descending" | "none" | undefined {
		if (reorder === undefined) return undefined;
		if (sort !== head) return "none";
		return order === "desc" ? "descending" : "ascending";
	}

	function key(event: KeyboardEvent, index: number): void {
		if (pick === undefined) return;
		if (event.key !== "Enter" && event.key !== " ") return;
		event.preventDefault();
		pick(index);
	}
	let region = $derived(
		label
			? { role: "region", tabindex: 0, "aria-label": label }
			: {},
	);
</script>

<div class="table-wrap" {...region} aria-busy={state === "loading"}>
	<table class="table" class:table-pick={pick !== undefined}>
		<thead>
			<tr>
				{#each heads as head (head)}
					<th scope="col" aria-sort={direction(head)}>
						{#if reorder}<button class="table-sort" class:table-sorted={sort === head} type="button" onclick={() => reorder(head)}><span>{head}</span><Sign name="sort" /></button>{:else}{head}{/if}
					</th>
				{/each}
			</tr>
		</thead>
		{#if state === "loading"}
			<tbody>
				{#each bones as bone (bone)}
					<tr class="table-bone">
						{#each heads as head (head)}<td><span class="table-bar"></span></td>{/each}
					</tr>
				{/each}
			</tbody>
		{:else if state === "ready" && rows.length > 0}
			<tbody>
				{#each rows as row, index (`${row[0] ?? ""}-${index}`)}
					<tr class:table-live={selected === index} tabindex={pick === undefined ? undefined : 0} aria-current={pick === undefined ? undefined : selected === index ? "true" : undefined} onclick={() => pick?.(index)} onkeydown={(event) => key(event, index)}>
						{#each row as cell, at (heads[at] ?? at)}<td>{cell}</td>{/each}
					</tr>
				{/each}
			</tbody>
		{/if}
	</table>
	{#if state === "empty" || (state === "ready" && rows.length === 0)}
		<div class="table-state"><p class="table-note">{note ?? "No rows to display."}</p></div>
	{:else if state === "error"}
		<div class="table-state table-fault">
			<Note text={note ?? "Unable to load data."} mood="warn" />
			{#if retry}<Button label={action} look="quiet" sign="sync" press={retry} />{/if}
		</div>
	{/if}
</div>
