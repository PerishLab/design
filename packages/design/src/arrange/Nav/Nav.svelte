<script lang="ts">
	import Sign from "../../mark/Sign/Sign.svelte";
	import "./Nav.scss";

	type Entry = {
		label: string;
		href: string;
		live?: boolean;
		group?: string;
		sign?: string;
	};

	let {
		links,
		look = "bar",
		rail = false,
		label,
		pick,
	}: {
		links: Entry[];
		look?: "bar" | "list" | "rail" | "crumb";
		rail?: boolean;
		label?: string;
		pick?: (href: string) => void;
	} = $props();

	function modified(event: MouseEvent): boolean {
		if (event.button !== 0) return true;
		if (event.metaKey || event.ctrlKey) return true;
		return event.shiftKey || event.altKey;
	}

	function go(event: MouseEvent, href: string): void {
		if (pick === undefined || modified(event)) return;
		event.preventDefault();
		pick(href);
	}
</script>

{#if look === "crumb"}
	<nav class="nav nav-crumb" aria-label={label ?? "Breadcrumb"}>
		<ol class="nav-trail">
			{#each links as link, at (`${link.href}-${at}`)}
				<li class="nav-step">
					{#if at > 0}<Sign name="fold" />{/if}
					<a aria-current={link.live ? "page" : undefined} class:active={link.live} href={link.href} onclick={(event) => go(event, link.href)}>{link.label}</a>
				</li>
			{/each}
		</ol>
	</nav>
{:else}
	<nav class="nav nav-{look}" class:nav-shut={rail} aria-label={label}>
		{#each links as link, at (`${link.href}-${at}`)}
			{#if link.group !== undefined && link.group !== links[at - 1]?.group}<b class="nav-group">{link.group}</b>{/if}
			<a aria-current={link.live ? "page" : undefined} class:active={link.live} href={link.href} title={rail ? link.label : undefined} onclick={(event) => go(event, link.href)}>{#if link.sign}<Sign name={link.sign} />{/if}<span class="nav-word">{link.label}</span></a>
		{/each}
	</nav>
{/if}
