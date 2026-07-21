import { existsSync } from "node:fs";

type Loud = { code: string; map: null };

type Plugin = {
	name: string;
	enforce: "pre";
	transform(code: string, id: string): Loud | null;
};

const pinned = /\bnpm:(@[\w.-]+\/[\w.-]+|[\w.-]+)@[\w.^~<>=+-]+/g;

function bare(code: string): string {
	return code.replace(pinned, "$1");
}

function styled(code: string, seat: string): string {
	const sheet = seat.replace(/\.[jt]sx?$/, ".scss");
	if (!existsSync(sheet)) {
		return code;
	}
	const line = `import "./${sheet.slice(sheet.lastIndexOf("/") + 1)}";`;
	return code.includes(line) ? code : `${line}\n${code}`;
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
			const next = styled(bare(code), seat);
			return next === code ? null : { code: next, map: null };
		},
	};
}
