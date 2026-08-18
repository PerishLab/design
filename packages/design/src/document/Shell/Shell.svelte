<script lang="ts">
	import type { Snippet } from "svelte";
	import { wear } from "../../worn.ts";
	import "./Shell.scss";

	let { children, tone, system, slide }: { children: Snippet; tone?: "light" | "dark"; system?: string; slide?: number } = $props();

	wear(() => system);
</script>

<div class="shell" data-tone={tone} data-system={system} data-slide={slide === undefined ? undefined : ""} style:--slid={slide === undefined ? null : `${slide}ms`}>{@render children()}</div>
