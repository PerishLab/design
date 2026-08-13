<script lang="ts">
	import "./Rail.scss";

	let { stops }: { stops: { mark: string; name: string; text: string }[] } = $props();
</script>

<ol class="rail">{#each stops as stop (stop.name)}<li><span class="mark" aria-hidden="true">{stop.mark}</span><b>{stop.name}</b><span>{stop.text}</span></li>{/each}</ol>
