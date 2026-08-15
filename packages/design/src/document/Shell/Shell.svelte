<script lang="ts">
	import type { Snippet } from "svelte";
	import { wear } from "../../worn.ts";
	import "./Shell.scss";

	let { children, tone, system }: { children: Snippet; tone?: "light" | "dark"; system?: string } = $props();

	wear(() => system);
</script>

<div class="shell" data-tone={tone} data-system={system}>{@render children()}</div>
