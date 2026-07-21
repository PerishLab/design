import { fileURLToPath as unwrap } from "node:url";

type Loud = { code: string; map: null };

type Plugin = {
	name: string;
	enforce: "pre";
	transform(code: string, id: string): Loud | null;
	resolveId(id: string): string | null;
	load(id: string): string | null;
};

const pattern =
	/(import\s+["'][^"']+\.scss["'])\s+with\s*\{\s*type:\s*["']text["']\s*\}/g;

const font = "virtual:perish-design/font";
const sealed = `\0${font}`;
const face = "@fontsource/spectral/600.css";

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
		resolveId(id: string): string | null {
			return id === font ? sealed : null;
		},
		load(id: string): string | null {
			if (id !== sealed) {
				return null;
			}
			return `import ${JSON.stringify(unwrap(import.meta.resolve(face)))};\n`;
		},
	};
}
