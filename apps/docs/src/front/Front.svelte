<script lang="ts">
	import { Cell, Course, Grid, Hero, Text } from "@perishlab/design";
	import Gallery from "../gallery/Gallery.svelte";
	import Turn from "./Turn.svelte";
	import { speak } from "../lib/i18n/index.ts";

	type Tone = "system" | "light" | "dark";
	const voices = ["base", "folio", "glass", "carbon", "relief", "ant", "brutal", "material", "swiss", "cupertino", "terminal"];
	const beat = 2600;
	const fade = 180;
	const t = speak();
	let { tone, system = $bindable("base") }: { tone: Tone; system?: string } = $props();
</script>

<Course full>
	<Grid cols={12}>
		<Cell span={5}>
			<Hero look="claim" title={t("front.claim")} line={t("front.line")} />
			<Text>{t("front.lede")}</Text>
		</Cell>
		<Cell span={7} look="fill">
			<Turn name="Voice" values={t<Record<string, unknown>>("front.exhibit")} tone={tone === "system" ? undefined : tone} {voices} {beat} {fade} />
		</Cell>
	</Grid>
</Course>
<Course look="well">
	<Gallery bind:system tone={tone === "system" ? undefined : tone} />
</Course>
