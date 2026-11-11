<script lang="ts">
 import { tick } from "svelte";
 import Sign from "../../mark/Sign/Sign.svelte";
 import Tip from "../Tip/Tip.svelte";
 import "./Menu.scss";
 let { label, items, value = $bindable(""), sign, look = "cue", open = $bindable(false), choose, disabled = false }: {
  label: string; items: { value: string; label: string }[]; value?: string; sign?: string;
  look?: "cue" | "bare"; open?: boolean; choose?: (next: string) => void; disabled?: boolean;
 } = $props();
 let seat: HTMLElement | undefined = $state();
 let cue: HTMLButtonElement | undefined = $state();
 let at = $state(0);
 function focus(next: number): void {
  if (items.length === 0) return;
  at = (next + items.length) % items.length;
  void tick().then(() => seat?.querySelectorAll<HTMLButtonElement>(".menu-item")[at]?.focus());
 }
 function expand(next: number): void { if (items.length === 0) return; at = Math.max(0, next); open = true; }
 function take(next: string): void { open = false; value = next; choose?.(next); cue?.focus(); }
 function shut(event: Event): void { if (seat !== undefined && !seat.contains(event.target as Node)) open = false; }
 function key(event: KeyboardEvent): void {
  if (open) return;
  const places: { [key: string]: number } = { ArrowDown: 0, ArrowUp: items.length - 1 };
  const next = places[event.key];
  if (next === undefined) return;
  event.preventDefault(); event.stopPropagation(); expand(next);
 }
 function quit(event: KeyboardEvent): void {
  if (!seat?.contains(document.activeElement)) return;
  switch (event.key) {
   case "Escape": event.preventDefault(); event.stopPropagation(); open = false; cue?.focus(); return;
   case "Tab": open = false; return;
  }
  const places: { [key: string]: number } = { ArrowDown: at + 1, ArrowUp: at - 1, Home: 0, End: items.length - 1 };
  const next = places[event.key];
  if (next === undefined) return;
  event.preventDefault(); focus(next);
 }
 $effect(() => { if (disabled || items.length === 0) open = false; });
 $effect(() => {
  if (!open) return () => {};
  void tick().then(() => focus(at));
  globalThis.addEventListener("pointerdown", shut);
  globalThis.addEventListener("keydown", quit);
  return () => { globalThis.removeEventListener("pointerdown", shut); globalThis.removeEventListener("keydown", quit); };
 });
</script>

<div class="menu menu-{look}" bind:this={seat}>
 <Tip text={label} look="under"><button class="menu-cue" type="button" disabled={disabled || items.length === 0} aria-label={label} aria-haspopup="menu" aria-expanded={open} bind:this={cue} onclick={() => open ? open = false : expand(items.findIndex(item => item.value === value))} onkeydown={key}>{#if sign}<Sign name={sign} />{/if}<span class="menu-word">{label}</span></button></Tip>
 {#if open}<ul class="menu-list" role="menu" aria-label={label}>{#each items as item, index (item.value)}<li role="none"><button class="menu-item" class:live={item.value === value} tabindex={index === at ? 0 : -1} type="button" role="menuitemradio" aria-checked={item.value === value} onclick={() => take(item.value)}><span>{item.label}</span>{#if item.value === value}<Sign name="tick" />{/if}</button></li>{/each}</ul>{/if}
</div>
