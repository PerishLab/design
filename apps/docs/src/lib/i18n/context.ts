import { getContext, setContext } from "svelte";

export type Locale = "en" | "zh";

const seat = Symbol("locale");

export function stage(heard: () => Locale): void {
	setContext(seat, heard);
}

export function tongue(): () => Locale {
	return getContext<() => Locale>(seat) ?? (() => "en");
}
