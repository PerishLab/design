import { getContext } from "svelte";

export const seat = Symbol("perish-design-path");

type Values<Keys extends readonly string[]> = {
	[Key in Keys[number]]: string;
};

export function path<const Keys extends readonly string[]>(
	...keys: Keys
): Values<Keys> {
	const read = getContext<() => Record<string, string>>(seat);
	const params = read();
	const found = {} as Values<Keys>;
	for (const key of keys) {
		const value = params[key];
		if (value === undefined)
			throw new Error(`route parameter is absent: ${key}`);
		found[key as Keys[number]] = value;
	}
	return found;
}
