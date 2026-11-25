<script lang="ts">
	import type { Snippet } from "svelte";
	import Sign from "../../mark/Sign/Sign.svelte";
	import "./Aside.scss";

	let {
		side,
		under = false,
		open = $bindable(false),
		rail = false,
		label = "Navigation",
		children,
	}: {
		side: Snippet;
		under?: boolean;
		open?: boolean;
		rail?: boolean;
		label?: string;
		children: Snippet;
	} = $props();

	function quit(event: KeyboardEvent): void {
		if (event.key === "Escape") open = false;
	}

	$effect(() => {
		if (!open) return () => {};
		globalThis.addEventListener("keydown", quit);
		return () => globalThis.removeEventListener("keydown", quit);
	});
</script>

<div class="aside" class:aside-under={under} class:aside-rail={rail} class:aside-open={open}>
	{#if open}<button class="aside-veil" type="button" tabindex="-1" aria-label={label} onclick={() => (open = false)}></button>{/if}
	<div class="aside-side" role={open ? "dialog" : undefined} aria-label={open ? label : undefined}>
		{#if open}<div class="aside-bar"><span class="aside-name">{label}</span><button class="aside-shut" type="button" aria-label="Close" onclick={() => (open = false)}><Sign name="shut" /></button></div>{/if}
		{@render side()}
	</div>
	<div class="aside-main">{@render children()}</div>
</div>
