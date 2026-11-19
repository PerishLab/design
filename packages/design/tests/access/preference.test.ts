import { Preference } from "@perishlab/design";
import { render } from "svelte/server";
import { expect, test } from "vitest";

const choices = [
	{ value: "google-accounts", label: "Accounts" },
	{ value: "google-workspace", label: "Workspace" },
];

function radios(html: string): string[] {
	return html.match(/<input\b[^>]*type="radio"[^>]*>/g) ?? [];
}

function bare(one: string | undefined): string {
	return (one ?? "").replace(/^[vi]:/, "");
}

function checked(html: string): string[] {
	return radios(html)
		.filter((one) => /\bchecked\b/.test(one))
		.map((one) => bare(one.match(/value="([^"]*)"/)?.[1]));
}

function chosen(html: string): (string | undefined)[] {
	return radios(html).map((one) => attribute(one, "data-choice"));
}

function attribute(tag: string, name: string): string | undefined {
	return tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];
}

test("a declaration carries its presence and written value apart from the effective value", () => {
	const html = render(Preference, {
		props: {
			label: "Tone",
			name: "theme.tone",
			value: "dark",
			source: "policy",
			declaration: { state: "present", value: "light" },
			origin: "policy overrides",
			effect: "effective value is dark",
			choices,
		},
	}).body;
	expect(html).toContain("<fieldset");
	expect(html).toContain('data-name="theme.tone"');
	expect(html).toContain('data-source="policy"');
	expect(html).toContain('data-declaration="present"');
	expect(html).toContain('data-value="dark"');
	expect(html).toContain("policy overrides");
	expect(html).toContain("effective value is dark");
	expect(checked(html)).toEqual(["light"]);
});

test("a missing declaration selects the effective value without claiming one", () => {
	const html = render(Preference, {
		props: {
			label: "System",
			name: "system",
			value: "google-workspace",
			source: "shared",
			declaration: { state: "missing" },
			choices,
		},
	}).body;
	expect(html).toContain('data-declaration="missing"');
	expect(html).not.toContain('data-declaration="present"');
	expect(checked(html)).toEqual(["google-workspace"]);
});

test("the legend names the group as a direct fieldset child", () => {
	const html = render(Preference, {
		props: {
			label: "System",
			name: "system",
			value: "google-accounts",
			source: "default",
			choices,
		},
	}).body;
	const fieldset = html.indexOf("<fieldset");
	const legend = html.indexOf("<legend", fieldset);
	expect(legend).toBeGreaterThan(fieldset);
	expect(html.slice(fieldset, legend)).not.toContain("<span");
	const rest = html.slice(legend);
	expect(rest.indexOf("</legend>")).toBeLessThan(
		rest.indexOf('<div class="preference-choices"'),
	);
});

test("inheritance is one selectable option, so an equal value stays reachable", () => {
	const html = render(Preference, {
		props: {
			label: "Tone",
			name: "tone",
			value: "dark",
			source: "shared",
			declaration: { state: "missing" },
			inherit: "follow shared",
			choices: [
				{ value: "light", label: "Light" },
				{ value: "dark", label: "Dark" },
			],
		},
	}).body;
	const options = radios(html);
	expect(options).toHaveLength(3);
	expect(chosen(html)).toEqual(["", "light", "dark"]);
	expect(checked(html)).toEqual([""]);
	expect(options.every((one) => /value="[vi]:/.test(one))).toBe(true);
	expect(html).toContain("follow shared");
});

test("an inherited value is not repeated as a declaration", () => {
	const html = render(Preference, {
		props: {
			label: "Tone",
			name: "tone",
			value: "light",
			source: "shared",
			declaration: { state: "missing" },
			choices,
		},
	}).body;
	expect(checked(html)).toEqual(["light"]);
	expect(html).not.toContain('data-choice=""');
});

test("an uneditable setting disables every option and claims no restore action", () => {
	const html = render(Preference, {
		props: {
			label: "System",
			name: "system",
			value: "google-accounts",
			source: "policy",
			declaration: { state: "present", value: "google-accounts" },
			editable: false,
			inherit: "follow shared",
			choices,
		},
	}).body;
	expect(radios(html).every((one) => /\bdisabled\b/.test(one))).toBe(true);
	expect(html).toContain("follow shared");
});

test("busy marks the group without disabling the options", () => {
	const html = render(Preference, {
		props: {
			label: "System",
			name: "system",
			value: "google-accounts",
			source: "app",
			declaration: { state: "present", value: "google-accounts" },
			busy: true,
			choices,
		},
	}).body;
	expect(html).toContain('aria-busy="true"');
	expect(radios(html).some((one) => /\bdisabled\b/.test(one))).toBe(false);
});

test("a failure keeps the standing value and describes the group", () => {
	const html = render(Preference, {
		props: {
			label: "System",
			name: "system",
			value: "google-accounts",
			source: "app",
			declaration: { state: "present", value: "google-accounts" },
			error: "the write was rejected",
			choices,
		},
	}).body;
	expect(checked(html)).toEqual(["google-accounts"]);
	expect(html).toContain("the write was rejected");
	const fieldset = html.match(/<fieldset\b[^>]*>/)?.[0] ?? "";
	const said = attribute(fieldset, "aria-describedby");
	expect(said).toBeDefined();
	expect(html).toContain(`id="${said}"`);
});

function stray(look: "list" | "line"): string {
	return render(Preference, {
		props: {
			label: "System",
			name: "system",
			value: "google-custom",
			source: "policy",
			declaration: { state: "missing" },
			look,
			choices,
		},
	}).body;
}

test("an unlisted effective value stays visible but unselectable", () => {
	const listed = stray("list");
	const extra = radios(listed).find(
		(one) => attribute(one, "data-choice") === "google-custom",
	);
	expect(extra).toBeDefined();
	expect(extra).toContain("disabled");
	expect(extra).toContain("checked");
	expect(listed).toContain("data-unlisted");
	const lined = stray("line");
	const found = (lined.match(/<option\b[^>]*>/g) ?? []).find(
		(one) => attribute(one, "data-choice") === "google-custom",
	);
	expect(found).toContain("disabled");
	expect(found).toContain("selected");
	expect(lined).toContain("data-unlisted");
	expect(lined).toContain('data-choice="google-accounts"');
});

test("the line shape renders one native select naming its label", () => {
	const html = render(Preference, {
		props: {
			label: "Tone",
			name: "tone",
			value: "light",
			source: "app",
			declaration: { state: "present", value: "light" },
			inherit: "follow shared",
			look: "line",
			choices: [
				{ value: "light", label: "Light" },
				{ value: "dark", label: "Dark" },
			],
		},
	}).body;
	expect(html).toContain("<select");
	expect(html).toContain(">follow shared</option>");
	expect(html).toContain('data-choice="light"');
	expect(html).toMatch(/<option value="v:light" selected/);
	expect(html).not.toMatch(/<option value="i:" selected/);
	expect(radios(html)).toEqual([]);
	const select = html.match(/<select\b[^>]*>/)?.[0] ?? "";
	const id = attribute(select, "id");
	expect(id).toBeDefined();
	expect(html).toContain(`for="${id}"`);
});
