import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

const seat = join(dirname(fileURLToPath(import.meta.url)), "look.json");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const plant = join(root, "../..");
const port = 4287;
const target = "preview";

const systems = [
	"base",
	"ant",
	"brutal",
	"carbon",
	"console",
	"cupertino",
	"folio",
	"glass",
	"material",
	"paper",
	"relief",
	"signal",
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

const banded = [".banner-bay", ".banner-skin", ".banner h1", ".mark"];

const denser = [
	["carbon", "folio"],
	["console", "paper"],
	["terminal", "paper"],
	["ant", "glass"],
	["swiss", "brutal"],
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

function seats(): string {
	return `(() => {
		const traits = ${JSON.stringify(traits)};
		const parts = ${JSON.stringify(banded)};
		const bay = document.querySelector(".banner-bay").getBoundingClientRect();
		const held = {};
		for (const part of parts) {
			const node = document.querySelector(part);
			if (node === null) { held[part] = "absent"; continue; }
			const style = getComputedStyle(node);
			const box = node.getBoundingClientRect();
			const row = {};
			for (const trait of traits) row[trait] = style[trait];
			row.box = Math.round(box.width) + "x" + Math.round(box.height);
			row.seat = Math.round(box.left - bay.left) + "," + Math.round(box.top - bay.top);
			held[part] = row;
		}
		return JSON.stringify(held);
	})()`;
}

function middle(row: { seat: string; box: string }): number {
	return Number(row.seat.split(",")[1]) + Number(row.box.split("x")[1]) / 2;
}

function band(at: number, state: string): Record<string, unknown> {
	execFileSync(
		"playwright-cli",
		["--raw", "eval", `window.scrollTo(0, ${at})`],
		{
			stdio: "ignore",
		},
	);
	execFileSync("sleep", ["0.4"]);
	const raw = execFileSync("playwright-cli", ["--raw", "eval", seats()], {
		encoding: "utf8",
	});
	const read = JSON.parse(JSON.parse(raw.trim())) as Record<string, unknown>;
	const held: Record<string, unknown> = {};
	for (const [part, row] of Object.entries(read))
		held[`${part} ${state}`] = row;
	return held;
}

function gauge(): string {
	return `(() => {
		const tall = document.documentElement.scrollHeight;
		const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
		let glyphs = 0;
		let node = walk.nextNode();
		while (node !== null) {
			const seat = node.parentElement;
			const style = seat === null ? null : getComputedStyle(seat);
			const shown = style !== null && style.display !== "none" && style.visibility !== "hidden";
			if (shown) glyphs += node.textContent.replace(/\\s+/g, " ").trim().length;
			node = walk.nextNode();
		}
		return String(Math.round(glyphs / ((1280 * tall) / 1e6)));
	})()`;
}

function paced(): number {
	const raw = execFileSync("playwright-cli", ["--raw", "eval", gauge()], {
		encoding: "utf8",
	});
	return Number(JSON.parse(raw.trim()));
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

function alive(): boolean {
	const raw = execFileSync("sidecar", ["status", "--format", "json"], {
		cwd: plant,
		encoding: "utf8",
		stdio: ["ignore", "pipe", "ignore"],
	});
	const held = JSON.parse(raw) as {
		targets: { name: string; running: boolean }[];
	};
	return held.targets.some((one) => one.name === target && one.running);
}

function answers(tries: number): void {
	for (let tick = 0; tick < tries; tick += 1) {
		try {
			execFileSync(
				"curl",
				[
					"--silent",
					"--fail",
					"--output",
					"/dev/null",
					`http://127.0.0.1:${port}/health`,
				],
				{ stdio: "ignore" },
			);
			return;
		} catch {
			execFileSync("sleep", ["1"]);
		}
	}
	throw new Error(`the ${target} sidecar never answered on ${port}`);
}

test.skipIf(process.env.LOOK !== "1")(
	"captures how every system looks",
	() => {
		execFileSync("pnpm", ["exec", "vite", "build"], {
			cwd: root,
			stdio: "ignore",
		});
		const held = alive();
		if (!held)
			execFileSync("sidecar", ["start", target], {
				cwd: plant,
				stdio: "ignore",
			});
		try {
			answers(20);
			execFileSync("playwright-cli", ["resize", "1280", "900"], {
				stdio: "ignore",
			});
			const shot: Record<string, unknown> = {};
			for (const system of systems) {
				const rest = look(system) as Record<string, unknown>;
				shot[system] = {
					density: paced(),
					...rest,
					...band(0, "dock"),
					...band(900, "float"),
				};
			}
			writeFileSync(seat, `${JSON.stringify(shot, null, "\t")}\n`);
		} finally {
			if (!held)
				execFileSync("sidecar", ["stop", target], {
					cwd: plant,
					stdio: "ignore",
				});
		}
		const written = JSON.parse(readFileSync(seat, "utf8"));
		expect(Object.keys(written).sort()).toEqual([...systems].sort());
		const drift: string[] = [];
		for (const system of systems) {
			const rows = written[system];
			const one = middle(rows[".banner h1 dock"]);
			const other = middle(rows[".banner h1 float"]);
			if (Math.abs(one - other) > 1) drift.push(`${system} ${one} ${other}`);
		}
		expect(drift).toEqual([]);
		const loose = denser
			.map((pair) => ({
				pair,
				tight: written[pair[0]].density as number,
				airy: written[pair[1]].density as number,
			}))
			.filter((row) => row.tight <= row.airy)
			.map(
				(row) =>
					`${row.pair[0]} ${row.tight} is not denser than ${row.pair[1]} ${row.airy}`,
			);
		expect(loose).toEqual([]);
	},
	180000,
);
