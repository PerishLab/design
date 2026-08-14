<script lang="ts">
	import "./Note.scss";

	let { text, mood = "calm" }: { text: string; mood?: "warn" | "calm" } =
		$props();
</script>

<p class="note note-{mood}">{text}</p>
