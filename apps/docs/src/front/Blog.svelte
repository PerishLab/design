<script lang="ts">
	import { Cell, Course, Grid, Hero, Link, Text } from "@perishlab/design";
	import { speak } from "../lib/i18n/index.ts";

	const t = speak();
</script>

<Course full>
	<Grid cols={12}>
		<Cell span={5}><Hero title={t("pages.blog.title")} line={t("pages.blog.line")} /></Cell>
		<Cell span={7}><Text>{t("pages.blog.body")}</Text><Link href="https://github.com/PerishLab/design/issues/4" label={t("pages.blog.journal")} /></Cell>
	</Grid>
</Course>
