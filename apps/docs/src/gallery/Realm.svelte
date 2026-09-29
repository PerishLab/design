<script lang="ts">
	import { Shell, Stage } from "@perishlab/design";
	import Sample from "./Sample.svelte";

	let {
		name,
		values,
		tone,
		system,
		look,
		bare = false,
		slide,
		label,
		meta,
	}: {
		name: string;
		values: Record<string, unknown>;
		tone?: "light" | "dark";
		system: string;
		look?: "view" | "strip" | "pane" | "show";
		bare?: boolean;
		slide?: number;
		label?: string;
		meta?: string;
	} = $props();
</script>

<Shell {tone} {slide} system={system === "base" ? undefined : system}>
	{#if bare}<Sample {name} {values} />{:else}<Stage {look} {label} {meta}><Sample {name} {values} /></Stage>{/if}
</Shell>
