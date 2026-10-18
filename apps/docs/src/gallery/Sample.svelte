<script lang="ts">
	import type { Snippet } from "svelte";
	import { Aside, Navigator, Cell, Course, Face, Fold, Menu, Meter, Stage, Table, Tabs, Tip, Modal, Toast, Check, Head, Item, Pick, Text, Board, Button, Carousel, Card, Code, Copy, Field, Footer, Forge, Frame, Grid, Hero, Ledger, Line, Link, List, Nav, Note, Rail, Search, Sheet, Shell, Split, Tag } from "@perishlab/design";
	import { atoms, choices, grid, heads, picks, stops } from "../docs/samples.ts";

	let { name, values }: { name: string; values: Record<string, unknown> } = $props();
	function said(prop: string): string {
		return String(values[prop] ?? "");
	}
	function weight(): "solid" | "quiet" | "portal" {
		const look = said("look");
		return look === "quiet" || look === "portal" ? look : "solid";
	}
	const samples = new Map<string, Snippet>([
		["Aside", aside],
		["Navigator", navigator],
		["Board", board],
		["Button", button],
		["Carousel", carousel],
		["Card", card],
		["Cell", cell],
		["Check", check],
		["Head", head],
		["Item", item],
		["Pick", pick],
		["Text", text],
		["Code", code],
		["Copy", copy],
		["Voice", voice],
		["Course", course],
		["Field", field],
		["Face", face],
		["Fold", fold],
		["Menu", menu],
		["Meter", meter],
		["Table", table],
		["Tabs", tabs],
		["Tip", tip],
		["Footer", footer],
		["Forge", forge],
		["Frame", frame],
		["Grid", mesh],
		["Hero", hero],
		["Ledger", ledger],
		["Line", line],
		["Link", link],
		["List", list],
		["Nav", nav],
		["Modal", modal],
		["Toast", toast],
		["Note", note],
		["Rail", rail],
		["Search", search],
		["Sheet", sheet],
		["Shell", shell],
		["Split", split],
		["Stage", stage],
		["Tag", tag],
	]);
</script>

