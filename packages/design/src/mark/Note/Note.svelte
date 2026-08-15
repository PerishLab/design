<script lang="ts">
	import Sign from "../Sign/Sign.svelte";
	import "./Note.scss";

	let { text, mood = "calm" }: { text: string; mood?: "warn" | "calm" } =
		$props();
</script>

<p class="note note-{mood}">{#if mood === "warn"}<Sign name="warn" />{/if}{text}</p>
