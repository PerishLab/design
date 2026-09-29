<script lang="ts">
	import { Cell, Course, Grid, Head, Hero, Ledger, Link, Rail, Text } from "@perishlab/design";
	import { speak, tongue } from "../lib/i18n/index.ts";

	const t = speak();
	const heard = tongue();
	let stops = $derived(
		t<{
			mark: string;
			sign: string;
			name: string;
			text: string;
			href: string;
		}[]>("front.stops").map((stop) => ({
			...stop,
			href: `${heard() === "en" ? "/" : "/zh-CN/"}${stop.href}`,
		})),
	);
</script>

<Course>
	<Hero title={t("pages.what.title")} line={t("pages.what.line")} />
	<Grid cols={12}>
		<Cell span={5}><Head text={t("front.rooms")} seat="rooms" /><Text>{t("front.axis")}</Text></Cell>
		<Cell span={7}><Rail {stops} /></Cell>
	</Grid>
</Course>
<Course look="raise">
	<Grid cols={12}>
		<Cell span={5}><Head look="quiet" text={t("front.tally")} seat="tally" /><Ledger atoms={t("front.counts")} /></Cell>
		<Cell span={7}><Text>{t("front.stock")}</Text><Link href="https://github.com/PerishLab/design" label={t("front.source")} /></Cell>
	</Grid>
</Course>
