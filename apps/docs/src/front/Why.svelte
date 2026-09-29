<script lang="ts">
	import { Cell, Course, Grid, Hero, Text } from "@perishlab/design";
	import { speak } from "../lib/i18n/index.ts";

	const t = speak();
</script>

<Course full>
	<Grid cols={12}>
		<Cell span={5}><Hero title={t("pages.why.title")} line={t("pages.why.line")} /></Cell>
		<Cell span={7}><Text>{t("pages.why.body")}</Text><Text>{t("front.lede")}</Text></Cell>
	</Grid>
</Course>
