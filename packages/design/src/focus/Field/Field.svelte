<script lang="ts">
 import type { HTMLInputAttributes } from "svelte/elements";
 import "./Field.scss";
 const id = $props.id();
 let { label, value = $bindable(""), change, kind = "text", hint, error, disabled = false, readonly = false, required = false, look = "plain", name, autocomplete = "off" }: {
  label: string; value?: string; change?: (next: string) => void; kind?: "text" | "password"; hint?: string;
  error?: string; disabled?: boolean; readonly?: boolean; required?: boolean;
  look?: "plain" | "float"; name?: string; autocomplete?: HTMLInputAttributes["autocomplete"];
 } = $props();
 function take(next: string): void { value = next; change?.(next); }
</script>

<div class="field field-{look}">
 <input class="field-input" {id} {name} type={kind} {value} placeholder={look === "float" ? " " : hint} {disabled} {readonly} {required} aria-invalid={error ? "true" : undefined} aria-describedby={error ? `${id}-error` : undefined} {autocomplete} oninput={(event) => take(event.currentTarget.value)} />
 <label class="field-label" for={id}>{label}{#if required && look === "plain"}<span aria-hidden="true"> *</span>{/if}</label>
 {#if error}<p class="field-error" id={`${id}-error`}>{error}</p>{/if}
</div>
