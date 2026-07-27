import { existsSync } from "node:fs";
import { isAbsolute, join, relative } from "node:path";
import { config } from "./config.ts";
import { health } from "./health.ts";
import { type Route, scan } from "./views.ts";

type Loud = { code: string; map: null };
type Next = () => void;
type Request = { url?: string };
type Reply = {
	end(body: string): void;
	setHeader(name: string, value: string): void;
	statusCode: number;
};
type Middle = (req: Request, res: Reply, next: Next) => void;
type Module = object;
type Server = {
	middlewares: { use(middle: Middle): void };
	moduleGraph: {
		getModuleById(id: string): Module | undefined;
		invalidateModule(node: Module): void;
	};
	watcher: {
		on(event: "add" | "unlink", run: (file: string) => void): void;
	};
	ws: { send(event: object): void };
};
type Context = {
	addWatchFile(path: string): void;
	emitFile(file: { type: "asset"; fileName: string; source: string }): void;
};
type Config = {
	root: string;
};
type Options = {
	login?: boolean;
};
type Plugin = {
	name: string;
	enforce: "pre";
	config(): object | undefined;
	configResolved(config: Config): void;
	buildStart(this: Context): void;
	resolveId(id: string): string | null;
	load(id: string): string | null;
	configureServer(server: Server): void;
	configurePreviewServer(server: Server): void;
	generateBundle(this: Context): void;
	transform(code: string, id: string): Loud | null;
};

const PUBLIC = "virtual:perish/views";
const PRIVATE = `\0${PUBLIC}`;
const face = "virtual:perish/view/";
const inside = `\0${face}`;

function proxy(target: string): object {
	return { "^/api(?:/|$)": { target } };
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
	const env = config();
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

	return {
		name: "perish-design",
		enforce: "pre",
		config(): object | undefined {
			if (env.port === undefined && env.target === undefined) {
				return undefined;
			}
			const server: Record<string, unknown> = {};
			if (env.port !== undefined) {
				server.host = "127.0.0.1";
				server.port = env.port;
				server.strictPort = true;
			}
			if (env.target !== undefined) {
				server.proxy = proxy(env.target);
			}
			return { server };
		},
		configResolved(config): void {
			root = config.root;
			folder = join(root, "src", "views");
			fresh();
		},
		buildStart(): void {
			fresh();
			for (const route of routes) {
				this.addWatchFile(route.seat);
			}
		},
		resolveId(id): string | null {
			if (id === PUBLIC) {
				return PRIVATE;
			}
			return id.startsWith(face) ? `\0${id}` : null;
		},
		load(id): string | null {
			if (id === PRIVATE) {
				fresh();
				return source(routes, login);
			}
			const seat = links.get(id);
			return seat === undefined
				? null
				: `export { default } from ${JSON.stringify(seat)};`;
		},
		configureServer(server): void {
			server.middlewares.use(serve(() => health(root, env)));
			server.watcher.on("add", (file) => reload(server, file));
			server.watcher.on("unlink", (file) => reload(server, file));
		},
		configurePreviewServer(server): void {
			server.middlewares.use(serve(() => health(root, env)));
		},
		generateBundle(): void {
			this.emitFile({
				type: "asset",
				fileName: "health",
				source: health(root, env),
			});
		},
		transform(code: string, id: string): Loud | null {
			const seat = id.split("?")[0];
			if (!/\.[jt]sx?$/.test(seat)) {
				return null;
			}
			const sheet = seat.replace(/\.[jt]sx?$/, ".scss");
			if (!existsSync(sheet)) {
				return null;
			}
			const line = `import "./${sheet.slice(sheet.lastIndexOf("/") + 1)}";`;
			if (code.includes(line)) {
				return null;
			}
			return { code: `${line}\n${code}`, map: null };
		},
	};
}
