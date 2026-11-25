<script lang="ts">
	import type { Snippet } from "svelte";
	import Sign from "../../mark/Sign/Sign.svelte";
	import "./Button.scss";

	let {
		children,
		label = "",
		name,
		href,
		press = () => {},
		look = "solid",
		mood = "calm",
		wide = false,
		busy = false,
		halt = false,
		submit = false,
		sign,
	}: {
		children?: Snippet;
		label?: string;
		name?: string;
		href?: string;
		press?: () => void;
		look?: "solid" | "quiet" | "portal" | "text";
		mood?: "calm" | "warn";
		wide?: boolean;
		busy?: boolean;
		halt?: boolean;
		submit?: boolean;
		sign?: string;
	} = $props();
	let icon = $derived(children === undefined && label === "" && sign !== undefined);
</script>

{#snippet said()}{#if children}{@render children()}{:else}{label}{/if}{#if sign}<Sign name={sign} />{/if}{/snippet}

{#if href}<a {href} aria-label={name} class:button-wide={wide} class:button-warn={mood === "warn"} class:button-icon={icon} class="button button-{look}">{@render said()}</a>
{:else}<button type={submit ? "submit" : "button"} aria-label={name} class:button-wide={wide} class:button-warn={mood === "warn"} class:button-icon={icon} class="button button-{look}" disabled={busy || halt} aria-busy={busy} onclick={press}>{@render said()}</button>
{/if}
