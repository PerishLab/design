<script lang="ts">
	import Sign from "../../mark/Sign/Sign.svelte";
	import "./Search.scss";

	let {
		value = $bindable(""),
		change,
		hint,
		label,
	}: {
		value?: string;
		change?: (next: string) => void;
		hint?: string;
		label?: string;
	} = $props();

	function take(next: string): void {
		value = next;
		change?.(next);
	}
</script>

<span class="search"><Sign name="find" /><input class="search-input" type="search" aria-label={label ?? hint} {value} placeholder={hint} oninput={(event) => take(event.currentTarget.value)} /></span>
