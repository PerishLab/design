import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { execPath } from "node:process";
import { design } from "@perishlab/design/vite";
import { expect, test } from "vitest";

function runtime(): string {
	const seat = mkdtempSync(join(tmpdir(), "server-views-"));
	for (const name of ["index.svelte", "actor/{actor}.svelte"]) {
		const path = join(seat, "src", "views", name);
		mkdirSync(dirname(path), { recursive: true });
		writeFileSync(path, "<p>view</p>\n");
	}
	const plugin = design();
	plugin.configResolved({ root: seat });
	let source = "";
	plugin.generateBundle.call({
		addWatchFile() {},
		emitFile(file) {
			if (file.fileName === ".perish/server.mjs") source = file.source;
		},
	});
	return source;
}

async function launch(root: string): Promise<{
	close(): Promise<void>;
	endpoint: string;
}> {
	const script = join(root, "server.mjs");
	writeFileSync(script, runtime());
	const child = spawn(execPath, [script, root], {
		env: { HOST: "127.0.0.1", PORT: "0" },
		stdio: ["ignore", "pipe", "pipe"],
	});
	const endpoint = await new Promise<string>((resolve, reject) => {
		let held = "";
		child.stdout.on("data", (chunk: Buffer) => {
			held += chunk.toString();
			const line = held.split("\n")[0];
			if (line !== "") {
				resolve(JSON.parse(line).endpoint);
			}
		});
		child.once("error", reject);
		child.once("exit", (code) => reject(new Error(`server exited ${code}`)));
	});
	return {
		endpoint,
		async close(): Promise<void> {
			child.kill("SIGTERM");
			const [code] = await once(child, "exit");
			if (code !== 0) {
				throw new Error(`server stopped ${code}`);
			}
		},
	};
}

test("serves", async () => {
	const root = mkdtempSync(join(tmpdir(), "server-"));
	mkdirSync(join(root, "assets"));
	writeFileSync(join(root, "index.html"), "<main>shell</main>\n");
	writeFileSync(join(root, "health"), '{"name":"specimen"}\n');
	writeFileSync(join(root, "assets", "app.js"), "export {};\n");
	const server = await launch(root);
	try {
		const health = await fetch(`${server.endpoint}/health`);
		expect(health.status).toBe(200);
		expect(health.headers.get("content-type")).toContain("application/json");
		expect(await health.json()).toEqual({ name: "specimen" });

		const route = await fetch(`${server.endpoint}/actor/ada`, {
			headers: { accept: "text/html" },
		});
		expect(route.status).toBe(200);
		expect(await route.text()).toContain("shell");

		const login = await fetch(`${server.endpoint}/login/`, {
			headers: { accept: "text/html" },
		});
		expect(login.status).toBe(200);

		const missing = await fetch(`${server.endpoint}/actor`, {
			headers: { accept: "text/html" },
		});
		expect(missing.status).toBe(404);
		expect(await missing.text()).toContain("shell");

		const asset = await fetch(`${server.endpoint}/assets/app.js`);
		expect(asset.status).toBe(200);
		expect(asset.headers.get("cache-control")).toContain("immutable");

		for (const path of [
			"/assets/missing.js",
			"/api/health",
			"/.perish/server.mjs",
		]) {
			expect((await fetch(server.endpoint + path)).status).toBe(404);
		}

		expect(
			(
				await fetch(server.endpoint, {
					method: "POST",
				})
			).status,
		).toBe(405);
	} finally {
		await server.close();
	}
});
