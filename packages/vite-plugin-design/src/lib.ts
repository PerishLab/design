type Loud = { code: string; map: null };

type Plugin = {
	name: string;
	enforce: "pre";
	transform(code: string, id: string): Loud | null;
};

const pattern =
	/(import\s+["'][^"']+\.scss["'])\s+with\s*\{\s*type:\s*["']text["']\s*\}/g;

export function design(): Plugin {
	return {
		name: "perish-design",
		enforce: "pre",
		transform(code: string, id: string): Loud | null {
			if (!/\.[jt]sx?$/.test(id)) {
				return null;
			}
			const next = code.replace(pattern, "$1");
			return next === code ? null : { code: next, map: null };
		},
	};
}
