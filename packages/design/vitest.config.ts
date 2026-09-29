import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defaultServerConditions } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [svelte()],
	ssr: { resolve: { conditions: ["source", ...defaultServerConditions] } },
	test: {
		include: ["tests/**/*.test.ts"],
	},
});
