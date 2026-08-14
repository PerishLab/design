<script lang="ts">
	import "./Head.scss";

	let { text, seat }: { text: string; seat?: string } = $props();
</script>

<h2 class="head" id={seat}>{text}</h2>
