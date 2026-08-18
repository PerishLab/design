<script lang="ts">
	import Sign from "../../mark/Sign/Sign.svelte";
	import Tip from "../Tip/Tip.svelte";
	import "./Menu.scss";

	let {
		label,
		items,
		value = $bindable(""),
		sign,
		look = "cue",
		open = $bindable(false),
		choose,
	}: {
		label: string;
		items: { value: string; label: string }[];
		value?: string;
		sign?: string;
		look?: "cue" | "bare";
		open?: boolean;
		choose?: (next: string) => void;
	} = $props();

	let seat: HTMLElement | undefined = $state();

	function take(next: string): void {
		open = false;
		value = next;
		choose?.(next);
	}

	function shut(event: Event): void {
		if (seat !== undefined && !seat.contains(event.target as Node)) open = false;
	}

	function quit(event: KeyboardEvent): void {
		if (event.key === "Escape") open = false;
	}

	$effect(() => {
		if (!open) return () => {};
		globalThis.addEventListener("pointerdown", shut);
		globalThis.addEventListener("keydown", quit);
		return () => {
			globalThis.removeEventListener("pointerdown", shut);
			globalThis.removeEventListener("keydown", quit);
		};
	});
</script>

<div class="menu menu-{look}" bind:this={seat}>
	<Tip text={label} look="under">
		<button class="menu-cue" type="button" aria-label={label} aria-haspopup="menu" aria-expanded={open} onclick={() => (open = !open)}>{#if sign}<Sign name={sign} />{/if}<span class="menu-word">{label}</span></button>
	</Tip>
	{#if open}<ul class="menu-list" role="menu" aria-label={label}>{#each items as item (item.value)}<li role="none"><button class="menu-item" class:live={item.value === value} type="button" role="menuitemradio" aria-checked={item.value === value} onclick={() => take(item.value)}><span>{item.label}</span>{#if item.value === value}<Sign name="tick" />{/if}</button></li>{/each}</ul>{/if}
</div>
