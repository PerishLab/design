<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Skin.scss";

	let {
		part,
		drive = false,
		children,
	}: {
		part: string;
		drive?: boolean;
		children: Snippet;
	} = $props();
</script>

<div class="skin {part}" class:skin-drive={drive}>{@render children()}</div>
