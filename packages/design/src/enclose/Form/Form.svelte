<script lang="ts">
 import { tick, type Snippet } from "svelte";
 import "./Form.scss";
 let { label, submit, validate = true, busy = false, children }: {
  label: string; submit: () => void | Promise<void>; validate?: boolean; busy?: boolean; children: Snippet;
 } = $props();
 let node: HTMLFormElement;
 async function send(event: SubmitEvent): Promise<void> {
  event.preventDefault();
  if (busy) return;
  await submit();
  await tick();
  node.querySelector<HTMLElement>('[aria-invalid="true"]:not(:disabled)')?.focus();
 }
</script>

<form class="form" aria-label={label} aria-busy={busy} novalidate={!validate} onsubmit={send} bind:this={node}>{@render children()}</form>
