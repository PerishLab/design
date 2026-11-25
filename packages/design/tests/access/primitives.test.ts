import {
	Button,
	Drawer,
	Field,
	Menu,
	Modal,
	Nav,
	Note,
	Schema,
	Section,
	Table,
	Vault,
} from "@perishlab/design";
import { createRawSnippet as snippet } from "svelte";
import { render } from "svelte/server";
import { expect, test } from "vitest";

const sample = {
	$defs: {
		Owner: {
			type: "object",
			required: ["email"],
			properties: {
				email: {
					type: "string",
					format: "email",
					description: "Primary contact address",
				},
				role: {
					type: "string",
					enum: ["admin", "member"],
					default: "member",
				},
			},
		},
		Loop: {
			type: "object",
			properties: {
				next: { $ref: "#/$defs/Loop" },
			},
		},
	},
	type: "object",
	required: ["id", "owner"],
	properties: {
		id: { type: "string", description: "Stable client identifier" },
		owner: { $ref: "#/$defs/Owner" },
		tags: { type: "array", items: { type: "string" } },
		loop: { $ref: "#/$defs/Loop" },
	},
};

test("schema resolves refs, required flags, enums, defaults, payload, and guards cycles", () => {
	const tree = render(Schema, {
		props: {
			title: "Client schema",
			schema: sample,
			data: {
				id: "cli_01",
				owner: { email: "ada@perish.uk", role: "admin" },
				tags: ["oidc"],
			},
		},
	}).body;
	expect(tree).toContain("Client schema");
	expect(tree).toContain('aria-pressed="true"');
	expect(tree).toContain("required");
	expect(tree).toContain("cli_01");
	expect(tree).toContain("Stable client identifier");
	expect(tree).toContain("ada@perish.uk");
	expect(tree).toContain("string · email");
	expect(tree).toContain("default: member");
	expect(tree).toContain("enum: admin, member");
	expect(tree).toContain("oidc");
	expect(tree).toContain("next");
	const raw = render(Schema, {
		props: { title: "Client schema", schema: sample, mode: "raw" },
	}).body;
	expect(raw).toContain("schema-raw");
	expect(raw).toContain("$defs");
});

test("schema resolves chained refs, guards prototype keys, and handles empty or invalid inputs", () => {
	const chained = {
		$defs: {
			Leaf: { type: "string", format: "uri", description: "Base target" },
			Alias: { $ref: "#/$defs/Leaf" },
		},
		type: "object",
		properties: {
			endpoint: {
				$ref: "#/$defs/Alias",
				description: "Overridden sibling note",
			},
			proto: { $ref: "#/$defs/constructor" },
			dunder: { $ref: "#/__proto__" },
		},
	};
	const html = render(Schema, {
		props: { title: "Chained", schema: chained },
	}).body;
	expect(html).toContain("string · uri");
	expect(html).toContain("Overridden sibling note");
	expect(html).not.toContain("function Object");
	const empty = render(Schema, {
		props: { title: "Empty", schema: {} },
	}).body;
	expect(empty).toContain("schema-empty");
	const invalid = render(Schema, {
		props: {
			title: "Invalid",
			schema: null as unknown as Record<string, unknown>,
		},
	}).body;
	expect(invalid).toContain("schema-empty");
});

