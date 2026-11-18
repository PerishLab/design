<script lang="ts">
	import Sign from "../Sign/Sign.svelte";
	import "./Note.scss";

	let { text, mood = "calm", live = false }: { text: string; mood?: "warn" | "calm"; live?: boolean } =
		$props();
</script>

<p class="note note-{mood}" role={live ? (mood === "warn" ? "alert" : "status") : undefined}>{#if mood === "warn"}<Sign name="warn" />{/if}{text}</p>
