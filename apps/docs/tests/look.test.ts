import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { expect, test } from "vitest";
import { still, voices } from "./steps.ts";

const seat = "tests/look.json";
const root = ".";
const plant = "../..";
const target = "preview";

type Target = {
	healthUrl: string | null;
	name: string;
	running: boolean;
};

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
	".navigator-name",
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
	".shell",
];

const banded = [
	".navigator-bay",
	".navigator-skin",
	".navigator-name",
	".mark",
];

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
		const bay = document.querySelector(".navigator-bay").getBoundingClientRect();
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

function look(system: string, health: string): unknown {
	execFileSync(
		"playwright-cli",
		["goto", new URL(`/proof/?system=${system}`, health).href],
		{ stdio: "ignore" },
	);
	const raw = execFileSync("playwright-cli", ["--raw", "eval", reads()], {
		encoding: "utf8",
	});
	return JSON.parse(JSON.parse(raw.trim()));
}

function state(): Target {
	const raw = execFileSync("sidecar", ["status", "--format", "json"], {
		cwd: plant,
		encoding: "utf8",
		stdio: ["ignore", "pipe", "ignore"],
	});
	const held = JSON.parse(raw) as { targets: Target[] };
	const found = held.targets.find((one) => one.name === target);
	if (found === undefined)
		throw new Error(`sidecar does not declare ${target}`);
	return found;
}

function answers(health: string, tries: number): void {
	for (let tick = 0; tick < tries; tick += 1) {
		try {
			execFileSync(
				"curl",
				["--silent", "--fail", "--output", "/dev/null", health],
				{ stdio: "ignore" },
			);
			return;
		} catch {
			execFileSync("sleep", ["1"]);
		}
	}
	throw new Error(`the ${target} sidecar never answered at ${health}`);
}

test.skipIf(process.env.LOOK !== "1")(
	"captures how every system looks",
	() => {
		execFileSync("pnpm", ["exec", "vite", "build"], {
			cwd: root,
			stdio: "ignore",
		});
		const held = state().running;
		if (!held)
			execFileSync("sidecar", ["start", target], {
				cwd: plant,
				stdio: "ignore",
			});
		let baseline = "";
		try {
			const health = state().healthUrl;
			if (health === null) throw new Error(`${target} has no health URL`);
			answers(health, 20);
			execFileSync("playwright-cli", ["resize", "1280", "900"], {
				stdio: "ignore",
			});
			const shot: Record<string, unknown> = {};
			for (const system of systems) {
				const rest = look(system, health) as Record<string, unknown>;
				shot[system] = {
					density: paced(),
					...rest,
					...band(0, "dock"),
					...band(900, "float"),
				};
			}
			baseline = `${JSON.stringify(shot, null, "\t")}\n`;
			writeFileSync(seat, baseline);
		} finally {
			if (!held)
				execFileSync("sidecar", ["stop", target], {
					cwd: plant,
					stdio: "ignore",
				});
		}
		const written = JSON.parse(baseline);
		expect(Object.keys(written).sort()).toEqual([...systems].sort());
		const drift: string[] = [];
		for (const system of systems) {
			const rows = written[system];
			const one = middle(rows[".navigator-name dock"]);
			const other = middle(rows[".navigator-name float"]);
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
		const shown = voices();
		expect(shown.length).toBeGreaterThan(1);
		expect(shown.filter((one) => !systems.includes(one))).toEqual([]);
		expect(still(written, shown)).toEqual([]);
	},
	300000,
);
