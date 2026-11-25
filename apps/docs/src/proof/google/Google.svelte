<script lang="ts">
	import { Shell } from "@perishlab/design";
	import {
		fallback,
		legs,
		refused,
		snapshots,
		step,
		type Leg,
	} from "../../docs/themes.ts";
	import Accounts from "./Accounts.svelte";
	import Workspace from "./Workspace.svelte";

	const params = new URLSearchParams(globalThis.location?.search ?? "");
	const named = params.get("state");
	const start = legs.find((one) => one === named);
	const seen = params.get("tone") === "dark" ? "chosen" : "inherited";
	const asked = params.get("google");
	const initial =
		asked === "workspace" || params.get("system") === "google-workspace"
			? "google-workspace"
			: "google-accounts";

	let family = $state(initial);
	let leg = $state<Leg>(start ?? seen);
	let busy = $state(false);
	let lose = $state(false);
	let vent = $state(false);
	let fault = $state("");

	const shown = $derived(snapshots[`${family}/${leg}`] ?? fallback);

	function swap(): void {
		if (busy) return;
		family =
			family === "google-accounts" ? "google-workspace" : "google-accounts";
		fault = "";
	}

	async function write(seat: string): Promise<void> {
		if (busy) return;
		busy = true;
		fault = "";
		await new Promise((settle) => setTimeout(settle, 400));
		busy = false;
		if (lose) {
			fault = refused;
			return;
		}
		leg = step(leg, seat);
	}

	function update(seat: string): void {
		if (vent) throw new Error("模拟同步抛错：写入意图没有被接收");
		void write(seat);
	}
</script>

<Shell system={shown.presentation.system} tone={shown.presentation.tone}>
	{#if family === "google-workspace"}
		<Workspace {shown} asked={update} {swap} />
	{:else}
		<Accounts {shown} {busy} {fault} bind:lose bind:vent asked={update} {swap} />
	{/if}
</Shell>
