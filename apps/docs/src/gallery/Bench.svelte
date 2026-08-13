<script lang="ts">
	import { Card } from "@perish/design";
	import { notes } from "../docs/notes.ts";
	import { seeds } from "../docs/samples.ts";
	import Knobs from "../knobs/Knobs.svelte";
	import Stage from "./Stage.svelte";

	let { name, locale }: { name: string; locale: "en" | "zh" } = $props();
	function seed(): Record<string, unknown> {
		return { ...(seeds[name] ?? {}) };
	}
	let values = $state<Record<string, unknown>>(seed());
	let entry = $derived(notes[name] ?? {});
</script>

<Card title={name}>
	<Stage {name} {values} />
	<Knobs {entry} {values} {locale} change={(prop, next) => (values = { ...values, [prop]: next })} />
</Card>
