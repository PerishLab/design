<script lang="ts">
	import Copy from "../../Copy/Copy.svelte";
	import Sign from "../../../mark/Sign/Sign.svelte";
	import { walk, type Row, type Shape } from "./model.js";
	import "./Schema.scss";

	let {
		title,
		schema,
		data,
		mode = $bindable("tree"),
		tree = "Structured",
		raw = "JSON",
	}: {
		title?: string;
		schema: Shape;
		data?: unknown;
		mode?: "tree" | "raw";
		tree?: string;
		raw?: string;
	} = $props();

	function serialize(spec: Shape, value: unknown): string {
		try {
			const payload = value === undefined ? spec : { schema: spec, data: value };
			return JSON.stringify(payload, null, 2) ?? "{}";
		} catch {
			return "{}";
		}
	}

	let rows = $derived(walk(schema, data));
	let source = $derived(serialize(schema, data));
</script>

{#snippet meta(row: Row)}
	<span class="schema-row">
		<code class="schema-name">{row.name}</code>
		<span class="schema-kind">{row.format ? `${row.kind} · ${row.format}` : row.kind}</span>
		{#if row.need}<span class="schema-need">required</span>{/if}
		{#if row.value !== undefined}<code class="schema-value">{row.value}</code>{/if}
	</span>
	{#if row.note}<p class="schema-note">{row.note}</p>{/if}
	{#if row.preset !== undefined || row.choices !== undefined}
		<div class="schema-tags">
			{#if row.preset !== undefined}<span class="schema-chip">default: {row.preset}</span>{/if}
			{#if row.choices !== undefined}<span class="schema-chip">enum: {row.choices.join(", ")}</span>{/if}
		</div>
	{/if}
{/snippet}

{#snippet branch(list: Row[])}
	<ul class="schema-list">
		{#each list as row (row.path)}
			<li class="schema-item">
				{#if row.kids.length > 0}
					<details class="schema-fold" open>
						<summary class="schema-cue"><Sign name="fold" /><span class="schema-leaf">{@render meta(row)}</span></summary>
						<div class="schema-nest">{@render branch(row.kids)}</div>
					</details>
				{:else}
					<div class="schema-leaf">{@render meta(row)}</div>
				{/if}
			</li>
		{/each}
	</ul>
{/snippet}

<section class="schema" aria-label={title ?? "Schema"}>
	<header class="schema-head">
		{#if title}<h3 class="schema-title">{title}</h3>{/if}
		<div class="schema-bar">
			<div class="schema-mode" role="group" aria-label="View mode">
				<button class="schema-tab" type="button" aria-pressed={mode === "tree"} onclick={() => (mode = "tree")}>{tree}</button>
				<button class="schema-tab" type="button" aria-pressed={mode === "raw"} onclick={() => (mode = "raw")}>{raw}</button>
			</div>
			<Copy text={source} />
		</div>
	</header>
	{#if mode === "raw"}
		<pre class="schema-raw"><code>{source}</code></pre>
	{:else if rows.length === 0}
		<div class="schema-body"><p class="schema-empty">No schema fields defined.</p></div>
	{:else}
		<div class="schema-body">{@render branch(rows)}</div>
	{/if}
</section>
