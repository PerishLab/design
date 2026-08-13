import { svelte } from "@sveltejs/vite-plugin-svelte";
import { createServer } from "vite";

const server = await createServer({
	root: process.cwd(),
	plugins: [svelte()],
	server: { middlewareMode: true },
});

try {
	await server.ssrLoadModule("/probe.js");
} finally {
	await server.close();
}
