import { isAbsolute, join, relative } from "node:path";
import { NodePackageImporter } from "sass";
import { type Brand, head, material, paths } from "./brand.js";
import { config, type Env } from "./config.js";
import { health } from "./health.js";
import { runtime } from "./server.js";
import { type Route, scan } from "./views.js";

type Next = () => void;
type Request = { url?: string };
type Reply = {
	end(body: string | Buffer): void;
} & Record<"setHeader", (name: string, value: string) => void> &
	Record<"statusCode", number>;
type Middle = (req: Request, res: Reply, next: Next) => void;
type Module = object;
type Graph = Record<"getModuleById", (id: string) => Module | undefined> &
	Record<"invalidateModule", (node: Module) => void>;
type Server = {
	middlewares: { use(middle: Middle): void };
	watcher: {
		on(event: "add" | "unlink", run: (file: string) => void): void;
	};
	ws: { send(event: object): void };
} & Record<"moduleGraph", Graph>;
type Asset = {
	type: "asset";
	source: string | Buffer;
} & Record<"fileName", string>;
type Context = Record<"addWatchFile", (path: string) => void> &
	Record<"emitFile", (file: Asset) => void>;
type Config = {
	root: string;
	base?: string;
};
type Options = {
	login?: boolean;
	serve?: boolean;
	brand?: Brand;
};
type Plugin = {
	name: string;
	enforce: "pre";
	config(): Promise<object>;
	load(id: string): string | null;
} & Record<"configResolved", (config: Config) => void> &
	Record<"buildStart", (this: Context) => void> &
	Record<"resolveId", (id: string) => string | null> &
	Record<"configureServer", (server: Server) => void> &
	Record<"configurePreviewServer", (server: Server) => void> &
	Record<"generateBundle", (this: Context) => void> &
	Record<"transformIndexHtml", () => ReturnType<typeof head>>;

const PUBLIC = "virtual:perish/views";
const PRIVATE = `\0${PUBLIC}`;
const face = "virtual:perish/view/";
const inside = `\0${face}`;

function proxy(target: string): object {
	return { "^/api(?:/|$)": { target } };
}

function wiring(env: Env): object {
	const server: Record<string, unknown> = {};
	if (env.port !== undefined) {
		server.port = env.port;
		server.strictPort = true;
	}
	if (env.target !== undefined) {
		server.proxy = proxy(env.target);
	}
	const shared = {
		css: {
			preprocessorOptions: {
				scss: { importers: [new NodePackageImporter()] },
			},
		},
		resolve: { dedupe: ["svelte"] },
	};
	return Object.keys(server).length === 0
		? shared
		: { ...shared, preview: { ...server }, server };
}

function serve(body: () => string): Middle {
	return (req, res, next) => {
		const path = new URL(req.url ?? "/", "http://local").pathname;
		if (path !== "/health") {
			next();
			return;
		}
		res.statusCode = 200;
		res.setHeader("content-type", "application/json; charset=utf-8");
		res.end(body());
	};
}

function source(routes: Route[], login: boolean): string {
	const views = routes.map((route) => {
		const id = `${face}${encodeURIComponent(route.path)}`;
		return `{path:${JSON.stringify(route.path)},load:()=>import(${JSON.stringify(id)})}`;
	});
	return `const views=Object.freeze([${views.join(",")}]);export default Object.freeze({login:${login},views});`;
}

