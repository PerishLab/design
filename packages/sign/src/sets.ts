import { ant } from "./ant.ts";
import { base } from "./base.ts";
import { material } from "./material.ts";
import { terminal } from "./terminal.ts";

export type Cut = {
	cut: "line" | "solid" | "text";
	drawn: Record<string, string[]>;
	lit?: Record<string, string[]>;
	spurns?: string[];
};

export const sets: Record<string, Cut> = {
	ant,
	base,
	material,
	terminal,
};
