<script lang="ts">
	import "./Sign.scss";
	import { sets } from "@perish/sign/sets";
	import { worn } from "../../worn.ts";

	let {
		name,
		label,
		look = "cue",
	}: { name: string; label?: string; look?: "cue" | "plate" } = $props();
	const heard = worn();
	let cut = $derived(sets[heard() ?? "base"] ?? sets.base);
	let strokes = $derived(cut.drawn[name] ?? []);
	let tinted = $derived(cut.lit?.[name] ?? []);
</script>

{#if strokes.length === 0}{:else if cut.cut === "text"}<span class="sign sign-text sign-{look} sign-{name}" aria-hidden={label === undefined ? "true" : undefined} aria-label={label} role={label === undefined ? undefined : "img"}>{strokes[0]}</span>{:else}<svg class="sign sign-{cut.cut} sign-{look} sign-{name}" viewBox="0 0 24 24" aria-hidden={label === undefined ? "true" : undefined} aria-label={label} role={label === undefined ? undefined : "img"}>{#each tinted as tint (tint)}<path class="lit" d={tint} />{/each}{#each strokes as stroke (stroke)}<path d={stroke} />{/each}</svg>{/if}
