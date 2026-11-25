<script lang="ts">
 import Gallery from "./Gallery.svelte";
 import Workbench from "./Workbench.svelte";
 import Google from "./google/Google.svelte";
 const params = new URLSearchParams(globalThis.location?.search ?? "");
 const gallery = params.has("catalog") || (params.has("system") && !params.has("workbench"));
</script>

{#if params.has("google")}<Google />{:else if gallery}<Gallery />{:else}<Workbench />{/if}
