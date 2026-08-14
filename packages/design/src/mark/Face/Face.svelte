<script lang="ts">
	import "./Face.scss";

	let { name, src }: { name: string; src?: string } = $props();
	let mark = $derived(
		name
			.split(" ")
			.map((one) => one.slice(0, 1))
			.join("")
			.slice(0, 2)
			.toUpperCase(),
	);
</script>

{#if src}<img class="face" {src} alt={name} />{:else}<span class="face" aria-label={name} role="img">{mark}</span>{/if}
