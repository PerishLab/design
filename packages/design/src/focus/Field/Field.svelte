<script lang="ts">
	import "./Field.scss";

	let {
		label,
		value = $bindable(""),
		change,
		kind = "text",
		hint,
	}: {
		label: string;
		value?: string;
		change?: (next: string) => void;
		kind?: "text" | "password";
		hint?: string;
	} = $props();

	function take(next: string): void {
		value = next;
		change?.(next);
	}
</script>

<label class="field">
	<span class="field-label">{label}</span>
	<input class="field-input" type={kind} {value} placeholder={hint} autocomplete="off" oninput={(event) => take(event.currentTarget.value)} />
</label>
