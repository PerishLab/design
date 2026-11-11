import { Check, Nav, Pick, Search, Tabs } from "@perishlab/design";
import { render } from "svelte/server";
import { expect, test } from "vitest";
import Fields from "./Fields.svelte";

function attribute(tag: string, name: string): string | undefined {
	return tag.match(new RegExp(`${name}="([^"]+)"`))?.[1];
}

test("field errors refer to distinct native input identities", () => {
	const html = render(Fields).body;
	const inputs = html.match(/<input\b[^>]*>/g) ?? [];
	expect(inputs).toHaveLength(2);
	const ids = inputs.map((input) => attribute(input, "id"));
	expect(ids.every(Boolean)).toBe(true);
	expect(new Set(ids).size).toBe(2);
	const input = inputs[0] ?? "";
	expect(input).toContain('aria-invalid="true"');
	expect(input).toMatch(/\brequired\b/);
	const error = attribute(input, "aria-describedby");
	expect(error).toBeTruthy();
	expect(html).toContain(`id="${error}"`);
	expect(html).toContain(`for="${ids[0]}"`);
	expect(inputs[1]).toMatch(/\breadonly\b/);
});

test("client forms preserve native semantics and expose pending work", () => {
	const html = render(Fields, { props: { busy: true } }).body;
	const form = html.match(/<form\b[^>]*>/)?.[0] ?? "";
	expect(form).toContain('aria-label="Edit record"');
	expect(form).toContain('aria-busy="true"');
	expect(form).toMatch(/\bnovalidate\b/);
	expect(
		(html.match(/<input\b[^>]*>/g) ?? []).every((input) =>
			/\bdisabled\b/.test(input),
		),
	).toBe(true);
});

test("tabs name and control the selected panel", () => {
	const html = render(Fields).body;
	const tab =
		(html.match(/<button\b[^>]*>/g) ?? []).find((button) =>
			button.includes('aria-selected="true"'),
		) ?? "";
	const panel = html.match(/<div\b[^>]*role="tabpanel"[^>]*>/)?.[0] ?? "";
	expect(attribute(tab, "aria-controls")).toBe(attribute(panel, "id"));
	expect(attribute(panel, "aria-labelledby")).toBe(attribute(tab, "id"));
	expect(html).toContain('aria-label="Record scope"');
});

test("unset tab values leave one reachable active tab", () => {
	const html = render(Tabs, {
		props: {
			tabs: [
				{ value: "a", label: "Alpha" },
				{ value: "b", label: "Beta" },
			],
		},
	}).body;
	const buttons = html.match(/<button\b[^>]*>/g) ?? [];
	expect(
		buttons.filter((button) => button.includes('tabindex="0"')),
	).toHaveLength(1);
	expect(buttons[0]).toContain('aria-selected="true"');
});

test("search names remain explicit when its value replaces the placeholder", () => {
	const html = render(Search, {
		props: { label: "Filter records", hint: "Type a title", value: "draft" },
	}).body;
	expect(html).toContain('aria-label="Filter records"');
	expect(render(Search, { props: { hint: "Legacy filter" } }).body).toContain(
		'aria-label="Legacy filter"',
	);
});

test("native choice controls honour disabled state", () => {
	expect(
		render(Check, { props: { label: "Starred", disabled: true } }).body,
	).toMatch(/<input\b[^>]*\bdisabled\b/);
	expect(
		render(Pick, {
			props: {
				label: "Status",
				choices: [{ value: "draft", label: "Draft" }],
				disabled: true,
			},
		}).body,
	).toMatch(/<select\b[^>]*\bdisabled\b/);
});

test("navigation identifies the current destination", () => {
	const html = render(Nav, {
		props: {
			links: [
				{ label: "Records", href: "/records", live: true },
				{ label: "Guide", href: "/guide" },
			],
		},
	}).body;
	expect(html.match(/aria-current="page"/g)).toHaveLength(1);
});
