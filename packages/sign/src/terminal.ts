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
		menu: ["≡"],
		shut: ["×"],
		show: ["◉"],
		save: ["↓"],
		sort: ["⇅"],
		sync: ["↻"],
	},
	spurns: [
		"copy",
		"draws",
		"places",
		"bounds",
		"takes",
		"owns",
		"keeps",
		"tongue",
		"shade",
	],
};
