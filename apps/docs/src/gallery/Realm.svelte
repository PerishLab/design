<script lang="ts">
	import { Shell, Stage } from "@perish/design";
	import Sample from "./Sample.svelte";

	let {
		name,
		values,
		tone,
		system,
		look,
		slide,
	}: {
		name: string;
		values: Record<string, unknown>;
		tone?: "light" | "dark";
		system: string;
		look?: "view" | "strip" | "pane";
		slide?: number;
	} = $props();
</script>

<Shell {tone} {slide} system={system === "base" ? undefined : system}>
	<Stage {look}><Sample {name} {values} /></Stage>
</Shell>
