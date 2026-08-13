<script lang="ts">
	import "./Tag.scss";

	let { text, tone = "calm" }: { text: string; tone?: "warn" | "calm" } = $props();
</script>

<span class="tag tag-{tone}">{text}</span>
