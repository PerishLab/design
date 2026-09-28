<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Course.scss";

	let {
		look = "plain",
		full = false,
		children,
	}: {
		look?: "bare" | "plain" | "raise" | "well";
		full?: boolean;
		children: Snippet;
	} = $props();
</script>

<div class:course-full={full} class="course course-{look}"><div class="course-body">{@render children()}</div></div>
