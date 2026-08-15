<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Bay.scss";

	let {
		part,
		stick = false,
		drive = false,
		children,
	}: {
		part: string;
		stick?: boolean;
		drive?: boolean;
		children: Snippet;
	} = $props();
</script>

<div class="bay {part}" class:bay-stick={stick} class:bay-drive={drive}>{@render children()}</div>
