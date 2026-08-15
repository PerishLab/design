<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Course.scss";

	let {
		look = "plain",
		children,
	}: {
		look?: "bare" | "plain" | "raise" | "well";
		children: Snippet;
	} = $props();
</script>

<div class="course course-{look}"><div class="course-body">{@render children()}</div></div>
