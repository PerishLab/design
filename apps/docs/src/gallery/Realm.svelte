<script lang="ts">
	import { Shell } from "@perish/design";
	import Stage from "./Stage.svelte";

	let {
		name,
		values,
		tone,
		system,
	}: {
		name: string;
		values: Record<string, unknown>;
		tone: "light" | "dark";
		system: string;
	} = $props();
</script>

<Shell {tone} system={system === "base" ? undefined : system}>
	<Stage {name} {values} />
</Shell>
