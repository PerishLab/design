<script lang="ts">
	import Sign from "../../mark/Sign/Sign.svelte";
	import "./Rail.scss";

	let { stops }: { stops: { mark: string; name: string; text: string; href?: string; sign?: string }[] } = $props();
</script>

{#snippet said(stop: { mark: string; name: string; text: string; sign?: string }, afar: boolean)}<span class="rail-head"><span class="mark" aria-hidden="true">{stop.mark}</span>{#if afar}<Sign name="next" />{/if}</span>{#if stop.sign}<Sign name={stop.sign} look="plate" />{/if}<b>{stop.name}</b><span>{stop.text}</span>{/snippet}

<ol class="rail">{#each stops as stop (stop.name)}<li>{#if stop.href}<a class="rail-stop" href={stop.href}>{@render said(stop, true)}</a>{:else}{@render said(stop, false)}{/if}</li>{/each}</ol>
