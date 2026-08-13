<script lang="ts">
	import type { Entry } from "../docs/notes.ts";

	let { entry, values, locale, change }: { entry: Entry; values: Record<string, unknown>; locale: "en" | "zh"; change: (prop: string, next: unknown) => void } = $props();
</script>

<div class="knobs">
	{#each Object.entries(entry) as [prop, note] (prop)}
		{#if note.kind === "flag"}
			<label class="knob"><span>{prop}</span><input type="checkbox" checked={Boolean(values[prop])} onchange={(event) => change(prop, event.currentTarget.checked)} /><em>{locale === "zh" ? note.zh : note.en}</em></label>
		{:else if note.kind === "call" || note.kind === "list"}
			<div class="knob"><span>{prop}</span><code>{note.kind === "call" ? "fn" : "fixed example"}</code><em>{locale === "zh" ? note.zh : note.en}</em></div>
		{:else}
			<label class="knob"><span>{prop}</span><input type="text" value={String(values[prop] ?? "")} oninput={(event) => change(prop, event.currentTarget.value)} /><em>{locale === "zh" ? note.zh : note.en}</em></label>
		{/if}
	{/each}
</div>
