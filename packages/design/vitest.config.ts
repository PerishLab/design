import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defaultServerConditions } from "vite";
import { defineConfig } from "vitest/config";
import { design } from "./src/vite/lib.ts";

export default defineConfig({
	plugins: [
		design({ login: false, serve: false }),
		svelte({ configFile: false }),
	],
	ssr: { resolve: { conditions: ["source", ...defaultServerConditions] } },
	test: {
		fsModuleCache: true,
		include: ["tests/**/*.test.ts"],
	},
});
