import { readFileSync } from "node:fs";
import { basename, join } from "node:path";
import type { Env } from "./config.js";

type Pack = {
	name?: string;
	version?: string;
};

export function health(root: string, env: Env): string {
	let pack: Pack = {};
	try {
		pack = JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as Pack;
	} catch {
		pack = {};
	}
	const name = pack.name ?? basename(root);
	const version = env.version ?? pack.version ?? "0.0.0";
	const build = env.build || version;
	return `${JSON.stringify({ name, version, build })}\n`;
}
