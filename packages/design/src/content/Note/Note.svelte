<script lang="ts">
	import "./Note.scss";

	let { text, tone = "calm" }: { text: string; tone?: "warn" | "calm" } = $props();
</script>

<p class="note note-{tone}">{text}</p>
