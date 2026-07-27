import { useParams } from "react-router";

type Values<Keys extends readonly string[]> = {
	[Key in Keys[number]]: string;
};

export function usePath<const Keys extends readonly string[]>(
	...keys: Keys
): Values<Keys> {
	const params = useParams();
	const found = {} as Values<Keys>;
	for (const key of keys) {
		const value = params[key];
		if (value === undefined) {
			throw new Error(`route parameter is absent: ${key}`);
		}
		found[key as Keys[number]] = value;
	}
	return found;
}
