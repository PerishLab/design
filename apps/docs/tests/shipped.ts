import { dirname, relative } from "node:path";
import { design } from "@perishlab/design/vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { build, defaultClientConditions, type Rollup } from "vite";
import config from "../vite.config.ts";

export type Piece = { room: string; name: string; styled: boolean };

const pack = "@perishlab/design";

function door(roots: string[]) {
	return {
		name: "shipped",
		async buildStart(this: Rollup.PluginContext) {
			const found = await this.resolve(pack);
			if (found !== null) roots.push(dirname(found.id));
		},
	};
}

export async function shipped(): Promise<Piece[]> {
	const roots: string[] = [];
	const out = (await build({
		configFile: false,
		logLevel: "silent",
		plugins: [door(roots), design({ serve: false }), svelte()],
		resolve: { conditions: ["source", ...defaultClientConditions] },
		build: {
			write: false,
			minify: false,
			cssMinify: false,
			rollupOptions: {
				input: pack,
				preserveEntrySignatures: "strict",
				output: { preserveModules: true },
			},
		},
	})) as Rollup.RollupOutput;
	const pieces: Piece[] = [];
	for (const one of out.output) {
		const id = one.type === "chunk" ? (one.facadeModuleId ?? "") : "";
		if (one.type !== "chunk" || !id.endsWith(".svelte")) continue;
		const steps = relative(roots[0] ?? "", id)
			.slice(0, -7)
			.split(/[\\/]/);
		if (steps[0] === "..") continue;
		pieces.push({
			room: steps[0],
			name: steps.at(-1) ?? "",
			styled: (one.viteMetadata?.importedCss.size ?? 0) > 0,
		});
	}
	return pieces;
}

export async function site(): Promise<Map<string, string | Uint8Array>> {
	const out = (await build({
		...config,
		configFile: false,
		logLevel: "silent",
		build: { write: false },
	})) as Rollup.RollupOutput;
	const files = new Map<string, string | Uint8Array>();
	for (const one of out.output)
		files.set(one.fileName, one.type === "asset" ? one.source : one.code);
	return files;
}
