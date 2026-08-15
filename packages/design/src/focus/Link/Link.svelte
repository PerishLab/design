<script lang="ts">
	import Sign from "../../mark/Sign/Sign.svelte";
	import "./Link.scss";

	let {
		label,
		href,
		look = "text",
	}: {
		label: string;
		href: string;
		look?: "text" | "nav";
	} = $props();
	let afar = $derived(href.startsWith("http"));
</script>

<a class="link link-{look}" {href}>{label}{#if afar}<Sign name="away" />{/if}</a>
