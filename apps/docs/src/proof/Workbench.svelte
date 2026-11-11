<script lang="ts">
 import { tick } from "svelte";
 import { Shell, Frame, Navigator, Button, Pick, Nav, Hero, Link, Tabs, Grid, Cell, Text, Split, Note, Modal, Meter, Toast, Footer } from "@perishlab/design";
 import Records from "./Records.svelte";
 import Detail from "./Detail.svelte";
 import Options from "./Options.svelte";
 import { records, empty, stored, belongs, statuses, title, scene, systems, type Data, type Intent, type Actions } from "./model.ts";
 import { words } from "./words.ts";
 const params = new URLSearchParams(globalThis.location?.search ?? "");
 const asked = params.get("system") ?? "base";
 let data: Data = $state({ choice: { locale: params.get("locale") === "en" ? "en" : "zh", scene: scene(params.get("scene")) }, rows: records.map(row => ({ ...row })), selected: "EXP-024", draft: empty(), locale: params.get("locale") === "en" ? "en" : "zh", tone: params.get("tone") === "dark" ? "dark" : "light", system: systems.includes(asked) ? asked : "base", scene: "ready", group: "all", query: "", filter: "", busy: false, opened: false, intent: { kind: "save" }, error: "", failure: "", fault: false, notes: [] });
 const book = $derived(words[data.locale]);
 const current = $derived(data.rows.find(row => row.id === data.selected));
 const original = $derived(stored(current, data.locale));
 const dirty = $derived(Object.entries(data.draft).some(([key, value]) => value !== original[key as keyof typeof original]));
 const scoped = $derived(data.rows.filter(row => belongs(row, data.group)));
 const filtered = $derived(scoped.filter(row => !data.filter || row.state === data.filter));
 const found = $derived(filtered.filter(row => `${title(row, data.locale)} ${row.id} ${row.owner}`.toLowerCase().includes(data.query.toLowerCase())));
 const view = $derived({ book, current, dirty, found, states: statuses(book) });
 const heading = $derived(({ save: book.confirm, record: book.switch, locale: book.language, scene: book.scenario, reset: book.resetting })[data.intent.kind]);
 function restore(): void { data.draft = stored(current, data.locale); data.error = ""; data.failure = ""; }
 function reach(seat: string): void { void tick().then(() => document.getElementById(seat)?.focus()); }
 function notify(text: string): void { data.notes = []; void tick().then(() => data.notes = [text]); }
 function reset(next = "ready"): void {
  data.scene = scene(next); data.rows = data.scene === "empty" ? [] : records.map(row => ({ ...row }));
  data.selected = data.rows[0]?.id ?? ""; data.query = ""; data.filter = ""; data.group = "all"; data.fault = false; data.notes = []; restore();
 }
 function apply(intent: Intent): void {
  switch (intent.kind) {
   case "record": data.selected = intent.id; restore(); reach("detail"); break;
   case "locale": data.locale = intent.locale; restore(); break;
   case "scene":
    if (intent.scene === "empty" || data.rows.length === 0) reset(intent.scene);
    else data.scene = intent.scene;
    reach("records"); break;
   case "reset": reset(); reach("records"); break;
  }
 }
 function ask(intent: Intent): void {
  if (intent.kind === "scene" && intent.scene !== "empty") { apply(intent); return; }
  if (dirty) { data.intent = intent; data.opened = true; return; }
  apply(intent);
 }
 function select(id: string): void {
  if (id === data.selected) { reach("detail"); return; }
  if (!data.rows.some(row => row.id === id)) return;
  ask({ kind: "record", id });
 }
 function submit(): void {
  if (data.busy) return;
  data.error = data.draft.name.trim() ? "" : book.invalid;
  if (data.error) return;
  if (!dirty) return;
  data.intent = { kind: "save" }; data.opened = true;
 }
 function mark(state: string): void {
  data.rows = data.rows.map(row => row.id === data.selected ? { ...row, state } : row);
  restore(); notify(book.marked);
 }
 async function confirm(): Promise<void> {
  if (data.busy) return;
  const intent = data.intent;
  if (intent.kind !== "save") { data.opened = false; apply(intent); return; }
  const id = data.selected; const locale = data.locale; const draft = { ...data.draft };
  data.busy = true; data.notes = []; data.failure = "";
  await new Promise(resolve => setTimeout(resolve, 650));
  data.busy = false; data.opened = false;
  if (data.fault) { data.failure = book.savefail; notify(book.savefail); reach("editor"); return; }
  data.rows = data.rows.map(row => row.id !== id ? row : { ...row, [locale]: draft.name.trim(), owner: draft.owner, state: draft.state, star: draft.star });
  restore(); notify(`${book.saved} ${id}`); reach("detail");
 }
 const actions: Actions = {
  select, submit, mark, confirm, undo: () => { restore(); notify(book.cancelled); },
  correct: value => { if (value.trim()) data.error = ""; },
  language: value => ask({ kind: "locale", locale: value === "en" ? "en" : "zh" }),
  scene: value => ask({ kind: "scene", scene: scene(value) }), reset: () => ask({ kind: "reset" }),
 };
 $effect(() => {
  if (data.opened) return;
  data.choice.locale = data.locale;
  data.choice.scene = data.scene;
 });
 reset(params.get("scene") ?? "ready");
</script>

<Shell tone={data.tone} system={data.system}>
 <Navigator mark="design" owner="PerishLab" title="Design" home="/proof/" stick>
  <Link href="/proof/?catalog=1&system=base" label={book.docs} />
  <Button label={data.system === "base" ? (data.tone === "light" ? book.dark : book.light) : book.fixedMode} look="quiet" halt={data.system !== "base" || data.busy} press={() => data.tone = data.tone === "light" ? "dark" : "light"} />
  <Pick label={book.locale} bind:value={data.choice.locale} change={actions.language} look="bare" disabled={data.busy} choices={[{ value: "zh", label: "中文" }, { value: "en", label: "English" }]} />
 </Navigator>
 <Frame>
  <Nav links={[{ label: book.title, href: "#records", live: true }, { label: book.manual, href: "#help" }]} />
  <Hero title={book.title} line={book.line} />
  <Tabs label={book.scope} tabs={[{ value: "all", label: book.all }, { value: "stars", label: book.stars }, { value: "drafts", label: book.drafts }]} bind:value={data.group}>
   <Grid cols={12}>
    <Cell span={7}><Records {data} {view} {actions} /></Cell>
    <Cell span={5}>
     <Detail {data} {view} {actions} />
    </Cell>
   </Grid>
  </Tabs>
  <Options {data} {view} {actions} />
  <Footer text={book.local}><Link href="#records" label={book.back} /></Footer>
 </Frame>
 <Modal title={heading} bind:open={data.opened} dismiss={!data.busy}>
  <Text>{data.intent.kind === "save" ? data.draft.name : book.discarding}</Text>
  {#if data.intent.kind === "save"}<Note text={book.confirming} />{/if}
  {#if data.busy}<Meter label={book.saving} />{/if}
  <Split><Button label={data.intent.kind === "save" ? book.confirm : book.discard} press={confirm} busy={data.busy} /><Button label={book.cancel} look="quiet" halt={data.busy} press={() => data.opened = false} /></Split>
 </Modal>
 <Toast notes={data.notes} mood={data.failure ? "warn" : "calm"} />
</Shell>
