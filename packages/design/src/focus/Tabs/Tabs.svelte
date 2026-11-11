<script lang="ts">
	import { tick, type Snippet } from "svelte";
	import "./Tabs.scss";

	const id = $props.id();
	let {
		tabs,
		label,
		children,
		value = $bindable(""),
		change,
		beat,
	}: {
		tabs: { value: string; label: string }[];
		label?: string;
		children?: Snippet<[string]>;
		value?: string;
		change?: (next: string) => void;
		beat?: number;
	} = $props();

	const chosen = $derived(tabs.some(tab => tab.value === value) ? value : tabs[0]?.value ?? "");
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
		if (tabs.length === 0) return;
		const at = tabs.findIndex((tab) => tab.value === value);
		say(tabs[(at + 1) % tabs.length].value);
	}

 function key(event: KeyboardEvent): void {
  if (tabs.length === 0) return;
  const at = tabs.findIndex(tab => tab.value === chosen);
  const places: { [key: string]: number } = { ArrowRight: at + 1, ArrowLeft: at - 1, Home: 0, End: tabs.length - 1 };
  const place = places[event.key];
  if (place === undefined) return;
  event.preventDefault();
  const next = (place + tabs.length) % tabs.length;
  take(tabs[next].value);
  void tick().then(() => rail.querySelectorAll<HTMLButtonElement>(".tabs-one")[next]?.focus());
 }

	$effect(() => {
		if (beat === undefined || held || calm()) return () => {};
		const clock = setInterval(onward, beat);
		return () => clearInterval(clock);
	});
</script>

<div class="tabs" role="tablist" aria-label={label} bind:this={rail}>
 {#each tabs as tab, at (tab.value)}<button class="tabs-one" id={`${id}-${at}`} class:live={tab.value === chosen} type="button" role="tab" aria-controls={children ? `${id}-panel` : undefined} aria-selected={tab.value === chosen} tabindex={tab.value === chosen ? 0 : -1} onclick={() => take(tab.value)} onkeydown={key}>{tab.label}</button>{/each}
</div>
{#if children && tabs.length > 0}<div class="tabs-panel" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${tabs.findIndex(tab => tab.value === chosen)}`} tabindex="0">{@render children(chosen)}</div>{/if}
