<script lang="ts">
	import { Banner, Button, Footer, Frame, Nav, Search, Shell } from "@perish/design";
	import { catalog, copy, groups } from "../docs/catalog.ts";
	import Bench from "./Bench.svelte";

	type Locale = "en" | "zh";
	type Tone = "light" | "dark";
	let { locale }: { locale: Locale } = $props();
	let query = $state("");
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
			<Button tone="quiet" press={() => (tone = tone === "light" ? "dark" : "light")}>{tone === "light" ? said.theme : locale === "zh" ? "浅色" : "light"}</Button>
		</Banner>
		<p>{said.intro}</p>
		<Search value={query} change={(next) => (query = next)} hint={said.filter} />
		<Nav>{#each groups as group}<a href={`#${group}`}>{said[group]} · {names(group).length}</a>{/each}</Nav>
		<p><code>{count} / {total}</code></p>
		<main id="catalog">
			{#if count === 0}<p>{said.empty}</p>{/if}
			{#each groups as group}
				{#if names(group).length > 0}<section id={group}><h2>{said[group]}</h2>{#each names(group) as name (name)}<Bench {name} {locale} {tone} labels={{ preview: said.preview, props: said.props }} />{/each}</section>{/if}
			{/each}
		</main>
		<Footer><a href="https://git.perish.top/PerishFire/design">source ↗</a></Footer>
	</Frame>
</Shell>
