<script lang="ts">
	import { Bay, Skin } from "@perish/bone";
	import type { Snippet } from "svelte";
	import "./Banner.scss";

	let {
		mark,
		title,
		line,
		look = "plain",
		stick = false,
		children,
	}: {
		mark?: string;
		title: string;
		line?: string;
		look?: "plain" | "exact";
		stick?: boolean;
		children?: Snippet;
	} = $props();
</script>

<Bay part={stick ? "banner-bay banner-band" : "banner-bay"} {stick} drive={stick}>
	<Skin part="banner-skin" drive={stick}>
		<header class="banner banner-{look}">{#if mark}<span class="mark" aria-hidden="true">{mark}</span>{/if}<div><h1>{title}</h1>{#if line}<p>{line}</p>{/if}</div>{#if children}<nav>{@render children()}</nav>{/if}</header>
	</Skin>
</Bay>
