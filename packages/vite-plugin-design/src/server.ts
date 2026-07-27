export function runtime(): string {
	return String.raw`import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { basename, extname, join, relative, resolve, sep } from "node:path";

const root = resolve(process.argv[2] ?? "dist");
const host = process.env.HOST ?? "0.0.0.0";
const port = Number(process.env.PORT ?? "8080");
const kinds = new Map([
	[".css", "text/css; charset=utf-8"],
	[".gif", "image/gif"],
	[".html", "text/html; charset=utf-8"],
	[".ico", "image/x-icon"],
	[".jpeg", "image/jpeg"],
	[".jpg", "image/jpeg"],
	[".js", "text/javascript; charset=utf-8"],
	[".json", "application/json; charset=utf-8"],
	[".map", "application/json; charset=utf-8"],
	[".mjs", "text/javascript; charset=utf-8"],
	[".png", "image/png"],
	[".svg", "image/svg+xml"],
	[".txt", "text/plain; charset=utf-8"],
	[".webp", "image/webp"],
	[".woff", "font/woff"],
	[".woff2", "font/woff2"],
]);

if (!Number.isInteger(port) || port < 0 || port > 65535) {
	throw new Error("PORT must be an integer from 0 through 65535");
}

function reply(res, status, body) {
	res.statusCode = status;
	res.setHeader("content-type", "text/plain; charset=utf-8");
	res.setHeader("x-content-type-options", "nosniff");
	res.end(body);
}

function locate(pathname) {
	let name;
	try {
		name = decodeURIComponent(pathname);
	} catch {
		return undefined;
	}
	if (name.includes("\0") || name.includes("\\")) {
		return undefined;
	}
	const path = resolve(root, "." + name);
	return path === root || path.startsWith(root + sep) ? path : undefined;
}

function headers(path, size) {
	const name = relative(root, path);
	const type = basename(path) === "health"
		? "application/json; charset=utf-8"
		: kinds.get(extname(path)) ?? "application/octet-stream";
	const cache = name === "health"
		? "no-store"
		: name.startsWith("assets" + sep)
			? "public, max-age=31536000, immutable"
			: "no-cache";
	return { type, cache, size };
}

async function send(path, res, head) {
	let info;
	try {
		info = await stat(path);
	} catch (error) {
		if (error && typeof error === "object" && error.code === "ENOENT") {
			return false;
		}
		throw error;
	}
	if (info.isDirectory()) {
		return send(join(path, "index.html"), res, head);
	}
	if (!info.isFile()) {
		return false;
	}
	const held = headers(path, info.size);
	res.statusCode = 200;
	res.setHeader("cache-control", held.cache);
	res.setHeader("content-length", String(held.size));
	res.setHeader("content-type", held.type);
	res.setHeader("x-content-type-options", "nosniff");
	if (head) {
		res.end();
	} else {
		createReadStream(path).pipe(res);
	}
	return true;
}

async function route(req, res) {
	const method = req.method ?? "GET";
	if (method !== "GET" && method !== "HEAD") {
		res.setHeader("allow", "GET, HEAD");
		reply(res, 405, "method not allowed\n");
		return;
	}
	const pathname = new URL(req.url ?? "/", "http://web").pathname;
	if (
		pathname === "/api" ||
		pathname.startsWith("/api/") ||
		pathname === "/.perish" ||
		pathname.startsWith("/.perish/")
	) {
		reply(res, 404, "not found\n");
		return;
	}
	const path = locate(pathname);
	if (path === undefined) {
		reply(res, 400, "bad request\n");
		return;
	}
	const head = method === "HEAD";
	if (await send(path, res, head)) {
		return;
	}
	const accept = req.headers.accept ?? "";
	if (accept.split(",").some((type) => type.trim().startsWith("text/html"))) {
		if (await send(join(root, "index.html"), res, head)) {
			return;
		}
	}
	reply(res, 404, "not found\n");
}

const server = createServer((req, res) => {
	void route(req, res).catch((error) => {
		console.error(error);
		if (res.headersSent) {
			res.destroy(error);
		} else {
			reply(res, 500, "internal server error\n");
		}
	});
});

server.listen(port, host, () => {
	const address = server.address();
	const live = typeof address === "object" && address !== null ? address.port : port;
	process.stdout.write(
		JSON.stringify({ role: "web", endpoint: "http://127.0.0.1:" + live }) + "\n",
	);
});
`;
}
