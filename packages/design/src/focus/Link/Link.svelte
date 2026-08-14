<script lang="ts">
	import "./Link.scss";

	let { label, href }: { label: string; href: string } = $props();
</script>

<a class="link" {href}>{label}</a>
