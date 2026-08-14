<script lang="ts">
	import "./Search.scss";

	let {
		value = $bindable(""),
		change,
		hint,
	}: {
		value?: string;
		change?: (next: string) => void;
		hint?: string;
	} = $props();

	function take(next: string): void {
		value = next;
		change?.(next);
	}
</script>

<input class="search" type="search" {value} placeholder={hint} oninput={(event) => take(event.currentTarget.value)} />
