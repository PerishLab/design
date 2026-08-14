<script lang="ts">
	import { Check, Field, Line, Tag } from "@perish/design";
	import type { Entry } from "../docs/notes/lib.ts";

	let {
		entry,
		values,
		locale,
		change,
	}: {
		entry: Entry;
		values: Record<string, unknown>;
		locale: "en" | "zh";
		change: (prop: string, next: unknown) => void;
	} = $props();
</script>

{#each Object.entries(entry) as [prop, note] (prop)}
	<Line name={prop} meta={locale === "zh" ? note.zh : note.en}>
		{#if note.kind === "flag"}
			<Check label={prop} held={Boolean(values[prop])} change={(next) => change(prop, next)} />
		{:else if note.kind === "call" || note.kind === "list"}
			<Tag look="quiet" text={note.kind === "call" ? "fn" : "fixed"} />
		{:else}
			<Field label={prop} value={String(values[prop] ?? "")} change={(next) => change(prop, next)} />
		{/if}
	</Line>
{/each}
