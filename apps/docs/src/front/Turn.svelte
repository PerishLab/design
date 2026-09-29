<script lang="ts">
	import { Grid, Tabs } from "@perishlab/design";
	import Realm from "../gallery/Realm.svelte";

	let {
		name,
		tone,
		voices,
		beat,
		slide,
		values,
	}: {
		name: string;
		tone?: "light" | "dark";
		voices: string[];
		beat: number;
		slide: number;
		values: Record<string, unknown>;
	} = $props();

	let voice = $derived(voices[0]);
	let stops = $derived(voices.map((one) => ({ value: one, label: one })));
	let at = $derived(voices.indexOf(voice));
	let mark = $derived(`${String(at + 1).padStart(2, "0")} / ${voices.length}`);
</script>

<Grid cols={1}>
	<Realm {name} {values} {tone} {slide} label={voice} meta={mark} look="show" system={voice} />
	<Tabs tabs={stops} bind:value={voice} {beat} />
</Grid>
