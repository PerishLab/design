<script lang="ts">
	import "./Nav.scss";

	let { links }: { links: { label: string; href: string; live?: boolean }[] } =
		$props();
</script>

<nav class="nav">{#each links as link (link.href)}<a class:active={link.live} href={link.href}>{link.label}</a>{/each}</nav>
