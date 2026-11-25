<script lang="ts">
	import type { Snippet } from "svelte";
	import Check from "../../focus/Check/Check.svelte";
	import Copy from "../../focus/Copy/Copy.svelte";
	import Sign from "../../mark/Sign/Sign.svelte";
	import "./Vault.scss";

	let {
		title,
		line,
		codes,
		shown = $bindable(false),
		held = $bindable(false),
		file,
		check,
		reveal = "Reveal",
		hide = "Hide",
		save = "Download",
		copy = "Copy",
		done = "Copied",
		children,
	}: {
		title: string;
		line?: string;
		codes: string[];
		shown?: boolean;
		held?: boolean;
		file?: string;
		check?: string;
		reveal?: string;
		hide?: string;
		save?: string;
		copy?: string;
		done?: string;
		children?: Snippet;
	} = $props();

	let joined = $derived(codes.join("\n"));
	let single = $derived(codes.length === 1);

	function download(): void {
		if (file === undefined || codes.length === 0) return;
		const blob = new Blob([`${joined}\n`], { type: "text/plain;charset=utf-8" });
		const href = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = href;
		link.download = file;
		link.click();
		setTimeout(() => URL.revokeObjectURL(href), 0);
	}
</script>

<section class="vault" aria-label={title}>
	<header class="vault-head">
		<div class="vault-copy">
			<h3 class="vault-title">{title}</h3>
			{#if line}<p class="vault-line">{line}</p>{/if}
		</div>
		{#if codes.length > 0}
			<div class="vault-bar">
				<button class="vault-cue" type="button" aria-pressed={shown} onclick={() => (shown = !shown)}><Sign name="show" /><span>{shown ? hide : reveal}</span></button>
				<Copy text={joined} label={copy} {done} />
				{#if file}<button class="vault-cue" type="button" onclick={download}><Sign name="save" /><span>{save}</span></button>{/if}
			</div>
		{/if}
	</header>
	<div class="vault-body">
		{#if codes.length === 0}
			<p class="vault-empty">No secrets available.</p>
		{:else if single}
			<div class="vault-single" class:vault-mask={!shown} aria-label={shown ? undefined : "Hidden secret"}>
				<code>{shown ? (codes[0] ?? "") : "••••••••••••••••••••••••"}</code>
			</div>
		{:else}
			<ol class="vault-grid" aria-label={shown ? undefined : "Hidden codes"}>
				{#each codes as code, index (`${index}-${code.length}`)}
					<li class="vault-cell" class:vault-mask={!shown}>
						<span class="vault-seat">{index + 1}</span>
						<code>{shown ? code : "••••-••••"}</code>
					</li>
				{/each}
			</ol>
		{/if}
	</div>
	{#if check || children}
		<footer class="vault-foot">
			{#if check}<Check label={check} bind:held={held} />{/if}
			{#if children}<div class="vault-side">{@render children()}</div>{/if}
		</footer>
	{/if}
</section>
