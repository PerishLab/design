import { execFileSync, spawn } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

const seat = join(dirname(fileURLToPath(import.meta.url)), "look.json");
const root = join(dirname(fileURLToPath(import.meta.url)), "../dist");
const port = 4287;

const systems = [
	"base",
	"ant",
	"brutal",
	"carbon",
	"cupertino",
	"folio",
	"glass",
	"material",
	"relief",
	"swiss",
	"terminal",
];

const parts = [
	".banner h1",
	".nav a",
	".tabs-one",
	".hero h1",
	".card",
	".card-title",
	".board",
	".board-title",
	".line",
	".tag",
	".meter",
	".menu-cue",
	".table th",
	".rail b",
	".code pre",
	".item",
	".ledger",
	".fold-cue",
	".sheet",
	".field-input",
	".pick-input",
	".check-mark",
	".face",
	".button-solid",
	".copy",
	".footer",
	".toast-note",
];

const traits = [
	"color",
	"backgroundColor",
	"borderRadius",
	"borderTopWidth",
	"fontFamily",
	"fontSize",
	"fontWeight",
	"boxShadow",
];

function reads(): string {
	return `(() => {
		const traits = ${JSON.stringify(traits)};
		const parts = ${JSON.stringify(parts)};
		const held = {};
		for (const part of parts) {
			const node = document.querySelector(part);
			if (node === null) { held[part] = "absent"; continue; }
			const style = getComputedStyle(node);
			const box = node.getBoundingClientRect();
			const row = {};
			for (const trait of traits) row[trait] = style[trait];
			row.box = Math.round(box.width) + "x" + Math.round(box.height);
			held[part] = row;
		}
		return JSON.stringify(held);
	})()`;
}

function look(system: string): unknown {
	execFileSync(
		"playwright-cli",
		["goto", `http://127.0.0.1:${port}/proof/?system=${system}`],
		{ stdio: "ignore" },
	);
	const raw = execFileSync("playwright-cli", ["--raw", "eval", reads()], {
		encoding: "utf8",
	});
	return JSON.parse(JSON.parse(raw.trim()));
}

test.skipIf(process.env.LOOK !== "1")(
	"captures how every system looks",
	() => {
		const server = spawn("python3", ["-m", "http.server", String(port)], {
			cwd: root,
			stdio: "ignore",
		});
		try {
			execFileSync("sleep", ["1"]);
			execFileSync("playwright-cli", ["resize", "1280", "900"], {
				stdio: "ignore",
			});
			const held: Record<string, unknown> = {};
			for (const system of systems) held[system] = look(system);
			writeFileSync(seat, `${JSON.stringify(held, null, "\t")}\n`);
		} finally {
			server.kill();
		}
		const written = JSON.parse(readFileSync(seat, "utf8"));
		expect(Object.keys(written).sort()).toEqual([...systems].sort());
	},
	180000,
);
