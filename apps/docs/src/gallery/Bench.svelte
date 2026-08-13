<script lang="ts">
	import { Board } from "@perish/design";
	import { notes } from "../docs/notes.ts";
	import { seeds } from "../docs/samples.ts";
	import Knobs from "../knobs/Knobs.svelte";
	import Realm from "./Realm.svelte";

	let { name, locale, tone, labels }: { name: string; locale: "en" | "zh"; tone: "light" | "dark"; labels: { preview: string; props: string } } = $props();
	function seed(): Record<string, unknown> {
		return { ...(seeds[name] ?? {}) };
	}
	let values = $state<Record<string, unknown>>(seed());
	let entry = $derived(notes[name] ?? {});
</script>

<article id={name.toLowerCase()}>
	<Board title={name} brief={labels.preview}>
		<Realm {name} {values} {tone} />
		<p><code>{labels.props}</code></p>
		<Knobs {entry} {values} {locale} change={(prop, next) => (values[prop] = next)} />
	</Board>
	<br />
</article>
