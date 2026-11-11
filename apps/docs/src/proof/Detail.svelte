<script lang="ts">
 import { Grid, Board, Text, Line, Tag, Split, Link, Menu, Note } from "@perishlab/design";
 import Editor from "./Editor.svelte";
 import { title, type Data, type View, type Actions } from "./model.ts";
 let { data, view, actions }: { data: Data; view: View; actions: Actions } = $props();
</script>

     <Grid cols={1}>
      {#if view.current && data.scene !== "empty"}
       <Board title={view.book.detail} line={view.current.id} seat="detail">
        <Text>{title(view.current, data.locale)}</Text>
        <Line name={view.book.owner} meta={view.current.owner || view.book.missing} />
        <Line name={view.book.updated} meta={view.current.date}><Tag text={view.current.star ? view.book.stars : view.book.all} look="quiet" /></Line>
        {#if !view.found.some(row => row.id === data.selected)}<Note text={view.book.outside} />{/if}
        <Split><Link href="#records" label={view.book.back} /><Menu look="bare" label={view.book.menu} items={view.states} value={view.current.state} choose={actions.mark} disabled={view.dirty || data.busy || data.scene !== "ready"} /></Split>
        {#if data.scene !== "ready"}<Note text={view.book.cached} />{/if}
       </Board>
       {#if data.scene === "ready"}<Editor {data} {view} {actions} />{/if}
      {:else}<Board title={view.book.detail}><Note text={view.book.absent} /></Board>{/if}
     </Grid>
