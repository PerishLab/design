import {
	existsSync,
	mkdirSync,
	mkdtempSync,
	readdirSync,
	symlinkSync,
	writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { build } from "vite";
import { expect, test } from "vitest";
import { design } from "../../src/vite/lib.ts";
import { scan } from "../../src/vite/views.ts";

function root(name: string): string {
	return mkdtempSync(join(tmpdir(), `views-${name}-`));
}

function file(root: string, name: string): string {
	const path = join(root, "src", "views", name);
	mkdirSync(dirname(path), { recursive: true });
	writeFileSync(path, "<p>view</p>\n");
	return path;
}

test("maps", () => {
	const seat = root("maps");
	file(seat, "index.svelte");
	file(seat, "admin/index.svelte");
	file(seat, "actor/{actor}.svelte");
	expect(
		scan(join(seat, "src", "views"), false).map((route) => route.path),
	).toEqual(["/actor/{actor}", "/admin", "/"]);
});

test("lowercase", () => {
	const seat = root("lowercase");
	file(seat, "Admin.svelte");
	expect(() => scan(join(seat, "src", "views"), false)).toThrow(
		"path components must be lowercase",
	);
});

test("routes only", () => {
	const seat = root("only");
	file(seat, "home.svelte");
	const path = join(seat, "src", "views", "helper.ts");
	writeFileSync(path, "export const helper = 1;\n");
	expect(() => scan(join(seat, "src", "views"), false)).toThrow(
		"only route .svelte files are allowed",
	);
});

test("collision", () => {
	const seat = root("collision");
	file(seat, "actor/{actor}.svelte");
	file(seat, "actor/{id}.svelte");
	expect(() => scan(join(seat, "src", "views"), false)).toThrow(
		"conflicts with",
	);
});

test("login", () => {
	const seat = root("login");
	file(seat, "login.svelte");
	const folder = join(seat, "src", "views");
	expect(() => scan(folder)).toThrow("/login is provided by default");
	expect(scan(folder, false).map((route) => route.path)).toEqual(["/login"]);
});

test("virtual", () => {
	const seat = root("virtual");
	file(seat, "index.svelte");
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

test("optional", () => {
	const seat = root("optional");
	const plugin = design({ serve: false });
	plugin.configResolved({ root: seat });
	const files: string[] = [];
	plugin.generateBundle.call({
		addWatchFile() {},
		emitFile(file) {
			files.push(file.fileName);
		},
	});
	expect(files).toEqual(["health"]);
});

test("builds in memory", async () => {
	const seat = root("build");
	const require = createRequire(join(process.cwd(), "package.json"));
	const runtime = dirname(require.resolve("svelte/package.json"));
	mkdirSync(join(seat, "node_modules"));
	symlinkSync(runtime, join(seat, "node_modules", "svelte"), "dir");
	file(seat, "index.svelte");
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
		plugins: [design({ login: false }), svelte()],
	});
	expect(existsSync(join(seat, "dist", "health"))).toBe(true);
	expect(existsSync(join(seat, "dist", ".perish", "server.mjs"))).toBe(true);
	expect(readdirSync(join(seat, "src"))).toEqual(["main.ts", "views"]);
});
