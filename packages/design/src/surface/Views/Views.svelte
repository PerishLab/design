<script lang="ts">
	import { setContext } from "svelte";
	import type { Component } from "svelte";
	import Note from "../../content/Note/Note.svelte";
	import Button from "../../control/Button/Button.svelte";
	import Field from "../../control/Field/Field.svelte";
	import Card from "../../layout/Card/Card.svelte";
	import Page from "../Page/Page.svelte";
	import { seat } from "./path.js";

	type Module = { default: Component };
	type Source = { path: string; load: () => Promise<Module> };
	export type Catalog = { login: boolean; views: readonly Source[] };

	let { source }: { source: Catalog } = $props();
	let route = $state(globalThis.location?.pathname ?? "/");
	let View = $state<Component | undefined>();
	let loading = $state(false);
	let missing = $state(false);
	let login = $state("");
	let pass = $state("");
	let warn = $state("");
	let busy = $state(false);
	let params: Record<string, string> = {};
	setContext(seat, () => params);

	function match(pattern: string, actual: string): Record<string, string> | undefined {
		const expected = pattern.split("/").filter(Boolean);
		const found = actual.split("/").filter(Boolean);
		if (expected.length !== found.length) return undefined;
		const values: Record<string, string> = {};
		for (let index = 0; index < expected.length; index += 1) {
			const part = expected[index];
			const value = found[index];
			if (part.startsWith("{") && part.endsWith("}")) values[part.slice(1, -1)] = value;
			else if (part !== value) return undefined;
		}
		return values;
	}

	function back(): string {
		const raw = new URLSearchParams(globalThis.location.search).get("return");
		return raw?.startsWith("/") === true && !raw.startsWith("//") ? raw : "/";
	}

	async function submit(event: SubmitEvent): Promise<void> {
		event.preventDefault();
		busy = true;
		warn = "";
		try {
			const response = await fetch("/api/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ login, pass }) });
			if (response.ok) return globalThis.location.assign(back());
			warn = response.status === 401 || response.status === 400 ? "That login and password did not match." : "Sign in failed. Try again.";
		} catch {
			warn = "Sign in failed. Try again.";
		}
		busy = false;
	}

	$effect(() => {
		const current = route;
		View = undefined;
		missing = false;
		if (source.login && current === "/login") return;
		const selected = source.views.map((item) => ({ item, values: match(item.path, current) })).find((item) => item.values !== undefined);
		if (selected === undefined) {
			missing = true;
			return;
		}
		params = selected.values ?? {};
		loading = true;
		void selected.item.load().then((held) => {
			if (route === current) View = held.default;
		}).finally(() => {
			if (route === current) loading = false;
		});
	});

	$effect(() => {
		const change = () => (route = globalThis.location.pathname);
		globalThis.addEventListener?.("popstate", change);
		return () => globalThis.removeEventListener?.("popstate", change);
	});
</script>

{#if source.login && route === "/login"}
	<form onsubmit={submit}>
		<Card title="Sign in">
			<Field label="Login" value={login} change={(next) => (login = next)} />
			<Field label="Password" value={pass} change={(next) => (pass = next)} kind="password" />
			{#if warn}<Note text={warn} tone="warn" />{/if}
			<Button label="Sign in" submit {busy} wide />
		</Card>
	</form>
{:else if View}
	<View />
{:else if loading}
	<Page title="Loading"><Note text="Loading view." /></Page>
{:else if missing}
	<Page title="Not found"><Note text="That page does not exist." tone="warn" /></Page>
{/if}
