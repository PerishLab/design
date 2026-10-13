import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defaultServerConditions } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [svelte({ configFile: false })],
	ssr: { resolve: { conditions: ["source", ...defaultServerConditions] } },
	test: {
		fsModuleCache: true,
		include: ["tests/**/*.test.ts"],
		server: { deps: { inline: ["@perishlab/crest"] } },
	},
});
