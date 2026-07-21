import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vitest";
import { design } from "../src/lib";

const plugin = design();
const seat = mkdtempSync(join(tmpdir(), "design-"));

function file(name: string, body = ""): string {
	const path = join(seat, name);
	writeFileSync(path, body);
	return path;
}

const paired = file("Card.tsx", "export const Card = 1;\n");
file("Card.scss", ".card {}\n");
const lone = file("Grid.tsx", "export const Grid = 1;\n");

test("injects", () => {
	const out = plugin.transform("export const Card = 1;\n", paired);
	expect(out?.code).toBe('import "./Card.scss";\nexport const Card = 1;\n');
});

test("lonely", () => {
	expect(plugin.transform("export const Grid = 1;\n", lone)).toBeNull();
});

test("query", () => {
	const out = plugin.transform("export const Card = 1;\n", `${paired}?v=abc`);
	expect(out?.code.startsWith('import "./Card.scss";')).toBe(true);
});

test("idempotent", () => {
	const once = plugin.transform("export const Card = 1;\n", paired);
	expect(plugin.transform(once?.code ?? "", paired)).toBeNull();
});

test("sources", () => {
	expect(plugin.transform("", join(seat, "Card.scss"))).toBeNull();
	expect(plugin.transform("", join(seat, "data.json"))).toBeNull();
});

test("unpins", () => {
	const code = 'import { useState } from "npm:react@^19.2.7";';
	const out = plugin.transform(code, lone);
	expect(out?.code).toBe('import { useState } from "react";');
});

test("subpath", () => {
	const code =
		'/** @jsxImportSource npm:react@^19.2.7 */\nimport "npm:react@^19.2.7/jsx-runtime";';
	const out = plugin.transform(code, lone);
	expect(out?.code).toBe(
		'/** @jsxImportSource react */\nimport "react/jsx-runtime";',
	);
});

test("scoped", () => {
	const code = '/* @ts-types="npm:@types/react@^19.2.17" */';
	const out = plugin.transform(code, lone);
	expect(out?.code).toBe('/* @ts-types="@types/react" */');
});

test("intact", () => {
	const code = 'import { x } from "react";';
	expect(plugin.transform(code, lone)).toBeNull();
});
