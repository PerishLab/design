<script lang="ts">
	import "./Head.scss";

	let {
		text,
		look = "loud",
		seat,
	}: {
		text: string;
		look?: "loud" | "quiet";
		seat?: string;
	} = $props();
</script>

<h2 class="head head-{look}" id={seat}>{text}</h2>
