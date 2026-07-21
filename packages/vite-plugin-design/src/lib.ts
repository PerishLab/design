import { existsSync } from "node:fs";

type Loud = { code: string; map: null };

type Plugin = {
	name: string;
	enforce: "pre";
	transform(code: string, id: string): Loud | null;
};

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
	};
}
