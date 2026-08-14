<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Footer.scss";

	let { text, children }: { text?: string; children?: Snippet } = $props();
</script>

<footer class="footer">{#if text}<span>{text}</span>{/if}{#if children}<nav>{@render children()}</nav>{/if}</footer>
