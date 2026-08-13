<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Button.scss";

	let {
		children,
		label = "",
		press = () => {},
		tone = "solid",
		wide = false,
		busy = false,
		submit = false,
	}: {
		children?: Snippet;
		label?: string;
		press?: () => void;
		tone?: "solid" | "quiet";
		wide?: boolean;
		busy?: boolean;
		submit?: boolean;
	} = $props();
</script>

<button type={submit ? "submit" : "button"} class:button-wide={wide} class="button button-{tone}" disabled={busy} aria-busy={busy} onclick={press}>
	{#if children}{@render children()}{:else}{label}{/if}
</button>
