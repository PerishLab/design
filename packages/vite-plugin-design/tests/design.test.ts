import { existsSync, mkdtempSync, writeFileSync } from "node:fs";
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

test("virtual", () => {
	expect(plugin.resolveId("virtual:perish-design/font")).toBe(
		"\0virtual:perish-design/font",
	);
	expect(plugin.resolveId("./Card.scss")).toBeNull();
	expect(plugin.load("./Card.scss")).toBeNull();
});

test("font", () => {
	const id = plugin.resolveId("virtual:perish-design/font") ?? "";
	const code = plugin.load(id) ?? "";
	const found = /^import (".*");\n$/.exec(code);
	const target = JSON.parse(found?.[1] ?? '""');
	expect(target).toMatch(/600\.css$/);
	expect(target.startsWith("/")).toBe(true);
	expect(existsSync(target)).toBe(true);
});
