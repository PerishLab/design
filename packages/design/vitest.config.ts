import { fileURLToPath } from "node:url";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [svelte()],
	resolve: {
		alias: [
			{
				find: "@perish/bone",
				replacement: fileURLToPath(
					new URL("../bone/src/lib.ts", import.meta.url),
				),
			},
		],
	},
	test: {
		include: ["tests/**/*.test.ts"],
	},
});
