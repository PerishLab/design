<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Sheet.scss";

	let { children, lead, foot, look = "plain" }: {
		children: Snippet; lead?: Snippet; foot?: Snippet;
		look?: "plain" | "spread";
	} = $props();
</script>

<section class="sheet sheet-{look}">
	{#if lead}<div class="sheet-lead">{@render lead()}</div>{/if}
	{#if look === "spread"}<div class="sheet-content">{@render children()}</div>{:else}{@render children()}{/if}
	{#if foot}<div class="sheet-foot">{@render foot()}</div>{/if}
</section>
