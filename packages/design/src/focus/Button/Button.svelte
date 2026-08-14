<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Button.scss";

	let {
		children,
		label = "",
		press = () => {},
		look = "solid",
		wide = false,
		busy = false,
		halt = false,
		submit = false,
	}: {
		children?: Snippet;
		label?: string;
		press?: () => void;
		look?: "solid" | "quiet";
		wide?: boolean;
		busy?: boolean;
		halt?: boolean;
		submit?: boolean;
	} = $props();
</script>

<button type={submit ? "submit" : "button"} class:button-wide={wide} class="button button-{look}" disabled={busy || halt} aria-busy={busy} onclick={press}>
	{#if children}{@render children()}{:else}{label}{/if}
</button>
