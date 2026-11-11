<script lang="ts">
	import Sign from "../../mark/Sign/Sign.svelte";
	import "./Check.scss";

	let {
		label,
		disabled = false,
		held = $bindable(false),
		change,
		look = "box",
	}: {
		label: string;
		disabled?: boolean;
		held?: boolean;
		change?: (next: boolean) => void;
		look?: "box" | "switch";
	} = $props();

	function take(next: boolean): void {
		held = next;
		change?.(next);
	}
</script>

<label class="check check-{look}">
	<input {disabled} class="check-input" type="checkbox" role={look === "switch" ? "switch" : undefined} checked={held} onchange={(event) => take(event.currentTarget.checked)} />
	<span class="check-mark"><Sign name="tick" /></span>
	<span class="check-label">{label}</span>
</label>
