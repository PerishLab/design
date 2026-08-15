import { type Locale, tongue } from "./context.ts";
import * as english from "./en/index.ts";
import * as chinese from "./zh/index.ts";

export type { Locale } from "./context.ts";
export { stage, tongue } from "./context.ts";

export type Speak = <T = string>(path: string) => T;

const books: Record<Locale, Record<string, unknown>> = {
	en: english,
	zh: chinese,
};

function reach(book: Record<string, unknown>, path: string): unknown {
	let held: unknown = book;
	for (const step of path.split(".")) {
		if (held === null || typeof held !== "object") return undefined;
		held = (held as Record<string, unknown>)[step];
	}
	return held;
}

export function speak(): Speak {
	const heard = tongue();
	return <T>(path: string): T => {
		const held = reach(books[heard()], path);
		return (held === undefined ? path : held) as T;
	};
}
