import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defaultServerConditions } from "vite";
import { defineConfig } from "vitest/config";

const entry = "@perishlab/design/vite";

export default defineConfig(async () => ({
	plugins: [
		...(process.env.VITEST
			? [
					(await import(entry)).design({
						login: false,
						serve: false,
					}),
				]
			: []),
		svelte({ configFile: false }),
	],
	ssr: { resolve: { conditions: ["source", ...defaultServerConditions] } },
	test: {
		fsModuleCache: true,
		include: ["tests/**/*.test.ts"],
		server: { deps: { inline: ["@perishlab/crest"] } },
	},
}));
