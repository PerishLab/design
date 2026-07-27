export type Env = {
	build: string;
	port?: number;
	target?: string;
	version?: string;
};

function port(raw: string): number {
	const held = Number(raw);
	if (!Number.isSafeInteger(held) || held < 1 || held > 65535) {
		throw new Error(`invalid SIDECAR_PORT: ${raw}`);
	}
	return held;
}

export function config(): Env {
	const raw = process.env.SIDECAR_PORT;
	return {
		build: process.env.BUILD_COMMIT ?? "",
		port: raw === undefined ? undefined : port(raw),
		target: process.env.API_URL,
		version: process.env.BUILD_VERSION,
	};
}
