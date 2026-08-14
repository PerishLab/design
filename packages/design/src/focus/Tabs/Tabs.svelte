<script lang="ts">
	import "./Tabs.scss";

	let {
		tabs,
		value = $bindable(""),
		change,
	}: {
		tabs: { value: string; label: string }[];
		value?: string;
		change?: (next: string) => void;
	} = $props();

	function take(next: string): void {
		value = next;
		change?.(next);
	}
</script>

<div class="tabs" role="tablist">
	{#each tabs as tab (tab.value)}<button class="tabs-one" class:live={tab.value === value} type="button" role="tab" aria-selected={tab.value === value} tabindex={tab.value === value ? 0 : -1} onclick={() => take(tab.value)}>{tab.label}</button>{/each}
</div>
