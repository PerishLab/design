import type { Locale } from "./context.ts";

export type Role = "claim";

export const roles = {
	"front.claim": "claim",
} as const satisfies Record<string, Role>;

export type Finding = {
	locale: Locale;
	path: keyof typeof roles;
	role: Role;
	rule: "missing-copy" | "zh-claim-terminal-punctuation";
};

function reach(book: Record<string, unknown>, path: string): unknown {
	let held: unknown = book;
	for (const step of path.split(".")) {
		if (held === null || typeof held !== "object") return undefined;
		held = (held as Record<string, unknown>)[step];
	}
	return held;
}

export function lint(locale: Locale, book: Record<string, unknown>): Finding[] {
	const findings: Finding[] = [];
	for (const path of Object.keys(roles) as Array<keyof typeof roles>) {
		const role = roles[path];
		const value = reach(book, path);
		if (typeof value !== "string") {
			findings.push({ locale, path, role, rule: "missing-copy" });
		} else if (
			locale === "zh" &&
			role === "claim" &&
			/[。！？!?]$/u.test(value)
		) {
			findings.push({
				locale,
				path,
				role,
				rule: "zh-claim-terminal-punctuation",
			});
		}
	}
	return findings;
}
