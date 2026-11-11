<script lang="ts">
 import { Board, Search, Pick, Line, Tag, Button, Note, Meter } from "@perishlab/design";
 import { title, type Data, type View, type Actions } from "./model.ts";
 let { data, view, actions }: { data: Data; view: View; actions: Actions } = $props();
 const screens = $derived({ ready: entries, loading: waiting, error: failed, empty: vacant });
 function clear(): void { data.query = ""; data.filter = ""; data.group = "all"; }
</script>

{#snippet entries()}
 <Search label={view.book.search} bind:value={data.query} hint={view.book.filter} />
 <Pick label={view.book.state} bind:value={data.filter} choices={[{ value: "", label: view.book.any }, ...view.states]} />
 {#if view.found.length === 0}<Note text={view.book.none} /><Button label={view.book.clear} look="quiet" press={clear} />
 {:else}{#each view.found as row (row.id)}
  <Line flow="fold" name={title(row, data.locale)} meta={row.id}>
   <Tag text={view.states.find(state => state.value === row.state)?.label ?? row.state} look="quiet" />
   <Button label={`${row.id === data.selected ? view.book.chosen : view.book.view} ${row.id.slice(-3)}`} look={row.id === data.selected ? "solid" : "quiet"} press={() => actions.select(row.id)} />
  </Line>
 {/each}{/if}
{/snippet}
{#snippet waiting()}<Note text={view.book.loadingNote} /><Meter label={view.book.waiting} /><Button label={view.book.finish} press={() => actions.scene("ready")} />{/snippet}
{#snippet failed()}<Note text={view.book.failed} mood="warn" /><Button label={view.book.retry} press={() => actions.scene("ready")} />{/snippet}
{#snippet vacant()}<Note text={view.book.absent} /><Button label={view.book.reset} look="quiet" press={actions.reset} />{/snippet}

<Board title={view.book.list} line={data.scene === "ready" ? `${view.found.length} / ${data.rows.length} ${view.book.count}` : view.book[data.scene]} seat="records">
 {@render screens[data.scene]()}
</Board>
