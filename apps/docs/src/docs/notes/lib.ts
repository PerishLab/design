import { arrange } from "./arrange.ts";
import { document } from "./document.ts";
import { enclose } from "./enclose.ts";
import { focus } from "./focus.ts";
import { layer } from "./layer.ts";
import { mark } from "./mark.ts";

export type Kind = "text" | "flag" | "node" | "call" | "list";

type Note = { kind: Kind; en: string; zh: string };

export type Entry = Record<string, Note>;

export const notes: Record<string, Entry> = {
	...arrange,
	...document,
	...enclose,
	...focus,
	...layer,
	...mark,
};
