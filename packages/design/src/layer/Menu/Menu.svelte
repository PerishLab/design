<script lang="ts">
	import "./Menu.scss";

	let {
		label,
		items,
		open = $bindable(false),
		choose,
	}: {
		label: string;
		items: { value: string; label: string }[];
		open?: boolean;
		choose?: (next: string) => void;
	} = $props();

	function take(next: string): void {
		open = false;
		choose?.(next);
	}
</script>

<div class="menu">
	<button class="menu-cue" type="button" aria-expanded={open} onclick={() => (open = !open)}>{label}</button>
	{#if open}
		<ul class="menu-list" role="menu">
			{#each items as item (item.value)}<li role="none"><button class="menu-item" type="button" role="menuitem" onclick={() => take(item.value)}>{item.label}</button></li>{/each}
		</ul>
	{/if}
</div>
