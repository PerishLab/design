import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig, type Plugin } from "vite";
import { design } from "../../packages/design/src/vite/lib.ts";

const made = JSON.parse(
	readFileSync(
		fileURLToPath(
			new URL("../../packages/design/package.json", import.meta.url),
		),
		"utf8",
	),
) as { version: string; license: string };

function cut(): string {
	try {
		const held = execFileSync("git", ["rev-parse", "--short", "HEAD"], {
			encoding: "utf8",
		}).trim();
		const dirty = execFileSync("git", ["status", "--porcelain"], {
			encoding: "utf8",
		}).trim();
		return dirty === "" ? held : `${held}+`;
	} catch {
		return "loose";
	}
}

function stamped(): Plugin {
	const name = "virtual:stamp";
	const seat = `\0${name}`;
	return {
		name: "stamp",
		resolveId: (seen) => (seen === name ? seat : undefined),
		load: (seen) =>
			seen === seat
				? `export const stamp = ${JSON.stringify(
						`@perish/design ${made.version} · ${made.license} · ${cut()}`,
					)};`
				: undefined,
		handleHotUpdate({ server, modules }) {
			const held = server.moduleGraph.getModuleById(seat);
			if (held === undefined) return modules;
			server.moduleGraph.invalidateModule(held);
			return [...modules, held];
		},
	};
}

export default defineConfig({
	plugins: [stamped(), design({ serve: false }), svelte()],
	resolve: {
		alias: [
			{
				find: "@perish/design/vite",
				replacement: fileURLToPath(
					new URL("../../packages/design/src/vite/lib.ts", import.meta.url),
				),
			},
			{
				find: "@perish/bone",
				replacement: fileURLToPath(
					new URL("../../packages/bone/src/lib.ts", import.meta.url),
				),
			},
			{
				find: "@perish/design",
				replacement: fileURLToPath(
					new URL("../../packages/design/src/lib.ts", import.meta.url),
				),
			},
		],
	},
});
