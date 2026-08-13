<script lang="ts">
	import "./Search.scss";

	let { value, change, hint }: { value: string; change: (next: string) => void; hint?: string } = $props();
</script>

<input class="search" type="search" {value} placeholder={hint} oninput={(event) => change(event.currentTarget.value)} />
