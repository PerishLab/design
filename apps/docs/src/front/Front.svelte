<script lang="ts">
	import { Navigator, Button, Cell, Code, Course, Footer, Grid, Head, Hero, Ledger, Link, Menu, Rail, Shell, Split, Text } from "@perishlab/design";
	import { named } from "@perishlab/crest/crest";
	import { stamp } from "virtual:stamp";
	import { borne, shown, spell, wired } from "../docs/front.ts";
	import Turn from "./Turn.svelte";
	import { speak, tongue } from "../lib/i18n/index.ts";

	type Tone = "system" | "light" | "dark";
	const voices = ["base", "folio", "glass", "carbon", "relief", "ant", "brutal", "material", "swiss", "cupertino", "terminal"];
	const beat = 2600;
	const slide = 900;
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
	<Navigator stick look="exact" mark="design" owner={named.design.owner} title={named.design.name} home={here}>
		<Link look="nav" href={`${here}gallery/`} label={t("front.gallery")} />
		<Menu look="bare" sign="tongue" label={t("front.tongue")} value={heard()} items={tongues} choose={travel} />
		<Menu look="bare" sign="shade" label={t("front.shade")} value={tone} items={shades} choose={(next) => (tone = next as Tone)} />
	</Navigator>

	<Course full>
		<Hero look="claim" title={t("front.claim")} line={t("front.line")} />
		<Grid cols={12}>
			<Cell span={5}>
				<Text>{t("front.lede")}</Text>
			</Cell>
			<Cell span={5} start={8}>
				<Split look="close">
					<Button href={`${here}gallery/`} label={t("front.start")} sign="next" />
					<Button look="quiet" href="https://github.com/PerishLab/design" label={t("front.source")} sign="away" />
				</Split>
			</Cell>
		</Grid>
	</Course>
	<Course look="well">
		<Grid cols={12}>
			<Cell span={7}>
				<Head text={t("front.voice")} seat="voice" />
				<Text>{t("front.voiced")}</Text>
			</Cell>
		</Grid>
		<Turn name="Voice" values={t<Record<string, unknown>>("front.exhibit")} tone={tone === "system" ? undefined : tone} {voices} {beat} {slide} />
		<Grid cols={12}>
			<Cell span={8}>
				<Code name={t("front.borne")} text={borne} />
			</Cell>
			<Cell span={3} start={10}>
				<Split look="close">
					<Button look="quiet" href={`${here}gallery/`} label={t("front.visit")} sign="next" />
				</Split>
			</Cell>
		</Grid>
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
			<Link look="nav" href="https://github.com/PerishLab/design" label="source" />
		</Footer>
	</Course>
</Shell>
