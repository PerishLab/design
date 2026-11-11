<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Modal.scss";

	let {
		title,
		open = $bindable(false),
		children,
		dismiss = true,
	}: {
		title: string;
		open?: boolean;
		children: Snippet;
		dismiss?: boolean;
	} = $props();
	let node = $state<HTMLDialogElement>();

 function backdrop(event: MouseEvent): void {
  if (!dismiss || event.target !== node) return;
  const rect = node.getBoundingClientRect();
  const bounds = [{ value: event.clientX, low: rect.left, high: rect.right }, { value: event.clientY, low: rect.top, high: rect.bottom }];
  const inside = bounds.every(axis => axis.value >= axis.low && axis.value <= axis.high);
  if (!inside) open = false;
 }

 function trap(event: KeyboardEvent): void {
  if (event.key !== "Tab" || node === undefined) return;
  const nodes = [...node.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])')].filter(item => item.getClientRects().length > 0 && item.tabIndex >= 0);
  if (nodes.length === 0) { event.preventDefault(); node.focus(); return; }
  const edge = event.shiftKey ? nodes[0] : nodes[nodes.length - 1];
  if (document.activeElement !== edge) return;
  event.preventDefault(); (event.shiftKey ? nodes[nodes.length - 1] : nodes[0]).focus();
 }
 $effect(() => {
  if (!open) return () => {};
  globalThis.addEventListener("keydown", trap);
  return () => globalThis.removeEventListener("keydown", trap);
 });

	$effect(() => {
		if (node === undefined) return;
		if (open && !node.open) node.showModal();
		if (!open && node.open) node.close();
	});
</script>

<dialog bind:this={node} class="modal" aria-label={title} onclose={() => (open = false)} oncancel={(event) => { if (!dismiss) event.preventDefault(); }} onclick={backdrop}>
	<header class="modal-head">{title}</header>
	<div class="modal-body">{@render children()}</div>
</dialog>
