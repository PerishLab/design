<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Shell.scss";

	let { children, tone, system }: { children: Snippet; tone?: "light" | "dark"; system?: string } = $props();
</script>

<div class="shell" data-tone={tone} data-system={system}>{@render children()}</div>
