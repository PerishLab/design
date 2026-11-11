<script lang="ts">
 import { Board, Fold, Text, Pick, Check, Button, Note } from "@perishlab/design";
 import { systems, type Data, type View, type Actions } from "./model.ts";
 let { data, view, actions }: { data: Data; view: View; actions: Actions } = $props();
</script>

<Board title={view.book.manual} seat="help" look="bare">
 <Fold label={view.book.examples}>
  <Text>{view.book.guide}</Text>
  <Pick label={view.book.scene} bind:value={data.choice.scene} change={actions.scene} disabled={data.busy} choices={[{ value: "ready", label: view.book.ready }, { value: "loading", label: view.book.loading }, { value: "error", label: view.book.error }, { value: "empty", label: view.book.empty }]} />
  <Check label={view.book.simulate} bind:held={data.fault} look="switch" disabled={data.busy} />
  <Pick label={data.locale === "zh" ? "视觉语言" : "Design language"} bind:value={data.system} choices={systems.map(value => ({ value, label: value }))} disabled={data.busy} />
  {#if data.system !== "base"}<Note text={view.book.fixed} />{/if}
  <Button label={view.book.reset} look="quiet" press={actions.reset} halt={data.busy} />
 </Fold>
</Board>
