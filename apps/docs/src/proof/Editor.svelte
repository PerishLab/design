<script lang="ts">
 import { Board, Form, Field, Pick, Check, Button, Split, Note, Meter } from "@perishlab/design";
 import type { Data, View, Actions } from "./model.ts";
 let { data, view, actions }: { data: Data; view: View; actions: Actions } = $props();
</script>

{#if view.current}
 <Board title={view.book.edit} line={view.dirty ? view.book.dirty : view.book.unchanged} seat="editor">
  <Form label={view.book.edit} submit={actions.submit} validate={false} busy={data.busy}>
   <Field label={view.book.id} value={view.current.id} readonly />
   <Field label={view.book.name} bind:value={data.draft.name} error={data.error} required disabled={data.busy} change={actions.correct} />
   <Field label={view.book.owner} bind:value={data.draft.owner} hint={view.book.missing} disabled={data.busy} />
   <Pick label={view.book.state} bind:value={data.draft.state} choices={view.states} disabled={data.busy} />
   <Check label={view.book.star} bind:held={data.draft.star} disabled={data.busy} />
   {#if data.failure}<Note text={data.failure} mood="warn" />{/if}
   {#if data.busy}<Meter label={view.book.saving} />{/if}
   <Split><Button label={view.book.save} submit busy={data.busy} halt={!view.dirty} /><Button label={view.book.undo} look="quiet" press={actions.undo} halt={!view.dirty || data.busy} /></Split>
  </Form>
 </Board>
{/if}
