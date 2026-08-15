<script lang="ts">
	import "./Nav.scss";

	let {
		links,
		look = "bar",
	}: {
		links: { label: string; href: string; live?: boolean; group?: string }[];
		look?: "bar" | "list";
	} = $props();
</script>

<nav class="nav nav-{look}">
	{#each links as link, at (link.href)}
		{#if link.group !== undefined && link.group !== links[at - 1]?.group}<b class="nav-group">{link.group}</b>{/if}
		<a class:active={link.live} href={link.href}>{link.label}</a>
	{/each}
</nav>
