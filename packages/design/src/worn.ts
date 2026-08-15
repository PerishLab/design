import { getContext, setContext } from "svelte";

const seat = Symbol("system");

export function wear(read: () => string | undefined): void {
	setContext(seat, read);
}

export function worn(): () => string | undefined {
	return getContext<() => string | undefined>(seat) ?? (() => undefined);
}
