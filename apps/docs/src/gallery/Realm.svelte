<script lang="ts">
	import { Shell, Stage } from "@perishlab/design";
	import Sample from "./Sample.svelte";

	let {
		name,
		values,
		tone,
		system,
		look,
		slide,
		label,
		meta,
	}: {
		name: string;
		values: Record<string, unknown>;
		tone?: "light" | "dark";
		system: string;
		look?: "view" | "strip" | "pane" | "show";
		slide?: number;
		label?: string;
		meta?: string;
	} = $props();
</script>

<Shell {tone} {slide} system={system === "base" ? undefined : system}>
	<Stage {look} {label} {meta}><Sample {name} {values} /></Stage>
</Shell>
