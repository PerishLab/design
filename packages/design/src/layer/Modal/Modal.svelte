<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Modal.scss";

	let {
		title,
		open = $bindable(false),
		children,
	}: {
		title: string;
		open?: boolean;
		children: Snippet;
	} = $props();
	let node = $state<HTMLDialogElement>();

	$effect(() => {
		if (node === undefined) return;
		if (open && !node.open) node.showModal();
		if (!open && node.open) node.close();
	});
</script>

<dialog bind:this={node} class="modal" aria-label={title} onclose={() => (open = false)} onclick={(event) => { if (event.target === node) open = false; }}>
	<header class="modal-head">{title}</header>
	<div class="modal-body">{@render children()}</div>
</dialog>
