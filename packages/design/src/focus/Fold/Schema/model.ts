export type Shape = Record<string, unknown>;

export type Row = {
	path: string;
	name: string;
	kind: string;
	need: boolean;
	format?: string;
	preset?: string;
	choices?: string[];
	note?: string;
	value?: string;
	kids: Row[];
};

type State = {
	root: Shape;
	seen: Set<string>;
};

function record(raw: unknown): Shape | undefined {
	if (raw === null || typeof raw !== "object" || Array.isArray(raw))
		return undefined;
	return raw as Shape;
}

function show(raw: unknown): string {
	if (typeof raw === "string") return raw;
	if (typeof raw === "number" || typeof raw === "boolean") return String(raw);
	if (raw === null) return "null";
	return JSON.stringify(raw);
}

function point(root: Shape, ref: string): Shape | undefined {
	if (!ref.startsWith("#/")) return undefined;
	let at: unknown = root;
	for (const step of ref.slice(2).split("/")) {
		const bag = record(at);
		if (bag === undefined) return undefined;
		const key = step.replaceAll("~1", "/").replaceAll("~0", "~");
		if (!Object.hasOwn(bag, key)) return undefined;
		at = bag[key];
	}
	return record(at);
}

function resolve(node: Shape, state: State): { node: Shape; next: State } {
	const ref = typeof node.$ref === "string" ? node.$ref : undefined;
	if (ref === undefined || state.seen.has(ref)) return { node, next: state };
	const target = point(state.root, ref);
	if (target === undefined) return { node, next: state };
	const seen = new Set(state.seen);
	seen.add(ref);
	const rest = Object.fromEntries(
		Object.entries(node).filter(([key]) => key !== "$ref"),
	);
	return resolve({ ...target, ...rest }, { root: state.root, seen });
}

function classify(node: Shape): string {
	const raw = node.type;
	if (typeof raw === "string") return raw;
	if (Array.isArray(raw)) return raw.map(String).join(" | ");
	if (record(node.properties) !== undefined) return "object";
	if (record(node.items) !== undefined) return "array";
	if (typeof node.$ref === "string") return "ref";
	return "any";
}

function listed(raw: unknown): string[] | undefined {
	if (!Array.isArray(raw) || raw.length === 0) return undefined;
	return raw.map(show);
}

function children(
	node: Shape,
	path: string,
	data: unknown,
	state: State,
): Row[] {
	const props = record(node.properties);
	if (props !== undefined) {
		const needs = new Set(
			Array.isArray(node.required) ? node.required.map(String) : [],
		);
		const bag = record(data);
		return Object.entries(props).map(([name, raw]) =>
			build(
				{ name, path: path ? `${path}.${name}` : name, need: needs.has(name) },
				record(raw) ?? {},
				bag !== undefined && Object.hasOwn(bag, name) ? bag[name] : undefined,
				state,
			),
		);
	}
	const items = record(node.items);
	if (items === undefined) return [];
	const first = Array.isArray(data) ? data[0] : undefined;
	return [
		build(
			{ name: "items", path: `${path}[]`, need: false },
			items,
			first,
			state,
		),
	];
}

function build(
	meta: { name: string; path: string; need: boolean },
	raw: Shape,
	data: unknown,
	state: State,
): Row {
	const { node, next } = resolve(raw, state);
	const kids = children(node, meta.path, data, next);
	const format = typeof node.format === "string" ? node.format : undefined;
	const note =
		typeof node.description === "string" ? node.description : undefined;
	const preset = node.default === undefined ? undefined : show(node.default);
	const choices = listed(node.enum);
	const value = data === undefined || kids.length > 0 ? undefined : show(data);
	return {
		path: meta.path,
		name: meta.name,
		kind: classify(node),
		need: meta.need,
		format,
		preset,
		choices,
		note,
		value,
		kids,
	};
}

export function walk(schema: Shape, data?: unknown): Row[] {
	const root = record(schema);
	if (root === undefined || Object.keys(root).length === 0) return [];
	const state: State = { root, seen: new Set() };
	const { node, next } = resolve(root, state);
	const kids = children(node, "", data, next);
	if (kids.length > 0) return kids;
	const title = typeof node.title === "string" ? node.title : "value";
	return [build({ name: title, path: title, need: false }, node, data, next)];
}
