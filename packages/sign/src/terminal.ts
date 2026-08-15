import type { Cut } from "./sets.ts";

export const terminal: Cut = {
	cut: "text",
	drawn: {
		fold: ["▸"],
		tick: ["✓"],
		find: ["/"],
		away: ["↗"],
		warn: ["!"],
		next: ["→"],
		pick: ["▾"],
	},
	spurns: ["copy", "draws", "places", "bounds", "takes", "owns", "keeps"],
};
