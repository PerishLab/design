<script lang="ts">
	import Sign from "../../mark/Sign/Sign.svelte";
	import "./Pick.scss";

	let {
		label,
		value = $bindable(""),
		choices,
		look = "field",
		change,
	}: {
		label: string;
		value?: string;
		choices: { value: string; label: string }[];
		look?: "field" | "bare";
		change?: (next: string) => void;
	} = $props();

	function take(next: string): void {
		value = next;
		change?.(next);
	}
</script>

<label class="pick pick-{look}">
	{#if look === "field"}<span class="pick-label">{label}</span>{/if}
	<span class="pick-slot">
		<select class="pick-input" aria-label={label} {value} onchange={(event) => take(event.currentTarget.value)}>
			{#each choices as choice (choice.value)}<option value={choice.value}>{choice.label}</option>{/each}
		</select>
		<Sign name="pick" />
	</span>
</label>
