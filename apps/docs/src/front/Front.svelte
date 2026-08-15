<script lang="ts">
	import { Banner, Button, Cell, Code, Course, Footer, Grid, Head, Hero, Ledger, Link, Pick, Rail, Shell, Split, Text } from "@perish/design";
	import { stamp } from "virtual:stamp";
	import { shown, spell, wired } from "../docs/front.ts";
	import Choir from "../gallery/Choir.svelte";
	import { speak, tongue } from "../lib/i18n/index.ts";

	type Tone = "system" | "light" | "dark";
	const voices = ["swiss", "relief", "glass", "terminal"];
	const t = speak();
	const heard = tongue();
	let tone: Tone = $state("system");
	let here = $derived(heard() === "en" ? "/" : "/zh-CN/");
	let shades = $derived([
		{ value: "system", label: t("front.system") },
		{ value: "light", label: t("front.light") },
		{ value: "dark", label: t("front.theme") },
	]);
	const tongues = [
		{ value: "en", label: "English" },
		{ value: "zh", label: "简体中文" },
	];
	function travel(next: string): void {
		globalThis.location.href = next === "en" ? "/" : "/zh-CN/";
	}
</script>

<Shell tone={tone === "system" ? undefined : tone}>
	<Banner stick look="exact" title={t("front.title")}>
		<Link look="nav" href={`${here}gallery/`} label={t("front.gallery")} />
		<Pick look="bare" label={t("front.tongue")} value={heard()} choices={tongues} change={travel} />
		<Pick look="bare" label={t("front.shade")} bind:value={tone} choices={shades} />
	</Banner>

	<Course>
		<Grid cols={12}>
			<Cell span={7}>
				<Hero title={t("front.claim")} line={t("front.line")} />
			</Cell>
			<Cell span={5}>
				<Text>{t("front.lede")}</Text>
			</Cell>
		</Grid>
		<Split look="close">
			<Button href={`${here}gallery/`} label={t("front.start")} sign="next" />
			<Button look="quiet" href="https://git.perish.top/PerishFire/design" label={t("front.source")} sign="away" />
		</Split>
	</Course>
	<Course look="well">
		<Head text={t("front.voice")} seat="voice" />
		<Text>{t("front.voiced")}</Text>
		<Choir name="Voice" tone={tone === "system" ? undefined : tone} {voices} cols={4} look="pane" />
		<Split look="close">
			<Button look="quiet" href={`${here}gallery/`} label={t("front.visit")} sign="next" />
		</Split>
	</Course>
	<Course>
		<Grid cols={12}>
			<Cell span={5}>
				<Head text={t("front.rooms")} seat="rooms" />
				<Text>{t("front.axis")}</Text>
			</Cell>
			<Cell span={7}>
				<Rail stops={t("front.stops")} />
			</Cell>
		</Grid>
	</Course>
	<Course look="raise">
		<Head text={t("front.install")} seat="install" />
		<Grid cols={12}>
			<Cell span={4}>
				<Head look="quiet" text={t<string[]>("front.steps")[0]} />
				<Code name="terminal" text={spell} copy />
			</Cell>
			<Cell span={4}>
				<Head look="quiet" text={t<string[]>("front.steps")[1]} />
				<Code name="vite.config.ts" text={wired} copy />
			</Cell>
			<Cell span={4}>
				<Head look="quiet" text={t<string[]>("front.steps")[2]} />
				<Code name="App.svelte" text={shown} copy />
			</Cell>
		</Grid>
		<Split look="close">
			<Text>{t("front.after")}</Text>
			<Button look="quiet" href={`${here}gallery/`} label={t("front.values")} sign="next" />
		</Split>
	</Course>
	<Course>
		<Grid cols={12}>
			<Cell span={5}>
				<Head look="quiet" text={t("front.tally")} seat="tally" />
				<Ledger atoms={t("front.counts")} />
			</Cell>
			<Cell span={7}>
				<Text>{t("front.stock")}</Text>
			</Cell>
		</Grid>
		<Footer text={stamp}>
			<Link look="nav" href={`${here}gallery/`} label={t("front.gallery")} />
			<Link look="nav" href="https://git.perish.top/PerishFire/design" label="source" />
		</Footer>
	</Course>
</Shell>
