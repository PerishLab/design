<script lang="ts">
	import type { Snippet } from "svelte";
	import Sign from "../../mark/Sign/Sign.svelte";
	import "./Fold.scss";

	let {
		label,
		open = $bindable(false),
		children,
	}: {
		label: string;
		open?: boolean;
		children: Snippet;
	} = $props();
</script>

<details class="fold" {open} ontoggle={(event) => (open = event.currentTarget.open)}>
	<summary class="fold-cue"><Sign name="fold" />{label}</summary>
	<div class="fold-body">{@render children()}</div>
</details>
