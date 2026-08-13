<script lang="ts">
	import "./Copy.scss";

	let { text }: { text: string } = $props();
	let done = $state(false);

	function grab(): void {
		void navigator.clipboard.writeText(text);
		done = true;
		setTimeout(() => (done = false), 1600);
	}
</script>

<button class:done class="copy" type="button" onclick={grab}>{done ? "copied" : "copy"}</button>
