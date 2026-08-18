import { client } from "@perish/sidecar";

export type Env = {
	build: string;
	port?: number;
	target?: string;
	version?: string;
};

export async function config(): Promise<Env> {
	const held = await client.connect();
	return {
		build: process.env.BUILD_COMMIT ?? "",
		port: held.control.port(),
		target: process.env.API_URL,
		version: process.env.BUILD_VERSION,
	};
}
