<script lang="ts">
	import { Tabs } from "@perishlab/design";
	import { seeds } from "../docs/samples.ts";
	import Realm from "../gallery/Realm.svelte";

	let {
		name,
		tone,
		voices,
		beat,
		slide,
	}: {
		name: string;
		tone?: "light" | "dark";
		voices: string[];
		beat: number;
		slide: number;
	} = $props();

	let voice = $state(voices[0]);
	let stops = $derived(voices.map((one) => ({ value: one, label: one })));
	let values = $derived({ ...(seeds[name] ?? {}) });
</script>

<Tabs tabs={stops} bind:value={voice} {beat} />
<Realm {name} {values} {tone} {slide} look="strip" system={voice} />
