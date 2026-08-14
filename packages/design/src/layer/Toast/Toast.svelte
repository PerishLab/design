<script lang="ts">
	import "./Toast.scss";

	let { notes, mood = "calm" }: { notes: string[]; mood?: "warn" | "calm" } =
		$props();
</script>

<output class="toast toast-{mood}" aria-live="polite">
	{#each notes as note (note)}<span class="toast-note">{note}</span>{/each}
</output>
