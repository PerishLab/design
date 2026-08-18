<script lang="ts">
	import { Aside, Navigator, Cell, Footer, Frame, Grid, Head, Link, Menu, Nav, Pick, Search, Shell, Text } from "@perish/design";
	import { named } from "@perish/crest/crest";
	import { catalog, groups } from "../docs/catalog.ts";
	import { speak, tongue } from "../lib/i18n/index.ts";
	import Bench from "./Bench.svelte";
	import Choir from "./Choir.svelte";

	type Tone = "system" | "light" | "dark";
	const t = speak();
	const heard = tongue();
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
	let plan = $state("base");
	let tone: Tone = $state("system");
	let shades = $derived([
		{ value: "system", label: t("gallery.system") },
		{ value: "light", label: t("gallery.light") },
		{ value: "dark", label: t("gallery.theme") },
	]);
	const tongues = [
		{ value: "en", label: "English" },
		{ value: "zh", label: "简体中文" },
	];
	function travel(next: string): void {
		globalThis.location.href = next === "en" ? "/gallery/" : "/zh-CN/gallery/";
	}
	let home = $derived(heard() === "en" ? "/" : "/zh-CN/");
	const total = groups.flatMap((group) => catalog[group]).length;
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

<Shell tone={tone === "system" ? undefined : tone} system={plan === "base" || plan === "all" ? undefined : plan}>
	<Navigator stick look="exact" mark="design" owner={named.design.owner} title={named.design.name} line={t("gallery.line")} {home}>
		<Link look="nav" href={home} label={t("gallery.front")} />
		<Link look="nav" href="/proof/" label={t("gallery.proof")} />
		<Menu look="bare" sign="tongue" label={t("gallery.tongue")} value={heard()} items={tongues} choose={travel} />
		<Menu look="bare" sign="shade" label={t("gallery.shade")} value={tone} items={shades} choose={(next) => (tone = next as Tone)} />
	</Navigator>
	<Frame look="full">
		<Aside under>
			{#snippet side()}
				<Search bind:value={query} hint={t("gallery.filter")} />
				<Pick label={t("gallery.picker")} bind:value={plan} choices={systems} />
				<Nav look="list" links={index} />
			{/snippet}
			<Text>{plan === "all" ? t("gallery.choir") : t("gallery.intro")}</Text>
			{#if index.length === 0}<Text>{t("gallery.empty")}</Text>{/if}
			{#if plan === "all"}<Head text={alone} seat={alone.toLowerCase()} /><Choir name={alone} tone={tone === "system" ? undefined : tone} {voices} />{:else}
			{#each groups as group (group)}
				{#if names(group).length > 0}
					<Head text={`${t(`gallery.${group}`)} · ${names(group).length}`} seat={group} />
					<Grid>
						{#each names(group) as name (name)}<Cell><Bench {name} tone={tone === "system" ? undefined : tone} system={plan} /></Cell>{/each}
					</Grid>
				{/if}
			{/each}
			{/if}
		</Aside>
		<Footer text={`${index.length} / ${total}`}>
			<Link look="nav" href="https://git.perish.top/PerishFire/design" label={t("gallery.source")} />
		</Footer>
	</Frame>
</Shell>
