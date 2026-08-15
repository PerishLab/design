<script lang="ts">
	import { Banner, Board, Button, Card, Cell, Check, Code, Copy, Face, Field, Fold, Footer, Forge, Frame, Grid, Head, Hero, Item, Ledger, Line, Link, List, Menu, Meter, Modal, Nav, Note, Pick, Rail, Search, Sheet, Shell, Split, Table, Tabs, Tag, Text, Tip, Toast } from "@perish/design";
	import { atoms, stops } from "../docs/samples.ts";

	const law = `[limit]\nblock = 4\nfanout = 10\nfile = 300\nmarkup = 8\nparam = 4\npath = 4`;
	const system = new URLSearchParams(globalThis.location?.search ?? "").get("system") ?? "base";
	const ways = [
		{ label: "planes", href: "#planes", live: true },
		{ label: "release", href: "#release" },
		{ label: "laws", href: "#laws" },
		{ label: "access", href: "#access" },
	];
	const planes = [
		{ value: "design", label: "design" },
		{ value: "ectropy", label: "ectropy" },
		{ value: "plumb", label: "plumb" },
	];
	let tone: "light" | "dark" = $state("light");
	let query = $state("");
	let who = $state("");
	let key = $state("");
	let plane = $state("design");
	let guarded = $state(true);
	let view = $state("live");
	let cutting = $state(false);
	let acting = $state(false);
	const views = [
		{ value: "live", label: "live" },
		{ value: "held", label: "held" },
	];
	const deeds = [
		{ value: "prove", label: "prove the guard" },
		{ value: "land", label: "land the branch" },
	];
	const heads = ["plane", "version", "state"];
	const rows = [
		["design", "0.3.0", "published"],
		["token", "0.1.0", "published"],
		["ectropy", "—", "clean"],
	];
	function flip(): void {
		tone = tone === "light" ? "dark" : "light";
	}
</script>

<Shell {tone} {system}>
	<Banner stick mark="◆" title="perish workshop">
		<Forge host="https://git.perish.top" repo="PerishFire/design" />
		<Link href="/gallery/" label="gallery" />
		<Button look="quiet" label={tone === "light" ? "dark" : "light"} press={flip} />
	</Banner>
	<Frame>
		<Nav links={ways} />
		<Tabs tabs={views} bind:value={view} />
		<Hero mark="◆" title="Six planes are live." line="Every plane carries its own constitution, and no release is a publish until it is first a proof." />
		<Split>
			<Search bind:value={query} hint="filter planes" />
			<Button look="quiet" label="new plane" />
		</Split>
		<Head text="Planes" seat="planes" />
		<Grid cols={12}>
			<Cell span={7}><Card title="design"><Text>The Svelte vocabulary, its tokens, and every theme built on them.</Text><Link href="#planes" label="open" /></Card></Cell>
			<Cell span={5}><Card title="ectropy"><Text>Structural and vocabulary law, enforced on every file in the tree.</Text><Link href="#planes" label="open" /></Card></Cell>
			<Cell span={5}><Card title="plumb"><Text>Build, inspect, prove, release, and land a governed repository.</Text><Link href="#planes" label="open" /></Card></Cell>
			<Cell span={7}><Card title="runseal"><Text>Per-run profile isolation, so one run can never poison the next.</Text><Link href="#planes" label="open" /></Card></Cell>
		</Grid>
		<Head text="Release" seat="release" />
		<Board title="design v0.3.0" line="the npm transaction is owned by Actions; product workflows are thin callers">
			<Line name="packages/design" meta="0.3.0"><Tag text="published" /></Line>
			<Line name="packages/token" meta="0.1.0"><Tag text="published" /></Line>
			<Line name="break-glass operator" meta="rejected"><Tag text="denied" mood="warn" /></Line>
			<Line name="git.perish.top/api/packages/PerishLab/npm/" meta="registry"><Copy text="https://git.perish.top/api/packages/PerishLab/npm/" /></Line>
			<Meter label="guard" value={0.82} />
			<Split>
				<Menu label="actions" items={deeds} bind:open={acting} />
				<Button label="cut 0.4.0" press={() => (cutting = true)} />
			</Split>
		</Board>
		<Table {heads} {rows} />
		<Head text="Laws" seat="laws" />
		<Rail {stops} />
		<Note text="Every law below is machine enforced. None of it is a style preference, and none of it is advisory." />
		<Code name="ectropy.toml" copy text={law} />
		<List>
			<Item>every declaration is one word <Tag look="quiet" text="word" /></Item>
			<Item>no comment survives the scan <Tag look="quiet" text="comment" /></Item>
			<Item>ten generators to a node <Tag look="quiet" text="fanout" /></Item>
			<Item>this screen writes no tag of its own <Tag look="quiet" text="markup" /></Item>
		</List>
		<Ledger {atoms} />
		<Fold label="why one word">
			<Text>Because two words is a composition, and a composition asks to be expressed rather than added.</Text>
		</Fold>
		<Head text="Access" seat="access" />
		<Sheet>
			<Split>
				<Face name="Ada Lovelace" />
				<Tip text="one word, one meaning"><Tag look="quiet" text="v0.3.0" /></Tip>
			</Split>
			<Field label="operator" bind:value={who} hint="who is asking" />
			<Field label="token" bind:value={key} kind="password" hint="purpose scoped only" />
			<Pick label="plane" bind:value={plane} choices={planes} />
			<Check label="refuse a break-glass token" bind:held={guarded} look="switch" />
			<Note text="A break-glass token is never accepted on this path." mood="warn" />
			<Button label="sign in" wide submit />
		</Sheet>
		<Footer text="a PerishLab workshop — this site is MIT and guarded by its own constitution.">
			<Link href="/gallery/" label="gallery" />
			<Forge host="https://git.perish.top" repo="PerishFire/design" />
		</Footer>
	</Frame>
	<Modal title="cut 0.4.0" bind:open={cutting}>
		<Text>The transaction is exact. Actions owns it, and this workflow is a thin caller.</Text>
		<Button label="close" press={() => (cutting = false)} />
	</Modal>
	<Toast notes={["the guard is green"]} />
</Shell>
