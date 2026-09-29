<script lang="ts">
	import { Cell, Code, Course, Grid, Head, Hero, Split, Text } from "@perishlab/design";
	import { shown, spell, wired } from "../docs/front.ts";
	import { speak } from "../lib/i18n/index.ts";

	const t = speak();
</script>

<Course>
	<Hero title={t("pages.how.title")} line={t("pages.how.line")} />
</Course>
<Course look="raise">
	<Head text={t("front.install")} seat="install" />
	<Grid cols={12}>
		<Cell span={4}><Head look="quiet" text={t<string[]>("front.steps")[0]} /><Code name="terminal" text={spell} copy /></Cell>
		<Cell span={4}><Head look="quiet" text={t<string[]>("front.steps")[1]} /><Code name="vite.config.ts" text={wired} copy /></Cell>
		<Cell span={4}><Head look="quiet" text={t<string[]>("front.steps")[2]} /><Code name="App.svelte" text={shown} copy /></Cell>
	</Grid>
	<Split look="close"><Text>{t("front.after")}</Text></Split>
</Course>
