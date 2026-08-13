<script lang="ts">
	import { Badge, Banner, Board, Button, Card, Code, Copy, Field, Footer, Forge, Frame, Grid, Hero, Ledger, Line, Link, List, Nav, Note, Page, Rail, Search, Sheet, Shell, Split, Tag } from "@perish/design";
	import { atoms, stops } from "../docs/samples.ts";

	let { name, values }: { name: string; values: Record<string, unknown> } = $props();
	function said(prop: string): string {
		return String(values[prop] ?? "");
	}
</script>

{#if name === "Badge"}<Badge>{said("children")}</Badge>
{:else if name === "Banner"}<Banner mark={said("mark")} title={said("title")} line={said("line")}>{said("children")}</Banner>
{:else if name === "Board"}<Board title={said("title")} brief={said("brief")}>{said("children")}</Board>
{:else if name === "Button"}<Button label={said("label")} tone={said("tone") === "quiet" ? "quiet" : "solid"} wide={Boolean(values.wide)} busy={Boolean(values.busy)} submit={Boolean(values.submit)}>{said("children")}</Button>
{:else if name === "Card"}<Card title={said("title")}>{said("children")}</Card>
{:else if name === "Code"}<Code name={said("name")} copy={Boolean(values.copy)} children={said("children")} />
{:else if name === "Copy"}<Copy text={said("text")} />
{:else if name === "Field"}<Field label={said("label")} value={said("value")} change={() => {}} kind={said("kind") === "password" ? "password" : "text"} hint={said("hint")} />
{:else if name === "Footer"}<Footer>{said("children")}</Footer>
{:else if name === "Forge"}<Forge repo={said("repo")} />
{:else if name === "Frame"}<Frame>{said("children")}</Frame>
{:else if name === "Grid"}<Grid>{said("children")}</Grid>
{:else if name === "Hero"}<Hero title={said("title")} text={said("text")} mark={said("mark")} />
{:else if name === "Ledger"}<Ledger {atoms} />
{:else if name === "Line"}<Line name={said("name")} meta={said("meta")}>{said("children")}</Line>
{:else if name === "Link"}<Link label={said("label")} href={said("href")} />
{:else if name === "List"}<List><li>{said("children")}</li></List>
{:else if name === "Nav"}<Nav>{said("children")}</Nav>
{:else if name === "Note"}<Note text={said("text")} tone={said("tone") === "warn" ? "warn" : "calm"} />
{:else if name === "Page"}<Page title={said("title")}>{said("children")}</Page>
{:else if name === "Rail"}<Rail {stops} />
{:else if name === "Search"}<Search value={said("value")} change={() => {}} hint={said("hint")} />
{:else if name === "Sheet"}<Sheet>{said("children")}</Sheet>
{:else if name === "Shell"}<Shell>{said("children")}</Shell>
{:else if name === "Split"}<Split>{said("children")}</Split>
{:else if name === "Tag"}<Tag text={said("text")} tone={said("tone") === "warn" ? "warn" : "calm"} />
{/if}
