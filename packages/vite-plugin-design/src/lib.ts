import { existsSync } from "node:fs";
import { fileURLToPath as unwrap } from "node:url";

type Loud = { code: string; map: null };

type Plugin = {
	name: string;
	enforce: "pre";
	transform(code: string, id: string): Loud | null;
	resolveId(id: string): string | null;
	load(id: string): string | null;
};

const font = "virtual:perish-design/font";
const sealed = `\0${font}`;
const face = "@fontsource/spectral/600.css";

function sited(): string {
	try {
		const found = import.meta.resolve(face);
		return found.startsWith("file:") ? unwrap(found) : face;
	} catch {
		return face;
	}
}

export function design(): Plugin {
	return {
		name: "perish-design",
		enforce: "pre",
		transform(code: string, id: string): Loud | null {
			const seat = id.split("?")[0];
			if (!/\.[jt]sx?$/.test(seat)) {
				return null;
			}
			const sheet = seat.replace(/\.[jt]sx?$/, ".scss");
			if (!existsSync(sheet)) {
				return null;
			}
			const line = `import "./${sheet.slice(sheet.lastIndexOf("/") + 1)}";`;
			if (code.includes(line)) {
				return null;
			}
			return { code: `${line}\n${code}`, map: null };
		},
		resolveId(id: string): string | null {
			return id === font ? sealed : null;
		},
		load(id: string): string | null {
			if (id !== sealed) {
				return null;
			}
			return `import ${JSON.stringify(sited())};\n`;
		},
	};
}