{#snippet aside()}<Aside>{#snippet side()}{said("side")}{/snippet}{said("children")}</Aside>{/snippet}
{#snippet navigator()}<Navigator mark={said("mark")} title={said("title")} line={said("line")}>{said("children")}</Navigator>{/snippet}
{#snippet board()}<Board title={said("title")} line={said("line")}>{said("children")}</Board>{/snippet}
{#snippet button()}<Button label={said("label")} look={weight()} wide={Boolean(values.wide)} busy={Boolean(values.busy)} halt={Boolean(values.halt)} submit={Boolean(values.submit)}>{said("children")}</Button>{/snippet}
{#snippet carousel()}<Carousel items={picks} value={said("value")} label={said("label")} pause={said("pause")} play={said("play")} beat={300000}>{#snippet children(choice)}<Stage look="pane">{choice}</Stage>{/snippet}</Carousel>{/snippet}
{#snippet card()}<Card title={said("title")}>{said("children")}</Card>{/snippet}
{#snippet cell()}<Grid cols={4}><Cell span={Number(values.span) || 1} look={said("look") === "fill" ? "fill" : "start"}>{said("children")}</Cell></Grid>{/snippet}
{#snippet check()}<Check label={said("label")} held={Boolean(values.held)} look={said("look") === "switch" ? "switch" : "box"} />{/snippet}
{#snippet head()}<Head text={said("text")} seat={said("seat")} />{/snippet}
{#snippet item()}<List><Item>{said("children")}</Item></List>{/snippet}
{#snippet pick()}<Pick label={said("label")} value={said("value")} choices={choices} />{/snippet}
{#snippet text()}<Text>{said("children")}</Text>{/snippet}
{#snippet code()}<Code name={said("name")} copy={Boolean(values.copy)} text={said("text")} />{/snippet}
{#snippet copy()}<Copy text={said("text")} />{/snippet}
{#snippet voice()}<Board title={said("title")} line={said("line")} look="bare"><Grid cols={2} look="loose" flow="hold"><Card title={said("meaning")}><Text>{said("constant")}</Text><Tag text={said("state")} /></Card><Card title={said("language")}><Text>{said("variable")}</Text><Button href={said("href")} label={said("action")} /></Card></Grid></Board>{/snippet}
{#snippet course()}<Course look={said("look") === "raise" ? "raise" : "plain"}>{said("children")}</Course>{/snippet}
{#snippet field()}<Field label={said("label")} value={said("value")} change={() => {}} kind={said("kind") === "password" ? "password" : "text"} hint={said("hint")} />{/snippet}
{#snippet face()}<Face name={said("name")} />{/snippet}
{#snippet fold()}<Fold label={said("label")} open={Boolean(values.open)}>{said("children")}</Fold>{/snippet}
{#snippet menu()}<Menu label={said("label")} items={picks} open={Boolean(values.open)} />{/snippet}
{#snippet meter()}<Meter label={said("label")} value={Number(values.value)} />{/snippet}
{#snippet table()}<Table heads={heads} rows={grid} />{/snippet}
{#snippet tabs()}<Tabs tabs={picks} value={said("value")} />{/snippet}
{#snippet tip()}<Tip text={said("text")}>{said("children")}</Tip>{/snippet}
{#snippet footer()}<Footer text={said("text")}>{said("children")}</Footer>{/snippet}
{#snippet forge()}<Forge host={said("host")} repo={said("repo")} />{/snippet}
{#snippet frame()}<Frame>{said("children")}</Frame>{/snippet}
{#snippet mesh()}<Grid cols={Number(values.cols) || undefined} look={said("look") === "loose" ? "loose" : "even"} flow={said("flow") === "hold" ? "hold" : "fold"}>{said("children")}</Grid>{/snippet}
{#snippet hero()}<Hero title={said("title")} line={said("line")} mark={said("mark")} />{/snippet}
{#snippet ledger()}<Ledger {atoms} />{/snippet}
{#snippet line()}<Line name={said("name")} meta={said("meta")}>{said("children")}</Line>{/snippet}
{#snippet link()}<Link label={said("label")} href={said("href")} />{/snippet}
{#snippet list()}<List><Item>{said("children")}</Item></List>{/snippet}
{#snippet nav()}<Nav look={said("look") === "list" ? "list" : "bar"} links={[{ label: said("children"), href: "#nav" }]} />{/snippet}
{#snippet modal()}<Modal title={said("title")} open={Boolean(values.open)}>{said("children")}</Modal>{/snippet}
{#snippet toast()}<Toast notes={[said("notes")]} mood={said("mood") === "warn" ? "warn" : "calm"} />{/snippet}
{#snippet note()}<Note text={said("text")} mood={said("mood") === "warn" ? "warn" : "calm"} />{/snippet}
{#snippet rail()}<Rail {stops} />{/snippet}
{#snippet search()}<Search value={said("value")} change={() => {}} hint={said("hint")} />{/snippet}
{#snippet sheet()}<Sheet>{said("children")}</Sheet>{/snippet}
{#snippet shell()}<Shell fade={Number(values.fade) || undefined} shown={values.shown !== false}>{said("children")}</Shell>{/snippet}
{#snippet split()}<Split>{said("children")}</Split>{/snippet}
{#snippet stage()}<Stage look={said("look") === "show" ? "show" : said("look") === "strip" ? "strip" : said("look") === "pane" ? "pane" : said("look") === "open" ? "open" : "view"} label={said("label") || undefined} meta={said("meta") || undefined}>{said("children")}</Stage>{/snippet}
{#snippet tag()}<Tag text={said("text")} look={said("look") === "quiet" ? "quiet" : "solid"} mood={said("mood") === "warn" ? "warn" : "calm"} />{/snippet}

{@render samples.get(name)?.()}
