<script lang="ts">
 import type { HTMLInputAttributes } from "svelte/elements";
 import Sign from "../../mark/Sign/Sign.svelte";
 import "./Field.scss";
 const id = $props.id();
 let { label, value = $bindable(""), change, kind = "text", hint, help, error, disabled = false, readonly = false, required = false, look = "plain", name, autocomplete = "off" }: {
  label: string; value?: string; change?: (next: string) => void; kind?: "text" | "password" | "email" | "url" | "number" | "area"; hint?: string; help?: string;
  error?: string; disabled?: boolean; readonly?: boolean; required?: boolean;
  look?: "plain" | "float"; name?: string; autocomplete?: HTMLInputAttributes["autocomplete"];
 } = $props();
 let described = $derived([help ? `${id}-help` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined);
 function take(next: string): void { value = next; change?.(next); }
</script>

<div class="field field-{look}">
 {#if kind === "area"}
  <textarea class="field-input field-area" {id} {name} {value} rows="3" placeholder={look === "float" ? " " : hint} {disabled} {readonly} {required} aria-invalid={error ? "true" : undefined} aria-describedby={described} oninput={(event) => take(event.currentTarget.value)}></textarea>
 {:else}
  <input class="field-input" {id} {name} type={kind} {value} placeholder={look === "float" ? " " : hint} {disabled} {readonly} {required} aria-invalid={error ? "true" : undefined} aria-describedby={described} {autocomplete} oninput={(event) => take(event.currentTarget.value)} />
 {/if}
 <label class="field-label" for={id}>{label}{#if required && look === "plain"}<span aria-hidden="true"> *</span>{/if}</label>
 {#if help}<p class="field-help" id={`${id}-help`}>{help}</p>{/if}
 {#if error}<p class="field-error" id={`${id}-error`}><Sign name="warn" /><span>{error}</span></p>{/if}
</div>
