<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Tip.scss";

	let { text, children }: { text: string; children: Snippet } = $props();
</script>

<span class="tip">{@render children()}<span class="tip-note" role="tooltip">{text}</span></span>