export function design(options: Options = {}): Plugin {
	const login = options.login ?? true;
	const server = options.serve ?? true;
	const branded = material();
	const pending = config();
	let carrying = options.brand !== undefined;
	let base = "/";
	let env: Env = { build: "" };
	let root = "";
	let folder = "";
	let routes: Route[] = [];
	let links = new Map<string, string>();

	function fresh(): void {
		routes = scan(folder, login);
		links = new Map(
			routes.map((route) => [
				`${inside}${encodeURIComponent(route.path)}`,
				route.seat,
			]),
		);
	}

	function held(file: string): boolean {
		const path = relative(folder, file);
		return path !== "" && !path.startsWith("..") && !isAbsolute(path);
	}

	function reload(server: Server, file: string): void {
		if (!held(file)) {
			return;
		}
		try {
			fresh();
		} catch (error) {
			const err = error instanceof Error ? error : new Error(String(error));
			server.ws.send({
				type: "error",
				err: { message: err.message, stack: err.stack ?? "" },
			});
			return;
		}
		const node = server.moduleGraph.getModuleById(PRIVATE);
		if (node !== undefined) {
			server.moduleGraph.invalidateModule(node);
		}
		server.ws.send({ type: "full-reload", path: "*" });
	}

	const images: Middle = (req, res, next) => {
		const path = new URL(req.url ?? "/", "http://local").pathname;
		const image = branded.images.find(
			(image) => `${base}${image.file}` === path,
		);
		if (!image) return next();
		res.statusCode = 200;
		res.setHeader(
			"content-type",
			image.file.endsWith(".svg") ? "image/svg+xml" : "image/png",
		);
		res.end(image.bytes);
	};

	function resolved(config: Config): void {
		root = config.root;
		base = config.base ?? "/";
		if (!base.startsWith("/") || !base.endsWith("/") || base.startsWith("//"))
			throw new Error("Brand images need an absolute local Vite base");
		folder = join(root, "src", "views");
		fresh();
	}

	function start(this: Context): void {
		fresh();
		this.addWatchFile(branded.source);
		for (const route of routes) {
			this.addWatchFile(route.seat);
		}
	}

	function resolve(id: string): string | null {
		if (id === "virtual:perish/brand") return "\0virtual:perish/brand";
		if (id === PUBLIC) {
			return PRIVATE;
		}
		return id.startsWith(face) ? `\0${id}` : null;
	}

	function dev(server: Server): void {
		server.middlewares.use(images);
		server.middlewares.use(serve(() => health(root, env)));
		server.watcher.on("add", (file) => reload(server, file));
		server.watcher.on("unlink", (file) => reload(server, file));
	}

	function preview(server: Server): void {
		server.middlewares.use(images);
		server.middlewares.use(serve(() => health(root, env)));
	}

	function html() {
		return options.brand ? head(branded, options.brand, base) : [];
	}

	function bundle(this: Context): void {
		if (carrying) {
			for (const image of new Map(
				branded.images.map((image) => [image.file, image]),
			).values())
				this.emitFile({
					type: "asset",
					fileName: image.file,
					source: image.bytes,
				});
			this.emitFile({
				type: "asset",
				fileName: ".perish/brand.json",
				source: JSON.stringify({
					schema: "design.brand/v1",
					package: branded.package,
					model: branded.manifest.model,
					manifest: { file: "media/manifest.json", digest: branded.digest },
					assets: branded.manifest.assets.map((item) => ({
						...item,
						output: paths(branded.images, base)[item.id],
					})),
					head: options.brand ?? null,
				}),
			});
		}
		this.emitFile({
			type: "asset",
			fileName: "health",
			source: health(root, env),
		});
		server &&
			this.emitFile({
				type: "asset",
				fileName: ".perish/server.mjs",
				source: runtime([
					...routes.map((route) => route.path),
					...(login ? ["/login"] : []),
				]),
			});
	}

	return {
		name: "perish-design",
		enforce: "pre",
		async config(): Promise<object> {
			env = await pending;
			return wiring(env);
		},
		configResolved: resolved,
		buildStart: start,
		resolveId: resolve,
		load(id): string | null {
			if (id === "\0virtual:perish/brand") {
				carrying = true;
				return `export const manifest=${JSON.stringify(branded.manifest)};export const urls=${JSON.stringify(paths(branded.images, base))};`;
			}
			if (id === PRIVATE) {
				fresh();
				return source(routes, login);
			}
			const seat = links.get(id);
			return seat === undefined
				? null
				: `export { default } from ${JSON.stringify(seat)};`;
		},
		configureServer: dev,
		configurePreviewServer: preview,
		transformIndexHtml: html,
		generateBundle: bundle,
	};
}
