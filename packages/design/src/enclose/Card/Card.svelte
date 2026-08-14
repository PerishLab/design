<script lang="ts">
	import type { Snippet } from "svelte";
	import "./Card.scss";

	let { title, children }: { title: string; children: Snippet } = $props();
</script>

<section class="card"><h3 class="card-title">{title}</h3>{@render children()}</section>
