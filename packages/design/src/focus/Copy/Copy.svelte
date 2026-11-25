<script lang="ts">
	import Sign from "../../mark/Sign/Sign.svelte";
	import "./Copy.scss";

	let {
		text,
		label = "copy",
		done = "copied",
	}: { text: string; label?: string; done?: string } = $props();
	let held = $state(false);

	function grab(): void {
		void navigator.clipboard.writeText(text);
		held = true;
		setTimeout(() => (held = false), 1600);
	}
</script>

<button class:done={held} class="copy" type="button" onclick={grab}><Sign name={held ? "tick" : "copy"} />{held ? done : label}</button>
