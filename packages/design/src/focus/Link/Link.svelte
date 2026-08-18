<script lang="ts">
	import Sign from "../../mark/Sign/Sign.svelte";
	import "./Link.scss";

	let {
		label,
		href,
		look = "text",
		here = false,
	}: {
		label: string;
		href: string;
		look?: "text" | "nav";
		here?: boolean;
	} = $props();
	let afar = $derived(href.startsWith("http"));
</script>

<a class="link link-{look}" class:live={here} {href} aria-current={here ? "page" : undefined}>{label}{#if afar}<Sign name="away" />{/if}</a>
