<script lang="ts">
	import { mount } from "svelte";
	import Stage from "./Stage.svelte";

	let { name, values, tone }: { name: string; values: Record<string, unknown>; tone: "light" | "dark" } = $props();
	let frame: HTMLIFrameElement;
	function sync(): void {
		const root = frame?.contentDocument?.documentElement;
		if (!root) return;
		root.dataset.tone = tone;
	}
	function load(): void {
		const doc = frame.contentDocument;
		if (!doc) return;
		for (const node of document.head.querySelectorAll('style, link[rel="stylesheet"]')) doc.head.append(node.cloneNode(true));
		sync();
		mount(Stage, { target: doc.body, props: { name, values } });
	}
	$effect(() => {
		tone;
		sync();
	});
</script>

<iframe bind:this={frame} title={`${name} isolated preview`} width="100%" height="224" frameborder="0" srcdoc="<!doctype html><html><head><meta charset='utf-8'></head><body></body></html>" onload={load}></iframe>
