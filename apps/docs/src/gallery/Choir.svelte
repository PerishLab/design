<script lang="ts">
	import { Board, Cell, Grid } from "@perishlab/design";
	import { seeds } from "../docs/samples.ts";
	import Realm from "./Realm.svelte";

	let {
		name,
		tone,
		voices,
		cols,
		look,
	}: {
		name: string;
		tone?: "light" | "dark";
		voices: string[];
		cols?: number;
		look?: "view" | "strip" | "pane";
	} = $props();
	let values = $derived({ ...(seeds[name] ?? {}) });
</script>

<Grid {cols}>
	{#each voices as voice (voice)}
		<Cell><Board title={voice} look={look === "pane" ? "flush" : "held"}><Realm {name} {values} {tone} {look} system={voice} /></Board></Cell>
	{/each}
</Grid>
