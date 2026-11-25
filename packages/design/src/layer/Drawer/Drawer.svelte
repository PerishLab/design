<script lang="ts">
	import type { Snippet } from "svelte";
	import Sign from "../../mark/Sign/Sign.svelte";
	import "./Drawer.scss";

	const id = $props.id();
	let {
		title,
		line,
		open = $bindable(false),
		dismiss = true,
		side,
		foot,
		children,
	}: {
		title: string;
		line?: string;
		open?: boolean;
		dismiss?: boolean;
		side?: Snippet;
		foot?: Snippet;
		children: Snippet;
	} = $props();
	let node = $state<HTMLDialogElement>();

	function backdrop(event: MouseEvent): void {
		if (!dismiss || event.target !== node) return;
		const rect = node.getBoundingClientRect();
		const bounds = [
			{ value: event.clientX, low: rect.left, high: rect.right },
			{ value: event.clientY, low: rect.top, high: rect.bottom },
		];
		const inside = bounds.every((axis) => axis.value >= axis.low && axis.value <= axis.high);
		if (!inside) open = false;
	}

	function trap(event: KeyboardEvent): void {
		if (event.key !== "Tab" || node === undefined) return;
		const selector =
			'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';
		const nodes = [...node.querySelectorAll<HTMLElement>(selector)].filter(
			(item) => item.getClientRects().length > 0 && item.tabIndex >= 0,
		);
		if (nodes.length === 0) {
			event.preventDefault();
			node.focus();
			return;
		}
		const edge = event.shiftKey ? nodes[0] : nodes[nodes.length - 1];
		if (document.activeElement !== edge) return;
		event.preventDefault();
		(event.shiftKey ? nodes[nodes.length - 1] : nodes[0]).focus();
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

<dialog bind:this={node} class="drawer" tabindex="-1" aria-labelledby={`${id}-title`} onclose={() => (open = false)} oncancel={(event) => { if (!dismiss) event.preventDefault(); }} onclick={backdrop}>
	<div class="drawer-shell">
		<header class="drawer-head">
			<div class="drawer-copy">
				<h2 class="drawer-title" id={`${id}-title`}>{title}</h2>
				{#if line}<p class="drawer-line">{line}</p>{/if}
			</div>
			<div class="drawer-side">
				{#if side}{@render side()}{/if}
				{#if dismiss}<button class="drawer-shut" type="button" aria-label="Close" onclick={() => (open = false)}><Sign name="shut" /></button>{/if}
			</div>
		</header>
		<div class="drawer-body">{@render children()}</div>
		{#if foot}<footer class="drawer-foot">{@render foot()}</footer>{/if}
	</div>
</dialog>
