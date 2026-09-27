<script lang="ts">
	import { Board, Fold } from "@perishlab/design";
	import { kinds } from "../docs/kinds.ts";
	import { seeds } from "../docs/samples.ts";
	import Knobs from "../knobs/Knobs.svelte";
	import { speak } from "../lib/i18n/index.ts";
	import Realm from "./Realm.svelte";

	let {
		name,
		tone,
		system,
	}: {
		name: string;
		tone?: "light" | "dark";
		system: string;
	} = $props();
	const t = speak();
	function seed(): Record<string, unknown> {
		return { ...(seeds[name] ?? {}) };
	}
	let values = $state<Record<string, unknown>>(seed());
	let entry = $derived(kinds[name] ?? {});
</script>

<Board title={name} seat={name.toLowerCase()}>
	<Realm {name} {values} {tone} {system} />
	<Fold label={t("gallery.props")}>
		<Knobs {name} {entry} {values} change={(prop, next) => (values[prop] = next)} />
	</Fold>
</Board>
