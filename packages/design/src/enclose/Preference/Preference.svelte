<script lang="ts">
	import "./Preference.scss";

	type Declaration = { state: "missing" } | { state: "present"; value: string };
	type Standing = { kind: "inherit" } | { kind: "value"; value: string };

	const slot = "v:";
	const keep = "i:";

	let {
		label,
		name,
		value,
		source,
		declaration,
		origin,
		effect: summary,
		choices,
		editable = true,
		busy = false,
		error,
		inherit,
		look = "list",
		change,
		restore,
	}: {
		label: string;
		name: string;
		value: string;
		source: "default" | "shared" | "app" | "policy";
		declaration?: Declaration;
		origin?: string;
		effect?: string;
		choices: { value: string; label: string }[];
		editable?: boolean;
		busy?: boolean;
		error?: string;
		inherit?: string;
		look?: "list" | "line";
		change?: (next: string) => void;
		restore?: () => void;
	} = $props();

	const id = $props.id();
	let seat: HTMLElement | undefined = $state();

	function held(): Standing {
		if (declaration?.state === "present")
			return { kind: "value", value: declaration.value };
		if (inherit === undefined) return { kind: "value", value };
		return { kind: "inherit" };
	}

	const standing = $derived(held());
	const stray = $derived(
		standing.kind === "value" && !choices.some((one) => one.value === standing.value)
			? standing.value
			: undefined,
	);

	function token(one: string): string {
		return slot + one;
	}

	const shown = $derived(
		standing.kind === "inherit" ? keep : token(standing.value),
	);

	function settle(held: string): void {
		for (const one of seat?.querySelectorAll<HTMLInputElement>(
			'input[type="radio"]',
		) ?? [])
			one.checked = one.value === held;
		const input = seat?.querySelector<HTMLSelectElement>("select");
		if (input !== undefined && input !== null) input.value = held;
	}

	$effect(() => {
		const held = shown;
		if (seat === undefined) return;
		settle(held);
	});

	function take(raw: string): void {
		settle(shown);
		if (busy || !editable) return;
		if (raw === shown) return;
		if (raw === keep) {
			restore?.();
			return;
		}
		change?.(raw.slice(slot.length));
	}
</script>

{#snippet mark()}<span class="preference-mark" aria-hidden="true"></span>{/snippet}

{#snippet trail()}
	{#if summary}<p class="preference-effect">{summary}</p>{/if}
	{#if error}<p class="preference-error" id={`${id}-error`}>{error}</p>{/if}
{/snippet}

{#if look === "line"}
	<div
		class="preference preference-line"
		bind:this={seat}
		data-name={name}
		data-source={source}
		data-declaration={declaration?.state}
		data-value={value}
		data-busy={busy ? "" : undefined}
		aria-busy={busy}
	>
		<span class="preference-labels">
			<label class="preference-label" for={`${id}-input`}>{label}</label>
			{#if origin}<span class="preference-origin">{origin}</span>{/if}
		</span>
		<select
			class="preference-input"
			id={`${id}-input`}
			{name}
			disabled={!editable}
			aria-invalid={error === undefined ? undefined : "true"}
			aria-describedby={error === undefined ? undefined : `${id}-error`}
			onchange={(event) => take(event.currentTarget.value)}
		>
			{#if inherit !== undefined}<option value={keep} selected={shown === keep} data-choice="">{inherit}</option>{/if}
			{#each choices as one (one.value)}<option value={token(one.value)} selected={token(one.value) === shown} data-choice={one.value}>{one.label}</option>{/each}
			{#if stray !== undefined}<option value={token(stray)} selected disabled data-unlisted="" data-choice={stray}>{stray}</option>{/if}
		</select>
		{@render trail()}
	</div>
{:else}
	<fieldset
		class="preference preference-list"
		bind:this={seat}
		data-name={name}
		data-source={source}
		data-declaration={declaration?.state}
		data-value={value}
		data-busy={busy ? "" : undefined}
		aria-busy={busy}
		aria-describedby={error === undefined ? undefined : `${id}-error`}
	>
		<legend class="preference-label">
			{label}{#if origin}<span class="preference-origin"> — {origin}</span>{/if}
		</legend>
		<div class="preference-choices">
			{#if inherit !== undefined}
				<label class="preference-choice" data-choice="" data-inherit="">
					<input
						class="preference-radio"
						type="radio"
						{name}
						value={keep}
						data-choice=""
						checked={shown === keep}
						disabled={!editable}
						onchange={() => take(keep)}
					/>
					{@render mark()}
					<span class="preference-text">{inherit}</span>
				</label>
			{/if}
			{#each choices as one (one.value)}
				<label class="preference-choice" data-choice={one.value}>
					<input
						class="preference-radio"
						type="radio"
						{name}
						value={token(one.value)}
						data-choice={one.value}
						checked={token(one.value) === shown}
						disabled={!editable}
						onchange={() => take(token(one.value))}
					/>
					{@render mark()}
					<span class="preference-text">{one.label}</span>
				</label>
			{/each}
			{#if stray !== undefined}
				<label class="preference-choice" data-choice={stray} data-unlisted="">
					<input
						class="preference-radio"
						type="radio"
						{name}
						value={token(stray)}
						data-choice={stray}
						checked
						disabled
					/>
					{@render mark()}
					<span class="preference-text">{stray}</span>
				</label>
			{/if}
		</div>
		{@render trail()}
	</fieldset>
{/if}
