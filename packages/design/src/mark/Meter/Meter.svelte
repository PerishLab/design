<script lang="ts">
	import "./Meter.scss";

	let { label, value }: { label: string; value?: number } = $props();
	let held = $derived(value === undefined ? undefined : Math.min(1, Math.max(0, value)));
</script>

<div class="meter" role="progressbar" aria-label={label} aria-valuenow={held === undefined ? undefined : Math.round(held * 100)}>
	<div class="meter-fill" class:waiting={held === undefined} style:width={held === undefined ? null : `${held * 100}%`}></div>
</div>
