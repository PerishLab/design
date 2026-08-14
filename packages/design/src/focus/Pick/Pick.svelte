<script lang="ts">
	import "./Pick.scss";

	let {
		label,
		value = $bindable(""),
		choices,
		change,
	}: {
		label: string;
		value?: string;
		choices: { value: string; label: string }[];
		change?: (next: string) => void;
	} = $props();

	function take(next: string): void {
		value = next;
		change?.(next);
	}
</script>

<label class="pick">
	<span class="pick-label">{label}</span>
	<select class="pick-input" {value} onchange={(event) => take(event.currentTarget.value)}>
		{#each choices as choice (choice.value)}<option value={choice.value}>{choice.label}</option>{/each}
	</select>
</label>
