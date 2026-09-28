<script lang="ts">
	import { tick } from "svelte";
	import "./Tabs.scss";

	let {
		tabs,
		value = $bindable(""),
		change,
		beat,
	}: {
		tabs: { value: string; label: string }[];
		value?: string;
		change?: (next: string) => void;
		beat?: number;
	} = $props();

	let held = $state(false);
	let rail: HTMLDivElement;

	function show(): void {
		const tab = rail.querySelector<HTMLElement>('[aria-selected="true"]');
		if (!tab) return;
		const start = tab.offsetLeft;
		const end = start + tab.offsetWidth;
		const near = rail.scrollLeft;
		const far = near + rail.clientWidth;
		if (start < near) rail.scrollTo({ left: start, behavior: calm() ? "auto" : "smooth" });
		if (end > far) rail.scrollTo({ left: end - rail.clientWidth, behavior: calm() ? "auto" : "smooth" });
	}

	function say(next: string): void {
		value = next;
		change?.(next);
		void tick().then(show);
	}

	function take(next: string): void {
		held = true;
		say(next);
	}

	function calm(): boolean {
		return globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
	}

	function onward(): void {
		const at = tabs.findIndex((tab) => tab.value === value);
		say(tabs[(at + 1) % tabs.length].value);
	}

	$effect(() => {
		if (beat === undefined || held || calm()) return () => {};
		const clock = setInterval(onward, beat);
		return () => clearInterval(clock);
	});
</script>

<div class="tabs" role="tablist" bind:this={rail}>
	{#each tabs as tab (tab.value)}<button class="tabs-one" class:live={tab.value === value} type="button" role="tab" aria-selected={tab.value === value} tabindex={tab.value === value ? 0 : -1} onclick={() => take(tab.value)}>{tab.label}</button>{/each}
</div>
