import { dirname, relative } from "node:path";
import { design } from "@perishlab/design/vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { build, defaultClientConditions, type Rollup } from "vite";

export type Piece = {
	pack: string;
	room: string;
	name: string;
	code: string;
	sheet: string;
};

const packs = ["@perishlab/design", "@perishlab/bone"];
const entry = "virtual:shipped";

function door(roots: Map<string, string>) {
	return {
		name: "shipped",
		async buildStart(this: Rollup.PluginContext) {
			for (const pack of packs) {
				const found = await this.resolve(pack);
				if (found !== null) roots.set(pack, dirname(found.id));
			}
		},
		resolveId: (id: string) => (id === entry ? `\0${entry}` : null),
		load: (id: string) =>
			id === `\0${entry}`
				? packs.map((pack) => `export * from "${pack}";`).join("\n")
				: null,
	};
}

function place(
	roots: Map<string, string>,
	id: string,
): { pack: string; room: string; name: string } | undefined {
	if (!id.endsWith(".svelte")) return undefined;
	for (const [pack, root] of roots) {
		const seat = relative(root, id);
		if (seat.startsWith("..")) continue;
		const steps = seat.slice(0, -7).split(/[\\/]/);
		return {
			pack,
			room: steps.length > 1 ? steps[0] : "",
			name: steps.at(-1) ?? "",
		};
	}
	return undefined;
}

export async function shipped(): Promise<Piece[]> {
	const roots = new Map<string, string>();
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
				input: entry,
				preserveEntrySignatures: "strict",
				output: { preserveModules: true },
			},
		},
	})) as Rollup.RollupOutput;
	const sheets = new Map<string, string>();
	for (const one of out.output)
		if (one.type === "asset" && one.fileName.endsWith(".css"))
			sheets.set(one.fileName, String(one.source));
	const pieces: Piece[] = [];
	for (const one of out.output) {
		if (one.type !== "chunk") continue;
		const seat = place(roots, one.facadeModuleId ?? "");
		if (seat === undefined) continue;
		const worn = [...(one.viteMetadata?.importedCss ?? [])];
		pieces.push({
			...seat,
			code: one.code,
			sheet: worn.map((name) => sheets.get(name) ?? "").join("\n"),
		});
	}
	return pieces;
}
