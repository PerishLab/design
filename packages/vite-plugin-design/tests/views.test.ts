import {
	existsSync,
	mkdirSync,
	mkdtempSync,
	readdirSync,
	writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { build } from "vite";
import { expect, test } from "vitest";
import { design } from "../src/lib";
import { scan } from "../src/views";

function root(name: string): string {
	return mkdtempSync(join(tmpdir(), `views-${name}-`));
}

function file(root: string, name: string): string {
	const path = join(root, "src", "views", name);
	mkdirSync(dirname(path), { recursive: true });
	writeFileSync(path, "export default function View() { return null; }\n");
	return path;
}

test("maps", () => {
	const seat = root("maps");
	file(seat, "index.tsx");
	file(seat, "admin/index.tsx");
	file(seat, "actor/{actor}.tsx");
	expect(
		scan(join(seat, "src", "views"), false).map((route) => route.path),
	).toEqual(["/actor/{actor}", "/admin", "/"]);
});

test("lowercase", () => {
	const seat = root("lowercase");
	file(seat, "Admin.tsx");
	expect(() => scan(join(seat, "src", "views"), false)).toThrow(
		"path components must be lowercase",
	);
});

test("routes only", () => {
	const seat = root("only");
	file(seat, "home.tsx");
	const path = join(seat, "src", "views", "helper.ts");
	writeFileSync(path, "export const helper = 1;\n");
	expect(() => scan(join(seat, "src", "views"), false)).toThrow(
		"only route .tsx files are allowed",
	);
});

test("collision", () => {
	const seat = root("collision");
	file(seat, "actor/{actor}.tsx");
	file(seat, "actor/{id}.tsx");
	expect(() => scan(join(seat, "src", "views"), false)).toThrow(
		"conflicts with",
	);
});

test("login", () => {
	const seat = root("login");
	file(seat, "login.tsx");
	const folder = join(seat, "src", "views");
	expect(() => scan(folder)).toThrow("/login is provided by default");
	expect(scan(folder, false).map((route) => route.path)).toEqual(["/login"]);
});

test("virtual", () => {
	const seat = root("virtual");
	file(seat, "index.tsx");
	const plugin = design({ login: false });
	plugin.configResolved({ root: seat });
	const id = plugin.resolveId("virtual:perish/views");
	expect(id).toBe("\0virtual:perish/views");
	const code = plugin.load(id ?? "");
	expect(code).toContain('path:"/"');
	expect(code).toContain("login:false");
	expect(plugin.load("\0virtual:perish/view/%2F")).toContain(
		'export { default } from "',
	);
});

test("builds in memory", async () => {
	const seat = root("build");
	file(seat, "index.tsx");
	writeFileSync(
		join(seat, "index.html"),
		'<script type="module" src="/src/main.ts"></script>\n',
	);
	writeFileSync(
		join(seat, "src", "main.ts"),
		'import source from "virtual:perish/views";\nsource.views[0]?.load();\n',
	);
	await build({
		root: seat,
		logLevel: "silent",
		plugins: [design({ login: false })],
	});
	expect(existsSync(join(seat, "dist", "health"))).toBe(true);
	expect(readdirSync(join(seat, "src"))).toEqual(["main.ts", "views"]);
});