test("drawer, modal, and vault expose dialog, warning, empty, and reveal semantics", () => {
	const drawer = render(Drawer, {
		props: {
			title: "Inspect client",
			line: "OIDC application",
			open: true,
			children: snippet(() => ({ render: () => "<p>body</p>" })),
			foot: snippet(() => ({ render: () => "<button>Done</button>" })),
		},
	}).body;
	const dialog = drawer.match(/<dialog\b[^>]*>/)?.[0] ?? "";
	const heading = dialog.match(/aria-labelledby="([^"]+)"/)?.[1];
	expect(dialog).toContain('tabindex="-1"');
	expect(heading).toBeTruthy();
	expect(drawer).toContain(`id="${heading}"`);
	expect(drawer).toContain("drawer-foot");
	const modal = render(Modal, {
		props: {
			title: "Revoke client",
			mood: "warn",
			open: true,
			children: snippet(() => ({ render: () => "irreversible" })),
			foot: snippet(() => ({ render: () => "actions" })),
		},
	}).body;
	expect(modal).toContain("modal-warn");
	expect(modal).toContain("modal-foot");
	const blank = render(Vault, {
		props: {
			title: "Recovery codes",
			codes: [],
			file: "codes.txt",
		},
	}).body;
	expect(blank).toContain("vault-empty");
	expect(blank).not.toContain("••••");
	expect(blank).not.toContain("vault-cue");
	const masked = render(Vault, {
		props: {
			title: "Recovery codes",
			codes: ["ABCD-1234", "EFGH-5678"],
			file: "codes.txt",
			check: "I saved these codes",
		},
	}).body;
	expect(masked).toContain('aria-pressed="false"');
	expect(masked).not.toContain("ABCD-1234");
	expect(masked).toContain("I saved these codes");
	const open = render(Vault, {
		props: {
			title: "Recovery codes",
			codes: ["ABCD-1234"],
			shown: true,
		},
	}).body;
	expect(open).toContain('aria-pressed="true"');
	expect(open).toContain("ABCD-1234");
});

test("section, field, note, button, nav, menu, and table render extended semantics", () => {
	const section = render(Section, {
		props: {
			title: "Redirect URIs",
			line: "HTTPS endpoints only",
			children: snippet(() => ({ render: () => "fields" })),
		},
	}).body;
	expect(section).toContain("<fieldset");
	expect(section).toContain("<legend");
	const area = render(Field, {
		props: {
			label: "Notes",
			kind: "area",
			help: "Optional description",
			error: "Too long",
		},
	}).body;
	expect(area).toContain("<textarea");
	expect(area).toContain("field-help");
	expect(area).toContain("field-error");
	const hold = render(Note, {
		props: {
			mood: "hold",
			code: "409",
			title: "Version conflict",
			text: "Reload before saving again.",
		},
	}).body;
	expect(hold).toContain("note-hold");
	expect(hold).toContain("409");
	expect(hold).toContain("Version conflict");
	const warn = render(Button, {
		props: { label: "Revoke", mood: "warn" },
	}).body;
	expect(warn).toContain("button-warn");
	const crumb = render(Nav, {
		props: {
			look: "crumb",
			links: [
				{ label: "Workspace", href: "#root" },
				{ label: "Clients", href: "#clients", live: true },
			],
		},
	}).body;
	expect(crumb).toContain("<ol");
	expect(crumb).toContain('aria-current="page"');
	const menu = render(Menu, {
		props: {
			label: "Account",
			kind: "action",
			open: true,
			items: [{ value: "out", label: "Sign out", mood: "warn", sign: "away" }],
		},
	}).body;
	expect(menu).toContain('role="menuitem"');
	expect(menu).toContain("menu-warn");
	const sorted = render(Table, {
		props: {
			heads: ["Name", "State"],
			rows: [["Alpha", "Active"]],
			sort: "Name",
			order: "desc",
			reorder: () => {},
			selected: 0,
			pick: () => {},
			label: "Clients",
		},
	}).body;
	expect(sorted).toContain('role="region"');
	expect(sorted).toContain('tabindex="0"');
	expect(sorted).toContain('aria-sort="descending"');
	expect(sorted).toContain('aria-current="true"');
	expect(sorted).not.toContain("aria-selected");
	const loading = render(Table, {
		props: { heads: ["Name"], rows: [], state: "loading" },
	}).body;
	expect(loading).toContain('aria-busy="true"');
	expect(loading).toContain("table-bone");
	const fault = render(Table, {
		props: {
			heads: ["Name"],
			rows: [],
			state: "error",
			note: "Service unavailable",
			retry: () => {},
		},
	}).body;
	expect(fault).toContain("Service unavailable");
	expect(fault).toContain("Retry");
});
