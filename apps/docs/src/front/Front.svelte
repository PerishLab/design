<script lang="ts">
	import { Carousel, Cell, Course, Grid, Hero, Text } from "@perishlab/design";
	import Gallery from "../gallery/Gallery.svelte";
	import Realm from "../gallery/Realm.svelte";
	import { speak } from "../lib/i18n/index.ts";

	type Tone = "system" | "light" | "dark";
	const voices = ["base", "folio", "glass", "carbon", "relief", "ant", "brutal", "material", "swiss", "cupertino", "terminal"];
	const beat = 2600;
	const fade = 180;
	const languages = voices.map((voice) => ({ value: voice, label: voice }));
	const t = speak();
	let voice = $state("base");
	let { tone, system = $bindable("base") }: { tone: Tone; system?: string } = $props();
</script>

<Course full>
	<Grid cols={12}>
		<Cell span={5}>
			<Hero look="claim" title={t("front.claim")} line={t("front.line")} />
			<Text>{t("front.lede")}</Text>
		</Cell>
		<Cell span={7} look="fill">
			<Carousel items={languages} label={t("front.carousel")} pause={t("front.pause")} play={t("front.play")} {beat} {fade} bind:value={voice}>
				{#snippet children(language)}<Realm name="Voice" values={t<Record<string, unknown>>("front.exhibit")} tone={tone === "system" ? undefined : tone} look="open" system={language} />{/snippet}
			</Carousel>
		</Cell>
	</Grid>
</Course>
<Course look="well">
	<Gallery bind:system tone={tone === "system" ? undefined : tone} />
</Course>
