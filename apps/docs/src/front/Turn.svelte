<script lang="ts">
	import Realm from "../gallery/Realm.svelte";

	let {
		name,
		tone,
		voices,
		beat,
		fade,
		values,
	}: {
		name: string;
		tone?: "light" | "dark";
		voices: string[];
		beat: number;
		fade: number;
		values: Record<string, unknown>;
	} = $props();

	let at = $state(0);
	let shown = $state(true);
	let voice = $derived(voices[at] ?? "base");
	let clock: ReturnType<typeof setTimeout>;
	let stopped = false;

	const schedule = () => {
		clock = setTimeout(() => {
			shown = false;
		}, beat);
	};

	const settled = () => {
		if (shown) {
			schedule();
			return;
		}

		at = (at + 1) % voices.length;
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				if (!stopped) shown = true;
			});
		});
	};

	$effect(() => {
		if (globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true)
			return () => {};

		stopped = false;
		schedule();
		return () => {
			stopped = true;
			clearTimeout(clock);
		};
	});
</script>

<Realm {name} {values} {tone} {fade} {shown} {settled} look="open" system={voice} />
