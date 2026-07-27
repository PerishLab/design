import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

export type Route = {
	path: string;
	seat: string;
};

const plain = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const value = /^\{([a-z][a-z0-9]*)\}$/;

function fail(path: string, note: string): never {
	throw new Error(`views: ${path}: ${note}`);
}

function part(name: string, path: string): string {
	if (name !== name.toLowerCase()) {
		fail(path, "path components must be lowercase");
	}
	if (plain.test(name) || value.test(name)) {
		return name;
	}
	return fail(path, "invalid route segment");
}

function walk(root: string, path: string, found: Route[]): void {
	for (const entry of readdirSync(path, { withFileTypes: true })) {
		const seat = join(path, entry.name);
		if (entry.isDirectory()) {
			part(entry.name, seat);
			walk(root, seat, found);
			continue;
		}
		if (!entry.isFile() || !entry.name.endsWith(".tsx")) {
			fail(seat, "only route .tsx files are allowed");
		}
		const name = entry.name.slice(0, -4);
		if (name !== "index") {
			part(name, seat);
		} else if (entry.name !== entry.name.toLowerCase()) {
			fail(seat, "path components must be lowercase");
		}
		const rel = seat.slice(root.length + 1, -4).split(/[\\/]/);
		if (rel.at(-1) === "index") {
			rel.pop();
		}
		found.push({ path: `/${rel.join("/")}`, seat });
	}
}

function shape(path: string): string {
	return path.replace(/\{[a-z][a-z0-9]*\}/g, "{}");
}

function reserved(route: Route, login: boolean): void {
	if (route.path === "/health") {
		fail(route.seat, "/health is reserved");
	}
	if (route.path === "/api" || route.path.startsWith("/api/")) {
		fail(route.seat, "/api is reserved");
	}
	if (login && route.path === "/login") {
		fail(route.seat, "/login is provided by default");
	}
}

function order(left: Route, right: Route): number {
	const a = left.path.split("/").filter(Boolean);
	const b = right.path.split("/").filter(Boolean);
	const score = (held: string[]) =>
		held.reduce((sum, item) => sum + (value.test(item) ? 1 : 2), 0);
	return (
		score(b) - score(a) ||
		b.length - a.length ||
		left.path.localeCompare(right.path)
	);
}

export function scan(root: string, login = true): Route[] {
	if (!existsSync(root)) {
		return [];
	}
	const found: Route[] = [];
	walk(root, root, found);
	const held = new Map<string, Route>();
	for (const route of found) {
		reserved(route, login);
		const key = shape(route.path);
		const prior = held.get(key);
		if (prior !== undefined) {
			fail(route.seat, `conflicts with ${prior.seat}`);
		}
		held.set(key, route);
	}
	return found.sort(order);
}
