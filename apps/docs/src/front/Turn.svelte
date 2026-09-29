<script lang="ts">
	import Realm from "../gallery/Realm.svelte";

	let {
		name,
		tone,
		voices,
		beat,
		slide,
		values,
	}: {
		name: string;
		tone?: "light" | "dark";
		voices: string[];
		beat: number;
		slide: number;
		values: Record<string, unknown>;
	} = $props();

	let at = $state(0);
	let voice = $derived(voices[at] ?? "base");

	$effect(() => {
		if (globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true)
			return () => {};
		const clock = setInterval(() => {
			at = (at + 1) % voices.length;
		}, beat);
		return () => clearInterval(clock);
	});
</script>

<Realm {name} {values} {tone} {slide} look="show" system={voice} />
