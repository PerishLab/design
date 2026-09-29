<script lang="ts">
	import { Aside, Navigator, Cell, Course, Face, Fold, Menu, Meter, Stage, Table, Tabs, Tip, Modal, Toast, Check, Head, Item, Pick, Text, Board, Button, Card, Code, Copy, Field, Footer, Forge, Frame, Grid, Hero, Ledger, Line, Link, List, Nav, Note, Rail, Search, Sheet, Shell, Split, Tag } from "@perishlab/design";
	import { atoms, choices, grid, heads, picks, stops } from "../docs/samples.ts";

	let { name, values }: { name: string; values: Record<string, unknown> } = $props();
	function said(prop: string): string {
		return String(values[prop] ?? "");
	}
</script>

{#if name === "Aside"}<Aside>{#snippet side()}{said("side")}{/snippet}{said("children")}</Aside>
{:else if name === "Navigator"}<Navigator mark={said("mark")} title={said("title")} line={said("line")}>{said("children")}</Navigator>
{:else if name === "Board"}<Board title={said("title")} line={said("line")}>{said("children")}</Board>
{:else if name === "Button"}<Button label={said("label")} look={said("look") === "quiet" ? "quiet" : "solid"} wide={Boolean(values.wide)} busy={Boolean(values.busy)} halt={Boolean(values.halt)} submit={Boolean(values.submit)}>{said("children")}</Button>
{:else if name === "Card"}<Card title={said("title")}>{said("children")}</Card>
{:else if name === "Cell"}<Grid cols={4}><Cell span={Number(values.span) || 1}>{said("children")}</Cell></Grid>
{:else if name === "Check"}<Check label={said("label")} held={Boolean(values.held)} look={said("look") === "switch" ? "switch" : "box"} />
{:else if name === "Head"}<Head text={said("text")} seat={said("seat")} />
{:else if name === "Item"}<List><Item>{said("children")}</Item></List>
{:else if name === "Pick"}<Pick label={said("label")} value={said("value")} choices={choices} />
{:else if name === "Text"}<Text>{said("children")}</Text>
{:else if name === "Code"}<Code name={said("name")} copy={Boolean(values.copy)} text={said("text")} />
{:else if name === "Copy"}<Copy text={said("text")} />
{:else if name === "Voice"}<Board title={said("title")} line={said("line")}><Grid cols={2} look="loose" flow="hold"><Card title={said("meaning")}><Text>{said("constant")}</Text><Tag text={said("state")} /></Card><Card title={said("language")}><Text>{said("variable")}</Text><Button href={said("href")} label={said("action")} /></Card></Grid></Board>
{:else if name === "Course"}<Course look={said("look") === "raise" ? "raise" : "plain"}>{said("children")}</Course>
{:else if name === "Field"}<Field label={said("label")} value={said("value")} change={() => {}} kind={said("kind") === "password" ? "password" : "text"} hint={said("hint")} />
{:else if name === "Face"}<Face name={said("name")} />
{:else if name === "Fold"}<Fold label={said("label")} open={Boolean(values.open)}>{said("children")}</Fold>
{:else if name === "Menu"}<Menu label={said("label")} items={picks} open={Boolean(values.open)} />
{:else if name === "Meter"}<Meter label={said("label")} value={Number(values.value)} />
{:else if name === "Table"}<Table heads={heads} rows={grid} />
{:else if name === "Tabs"}<Tabs tabs={picks} value={said("value")} />
{:else if name === "Tip"}<Tip text={said("text")}>{said("children")}</Tip>
{:else if name === "Footer"}<Footer text={said("text")}>{said("children")}</Footer>
{:else if name === "Forge"}<Forge host={said("host")} repo={said("repo")} />
{:else if name === "Frame"}<Frame>{said("children")}</Frame>
{:else if name === "Grid"}<Grid cols={Number(values.cols) || undefined} look={said("look") === "loose" ? "loose" : "even"} flow={said("flow") === "hold" ? "hold" : "fold"}>{said("children")}</Grid>
{:else if name === "Hero"}<Hero title={said("title")} line={said("line")} mark={said("mark")} />
{:else if name === "Ledger"}<Ledger {atoms} />
{:else if name === "Line"}<Line name={said("name")} meta={said("meta")}>{said("children")}</Line>
{:else if name === "Link"}<Link label={said("label")} href={said("href")} />
{:else if name === "List"}<List><Item>{said("children")}</Item></List>
{:else if name === "Nav"}<Nav look={said("look") === "list" ? "list" : "bar"} links={[{ label: said("children"), href: "#nav" }]} />
{:else if name === "Modal"}<Modal title={said("title")} open={Boolean(values.open)}>{said("children")}</Modal>
{:else if name === "Toast"}<Toast notes={[said("notes")]} mood={said("mood") === "warn" ? "warn" : "calm"} />
{:else if name === "Note"}<Note text={said("text")} mood={said("mood") === "warn" ? "warn" : "calm"} />
{:else if name === "Rail"}<Rail {stops} />
{:else if name === "Search"}<Search value={said("value")} change={() => {}} hint={said("hint")} />
{:else if name === "Sheet"}<Sheet>{said("children")}</Sheet>
{:else if name === "Shell"}<Shell>{said("children")}</Shell>
{:else if name === "Split"}<Split>{said("children")}</Split>
{:else if name === "Stage"}<Stage look={said("look") === "show" ? "show" : said("look") === "strip" ? "strip" : said("look") === "pane" ? "pane" : "view"} label={said("label") || undefined} meta={said("meta") || undefined}>{said("children")}</Stage>
{:else if name === "Tag"}<Tag text={said("text")} look={said("look") === "quiet" ? "quiet" : "solid"} mood={said("mood") === "warn" ? "warn" : "calm"} />
{/if}
