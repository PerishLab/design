<script lang="ts">
	import type { Snippet } from "svelte";
	import Sign from "../../mark/Sign/Sign.svelte";
	import "./Button.scss";

	let {
		children,
		label = "",
		href,
		press = () => {},
		look = "solid",
		wide = false,
		busy = false,
		halt = false,
		submit = false,
		sign,
	}: {
		children?: Snippet;
		label?: string;
		href?: string;
		press?: () => void;
		look?: "solid" | "quiet";
		wide?: boolean;
		busy?: boolean;
		halt?: boolean;
		submit?: boolean;
		sign?: string;
	} = $props();
</script>

{#snippet said()}{#if children}{@render children()}{:else}{label}{/if}{#if sign}<Sign name={sign} />{/if}{/snippet}

{#if href}<a {href} class:button-wide={wide} class="button button-{look}">{@render said()}</a>
{:else}<button type={submit ? "submit" : "button"} class:button-wide={wide} class="button button-{look}" disabled={busy || halt} aria-busy={busy} onclick={press}>{@render said()}</button>
{/if}
