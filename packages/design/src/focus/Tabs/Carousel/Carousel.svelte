<script lang="ts">
	import type { Snippet } from "svelte";
	import { cycle, move, type State } from "./model.js";
	import "./Carousel.scss";

	let {
		items,
		value = $bindable(""),
		label,
		pause,
		play,
		beat = 5000,
		lease = 300000,
		fade = 240,
		change,
		children,
	}: {
		items: { value: string; label: string }[];
		value?: string;
		label: string;
		pause: string;
		play: string;
		beat?: number;
		lease?: number;
		fade?: number;
		change?: (next: string) => void;
		children: Snippet<[string]>;
	} = $props();

	let rotation = $state<State>({ value: "", mode: "auto", left: 0 });
	let prior = $state("");
	let moving = $state(false);
	let hovered = $state(false);
	let visible = $state(true);
	let reduced = $state(false);
	let pointer = false;
	let stamp = 0;
	let dots: HTMLDivElement;
	const values = $derived(items.map((item) => item.value));
	const current = $derived.by(() => {
		if (rotation.value) return rotation.value;
		if (value) return value;
		return values[0] ?? "";
	});
	const timing = $derived({ values, dwell: beat, lease });

	function calm(): boolean {
		return globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
	}

	function commit(next: State): void {
		if (next.value !== current) {
			prior = current;
			moving = !calm();
			value = next.value;
			change?.(next.value);
		}
		rotation = next;
		if (!moving) prior = "";
	}

	function choose(next: string, by: "pointer" | "keyboard"): void {
		commit(cycle(rotation, { type: by, value: next }, timing));
	}

	function toggle(): void {
		if (reduced) return;
		commit(
			cycle(rotation, { type: rotation.mode === "paused" ? "resume" : "pause" }, timing),
		);
	}

	function focus(): void {
		if (pointer) return;
		commit(cycle(rotation, { type: "keyboard" }, timing));
	}

	function key(event: KeyboardEvent, at: number): void {
		if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(event.key)) return;
		const next = move(at, items.length, event.key);
		event.preventDefault();
		choose(items[next].value, "keyboard");
		requestAnimationFrame(() => dots.querySelector<HTMLElement>('[aria-selected="true"]')?.focus());
	}

	function sight(): void {
		visible = document.visibilityState === "visible";
		stamp = performance.now();
	}

	$effect(() => {
		if (rotation.value) return;
		const first = value || values[0] || "";
		rotation = { value: first, mode: calm() ? "paused" : "auto", left: beat };
	});

	$effect(() => {
		const query = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)");
		if (!query) return () => {};
		const preference = () => {
			reduced = query.matches;
			if (reduced && rotation.mode !== "paused")
				commit(cycle(rotation, { type: "pause" }, timing));
		};
		preference();
		query.addEventListener("change", preference);
		return () => query.removeEventListener("change", preference);
	});

	$effect(() => {
		if (typeof document === "undefined") return () => {};
		visible = document.visibilityState === "visible";
		stamp = performance.now();
		const clock = setInterval(() => {
			const now = performance.now();
			const elapsed = now - stamp;
			stamp = now;
			commit(
				cycle(rotation, { type: "elapse", by: elapsed, active: visible && !hovered && !reduced }, timing),
			);
		}, 200);
		document.addEventListener("visibilitychange", sight);
		return () => {
			clearInterval(clock);
			document.removeEventListener("visibilitychange", sight);
		};
	});
</script>

<section
	class="carousel"
	aria-label={label}
	aria-roledescription="carousel"
	onmouseenter={() => (hovered = true)}
	onmouseleave={() => (hovered = false)}
	onfocusin={focus}
>
	<div class="carousel-scene" aria-live={rotation.mode === "auto" ? "off" : "polite"} aria-atomic="true">
		{#if prior}<div class="carousel-layer carousel-out" aria-hidden="true" inert style:--carousel-fade={`${fade}ms`}>{@render children(prior)}</div>{/if}
		<div class="carousel-layer" class:carousel-in={moving} style:--carousel-fade={`${fade}ms`} onanimationend={() => { moving = false; prior = ""; }}>{@render children(current)}</div>
	</div>
	<div class="carousel-controls">
		<button class="carousel-toggle" type="button" aria-label={rotation.mode === "paused" ? play : pause} title={rotation.mode === "paused" ? play : pause} disabled={reduced} onpointerdown={() => (pointer = true)} onclick={() => { pointer = false; toggle(); }}>
			<span class:carousel-play={rotation.mode === "paused"} class:carousel-pause={rotation.mode !== "paused"} aria-hidden="true"></span>
		</button>
		<div class="carousel-dots" role="tablist" aria-label={label} bind:this={dots}>
			{#each items as item, at (item.value)}<button
				class="carousel-dot"
				type="button"
				role="tab"
				aria-label={item.label}
				aria-selected={item.value === current}
				tabindex={item.value === current ? 0 : -1}
				onpointerdown={() => { pointer = true; choose(item.value, "pointer"); }}
				onclick={(event) => { if (event.detail === 0) choose(item.value, "keyboard"); pointer = false; }}
				onkeydown={(event) => key(event, at)}
			><span aria-hidden="true"></span></button>{/each}
		</div>
	</div>
</section>
