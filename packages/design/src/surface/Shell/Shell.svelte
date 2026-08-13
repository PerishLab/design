<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Shell.scss";

	let { children, tone }: { children: Snippet; tone?: "light" | "dark" } = $props();
</script>

<div class="shell" data-tone={tone}>{@render children()}</div>
