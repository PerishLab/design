<script lang="ts">
	import type { Snippet } from "svelte";
	import { wear } from "../../worn.js";
	import "./Shell.scss";

	let {
		children,
		tone,
		system,
		slide,
		fade,
		shown = true,
		settled,
	}: {
		children: Snippet;
		tone?: "light" | "dark";
		system?: string;
		slide?: number;
		fade?: number;
		shown?: boolean;
		settled?: () => void;
	} = $props();

	wear(() => system);
</script>

<div
	class="shell"
	data-tone={tone}
	data-system={system}
	data-slide={slide === undefined ? undefined : ""}
	data-fade={fade === undefined ? undefined : ""}
	data-hidden={shown ? undefined : ""}
	aria-hidden={shown ? undefined : "true"}
	inert={!shown}
	style:--slid={slide === undefined ? null : `${slide}ms`}
	style:--faded={fade === undefined ? null : `${fade}ms`}
	ontransitionend={(event) => {
		if (event.target === event.currentTarget && event.propertyName === "opacity")
			settled?.();
	}}
>{@render children()}</div>
