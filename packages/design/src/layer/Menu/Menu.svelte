<script lang="ts">
 import { tick, type Snippet } from "svelte";
 import Sign from "../../mark/Sign/Sign.svelte";
 import Tip from "../Tip/Tip.svelte";
 import "./Menu.scss";
 type Choice = { value: string; label: string; sign?: string; mood?: "calm" | "warn" };
 let { label, items, value = $bindable(""), sign, look = "cue", kind = "radio", cue: face, head, open = $bindable(false), choose, disabled = false }: {
  label: string; items: Choice[]; value?: string; sign?: string;
  look?: "cue" | "bare"; kind?: "radio" | "action"; cue?: Snippet; head?: Snippet;
  open?: boolean; choose?: (next: string) => void; disabled?: boolean;
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
 function take(next: string): void { open = false; if (kind === "radio") value = next; choose?.(next); cue?.focus(); }
 function shut(event: Event): void { if (seat !== undefined && !seat.contains(event.target as Node)) open = false; }
 function toggle(): void {
  if (open) { open = false; return; }
  expand(kind === "radio" ? items.findIndex(item => item.value === value) : 0);
 }
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

<div class="menu menu-{face === undefined ? look : 'face'}" bind:this={seat}>
 <Tip text={label} look="under"><button class={face === undefined ? "menu-cue" : "menu-cue menu-rich"} type="button" disabled={disabled || items.length === 0} aria-label={label} aria-haspopup="menu" aria-expanded={open} bind:this={cue} onclick={toggle} onkeydown={key}>{#if face}{@render face()}{:else}{#if sign}<Sign name={sign} />{/if}<span class="menu-word">{label}</span>{/if}</button></Tip>
 {#if open}<div class="menu-list" role="menu" aria-label={label}>{#if head}<div class="menu-head">{@render head()}</div>{/if}<ul class="menu-rows" role="none">{#each items as item, index (item.value)}<li role="none"><button class="menu-item" class:live={kind === "radio" && item.value === value} class:menu-warn={item.mood === "warn"} tabindex={index === at ? 0 : -1} type="button" role={kind === "radio" ? "menuitemradio" : "menuitem"} aria-checked={kind === "radio" ? item.value === value : undefined} onclick={() => take(item.value)}><span class="menu-body">{#if item.sign}<Sign name={item.sign} />{/if}<span>{item.label}</span></span>{#if kind === "radio" && item.value === value}<Sign name="tick" />{/if}</button></li>{/each}</ul></div>{/if}
</div>
