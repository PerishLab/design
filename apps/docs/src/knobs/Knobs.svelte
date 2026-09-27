<script lang="ts">
	import { Check, Field, Note } from "@perishlab/design";
	import type { Kind } from "../docs/kinds.ts";
	import { speak } from "../lib/i18n/index.ts";

	let {
		name,
		entry,
		values,
		change,
	}: {
		name: string;
		entry: Record<string, Kind>;
		values: Record<string, unknown>;
		change: (prop: string, next: unknown) => void;
	} = $props();
	const t = speak();
</script>

{#each Object.entries(entry) as [prop, kind] (prop)}
	{#if kind === "flag"}
		<Check label={prop} held={Boolean(values[prop])} change={(next) => change(prop, next)} />
	{:else if kind === "call" || kind === "list"}
		<Note text={`${prop} — ${kind === "call" ? "fn" : "fixed"}`} />
	{:else}
		<Field label={prop} value={String(values[prop] ?? "")} change={(next) => change(prop, next)} hint={t(`notes.${name}.${prop}`)} />
	{/if}
{/each}
