<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Tip.scss";

	let {
		text,
		look = "over",
		children,
	}: { text: string; look?: "over" | "under"; children: Snippet } = $props();
</script>

<span class="tip tip-{look}">{@render children()}<span class="tip-note" role="tooltip">{text}</span></span>
