<script lang="ts">
	import { Board } from "@perish/design";
	import { notes } from "../docs/notes/lib.ts";
	import { seeds } from "../docs/samples.ts";
	import Knobs from "../knobs/Knobs.svelte";
	import Realm from "./Realm.svelte";

	let { name, locale, tone, system, labels }: { name: string; locale: "en" | "zh"; tone: "light" | "dark"; system: string; labels: { preview: string; props: string } } = $props();
	function seed(): Record<string, unknown> {
		return { ...(seeds[name] ?? {}) };
	}
	let values = $state<Record<string, unknown>>(seed());
	let entry = $derived(notes[name] ?? {});
</script>

<article id={name.toLowerCase()}>
	<Board title={name} line={labels.preview}>
		<Realm {name} {values} {tone} {system} />
		<p><code>{labels.props}</code></p>
		<Knobs {entry} {values} {locale} change={(prop, next) => (values[prop] = next)} />
	</Board>
	<br />
</article>
