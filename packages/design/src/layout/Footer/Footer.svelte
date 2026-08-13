<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Footer.scss";

	let { children }: { children?: Snippet } = $props();
</script>

<footer class="footer"><span>a PerishLab workshop — this site is MIT and guarded by its own constitution.</span>{#if children}<nav>{@render children()}</nav>{/if}</footer>
