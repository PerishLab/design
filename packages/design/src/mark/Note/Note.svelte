<script lang="ts">
	import type { Snippet } from "svelte";
	import Sign from "../Sign/Sign.svelte";
	import "./Note.scss";

	let {
		text,
		mood = "calm",
		live = false,
		title,
		code,
		children,
	}: {
		text: string;
		mood?: "warn" | "calm" | "hold";
		live?: boolean;
		title?: string;
		code?: string;
		children?: Snippet;
	} = $props();
	const signs = { calm: "", warn: "warn", hold: "sync" } as const;
	let sign = $derived(signs[mood]);
	let head = $derived(title !== undefined || code !== undefined);
	let rich = $derived(head || children !== undefined || mood === "hold");
	let role = $derived(
		live ? (mood === "warn" ? "alert" : "status") : undefined,
	);
</script>

{#if rich}
	<div class="note note-{mood} note-rich" {role}>
		<div class="note-body">
			{#if head || sign}
				<div class="note-head">
					{#if sign}<Sign name={sign} />{/if}
					{#if code}<span class="note-code">{code}</span>{/if}
					{#if title}<strong class="note-title">{title}</strong>{/if}
				</div>
			{/if}
			<p class="note-text">{text}</p>
		</div>
		{#if children}<div class="note-side">{@render children()}</div>{/if}
	</div>
{:else}
	<p class="note note-{mood}" {role}>{#if sign}<Sign name={sign} />{/if}{text}</p>
{/if}
