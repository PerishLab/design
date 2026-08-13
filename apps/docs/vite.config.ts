import { fileURLToPath } from "node:url";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import { design } from "../../packages/design/src/vite/lib.ts";

export default defineConfig({
	plugins: [design({ serve: false }), svelte()],
	resolve: {
		alias: [
			{
				find: "@perish/design/vite",
				replacement: fileURLToPath(
					new URL("../../packages/design/src/vite/lib.ts", import.meta.url),
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
