<script lang="ts">
	import { Aside, Cell, Grid, Head, Nav, Pick, Search, Text } from "@perishlab/design";
	import { catalog, groups } from "../docs/catalog.ts";
	import { speak } from "../lib/i18n/index.ts";
	import Bench from "./Bench.svelte";
	import Choir from "./Choir.svelte";

	const t = speak();
	const voices = [
		"base",
		"ant",
		"brutal",
		"carbon",
		"console",
		"cupertino",
		"folio",
		"glass",
		"material",
		"paper",
		"relief",
		"signal",
		"swiss",
		"terminal",
	];
	const systems = [
		{ value: "all", label: "all" },
		{ value: "base", label: "base" },
		{ value: "ant", label: "ant" },
		{ value: "brutal", label: "brutal" },
		{ value: "carbon", label: "carbon" },
		{ value: "console", label: "console" },
		{ value: "cupertino", label: "cupertino" },
		{ value: "folio", label: "folio" },
		{ value: "glass", label: "glass" },
		{ value: "material", label: "material" },
		{ value: "paper", label: "paper" },
		{ value: "relief", label: "relief" },
		{ value: "signal", label: "signal" },
		{ value: "swiss", label: "swiss" },
		{ value: "terminal", label: "terminal" },
	];
	let query = $state("");
	let here = $state("");
	let { system = $bindable("base"), tone }: { system?: string; tone?: "light" | "dark" } = $props();
	function names(group: (typeof groups)[number]): string[] {
		const word = query.trim().toLowerCase();
		return catalog[group].filter((name) => name.toLowerCase().includes(word));
	}
	let alone = $derived(
		groups.flatMap((group) => catalog[group]).find((name) => name.toLowerCase() === here) ??
			"Button",
	);
	let index = $derived(
		groups.flatMap((group) =>
			names(group).map((name) => ({
				label: name,
				href: `#${name.toLowerCase()}`,
				live: here === name.toLowerCase(),
				group: t(`gallery.${group}`),
			})),
		),
	);
</script>

<svelte:window onhashchange={() => (here = globalThis.location.hash.slice(1))} />

<Aside under>
	{#snippet side()}
		<Search bind:value={query} hint={t("gallery.filter")} />
		<Pick label={t("gallery.picker")} bind:value={system} choices={systems} />
		<Nav look="list" links={index} />
	{/snippet}
	<Text>{system === "all" ? t("gallery.choir") : t("gallery.intro")}</Text>
	{#if index.length === 0}<Text>{t("gallery.empty")}</Text>{/if}
	{#if system === "all"}<Head text={alone} seat={alone.toLowerCase()} /><Choir name={alone} {tone} {voices} />{:else}
	{#each groups as group (group)}
		{#if names(group).length > 0}
			<Head text={`${t(`gallery.${group}`)} · ${names(group).length}`} seat={group} />
			<Grid>
				{#each names(group) as name (name)}<Cell><Bench {name} {tone} {system} /></Cell>{/each}
			</Grid>
		{/if}
	{/each}
	{/if}
</Aside>
