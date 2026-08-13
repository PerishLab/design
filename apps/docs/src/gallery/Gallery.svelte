<script lang="ts">
	import { Frame, Grid, Hero, Nav } from "@perish/design";
	import { notes } from "../docs/notes.ts";
	import Bench from "./Bench.svelte";

	type Locale = "en" | "zh";
	let { locale }: { locale: Locale } = $props();
	const speech = {
		en: { title: "perish design", line: "one system, many flavours", toggle: "简体中文" },
		zh: { title: "perish 设计系统", line: "一套系统,多种风味", toggle: "English" },
	};
	let said = $derived(speech[locale]);
</script>

<Frame>
	<Nav><a href={locale === "en" ? "/zh-CN/" : "/"}>{said.toggle}</a></Nav>
	<Hero title={said.title} text={said.line} mark="◆" />
	<Grid>{#each Object.keys(notes) as name (name)}<Bench {name} {locale} />{/each}</Grid>
</Frame>
