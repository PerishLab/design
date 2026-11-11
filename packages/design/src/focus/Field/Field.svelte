<script lang="ts">
 import "./Field.scss";
 const id = $props.id();
 let { label, value = $bindable(""), change, kind = "text", hint, error, disabled = false, readonly = false, required = false }: {
  label: string; value?: string; change?: (next: string) => void; kind?: "text" | "password"; hint?: string;
  error?: string; disabled?: boolean; readonly?: boolean; required?: boolean;
 } = $props();
 function take(next: string): void { value = next; change?.(next); }
</script>

<div class="field">
 <label class="field-label" for={id}>{label}{#if required}<span aria-hidden="true"> *</span>{/if}</label>
 <input class="field-input" {id} type={kind} {value} placeholder={hint} {disabled} {readonly} {required} aria-invalid={error ? "true" : undefined} aria-describedby={error ? `${id}-error` : undefined} autocomplete="off" oninput={(event) => take(event.currentTarget.value)} />
 {#if error}<p class="field-error" id={`${id}-error`}>{error}</p>{/if}
</div>
