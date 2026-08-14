<script lang="ts">
	import "./Tag.scss";

	let {
		text,
		mood = "calm",
		look = "solid",
	}: {
		text: string;
		mood?: "warn" | "calm";
		look?: "solid" | "quiet";
	} = $props();
</script>

<span class="tag tag-{look} tag-{mood}">{text}</span>
