<script lang="ts">
	import { Banner, Button, Footer, Frame, Nav, Pick, Search, Shell } from "@perish/design";
	import { catalog, copy, groups } from "../docs/catalog.ts";
	import Bench from "./Bench.svelte";

	type Locale = "en" | "zh";
	type Tone = "light" | "dark";
	let { locale }: { locale: Locale } = $props();
	const systems = [
		{ value: "base", label: "base" },
		{ value: "ant", label: "ant" },
		{ value: "brutal", label: "brutal" },
		{ value: "carbon", label: "carbon" },
		{ value: "cupertino", label: "cupertino" },
		{ value: "folio", label: "folio" },
		{ value: "glass", label: "glass" },
		{ value: "material", label: "material" },
		{ value: "relief", label: "relief" },
		{ value: "swiss", label: "swiss" },
		{ value: "terminal", label: "terminal" },
	];
	let query = $state("");
	let plan = $state("base");
	let tone: Tone = $state("light");
	let said = $derived(copy[locale]);
	let count = $derived(groups.flatMap((group) => catalog[group]).filter((name) => name.toLowerCase().includes(query.trim().toLowerCase())).length);
	const total = groups.flatMap((group) => catalog[group]).length;
	function names(group: (typeof groups)[number]): string[] {
		const word = query.trim().toLowerCase();
		return catalog[group].filter((name) => name.toLowerCase().includes(word));
	}
</script>

<Shell {tone}>
	<Frame>
		<a class="skip" href="#catalog">{locale === "zh" ? "跳到组件" : "skip to components"}</a>
		<Banner mark="◆" title={said.title} line={said.line}>
			<a href={locale === "en" ? "/zh-CN/" : "/"}>{said.language}</a>
			<Button look="quiet" press={() => (tone = tone === "light" ? "dark" : "light")}>{tone === "light" ? said.theme : locale === "zh" ? "浅色" : "light"}</Button>
		</Banner>
		<p>{said.intro}</p>
		<Search bind:value={query} hint={said.filter} />
		<Pick label={locale === "zh" ? "设计系统" : "design system"} bind:value={plan} choices={systems} />
		<Nav links={groups.map((group) => ({ label: `${said[group]} · ${names(group).length}`, href: `#${group}` }))} />
		<p><code>{count} / {total}</code></p>
		<main id="catalog">
			{#if count === 0}<p>{said.empty}</p>{/if}
			{#each groups as group}
				{#if names(group).length > 0}<section id={group}><h2>{said[group]}</h2>{#each names(group) as name (name)}<Bench {name} {locale} {tone} system={plan} labels={{ preview: said.preview, props: said.props }} />{/each}</section>{/if}
			{/each}
		</main>
		<Footer text="a PerishLab workshop"><a href="https://git.perish.top/PerishFire/design">source ↗</a></Footer>
	</Frame>
</Shell>
