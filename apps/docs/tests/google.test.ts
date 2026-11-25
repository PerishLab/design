import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "vitest";

const seat = "tests/google.json";
const root = ".";
const plant = "../..";
const target = "preview";
const shots = resolve(plant, ".local/tmp/google");

type Target = {
	healthUrl: string | null;
	name: string;
	running: boolean;
};

type Sample = {
	family: "accounts" | "workspace";
	system: string;
	tone: "light" | "dark";
	width: number;
	height: number;
	document: number;
	ground: string;
	panel: string;
	well: string;
	shot: string;
};

const families = [
	{ family: "accounts" as const, system: "google-accounts" },
	{ family: "workspace" as const, system: "google-workspace" },
];
const tones = ["light", "dark"] as const;
const sizes = [
	{ width: 1440, height: 900 },
	{ width: 390, height: 844 },
];

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

function run(script: string): string {
	const raw = execFileSync("playwright-cli", ["--raw", "eval", script], {
		encoding: "utf8",
	});
	return JSON.parse(raw.trim()) as string;
}

function open(url: string, width: number, height: number): void {
	execFileSync("playwright-cli", ["resize", String(width), String(height)], {
		stdio: "ignore",
	});
	execFileSync("playwright-cli", ["goto", url], { stdio: "ignore" });
	execFileSync(
		"playwright-cli",
		[
			"--raw",
			"eval",
			"document.fonts.ready.then(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))",
		],
		{ stdio: "ignore" },
	);
}

function measure(): {
	document: number;
	ground: string;
	panel: string;
	well: string;
} {
	const script = `(() => {
		const shell = document.querySelector(".shell");
		const probe = (atom) => {
			const node = document.createElement("span");
			node.style.color = "var(" + atom + ")";
			shell.appendChild(node);
			const value = getComputedStyle(node).color;
			node.remove();
			return value;
		};
		return JSON.stringify({
			document: document.documentElement.scrollWidth,
			ground: probe("--ground"),
			panel: probe("--panel"),
			well: probe("--well"),
		});
	})()`;
	return JSON.parse(run(script)) as {
		document: number;
		ground: string;
		panel: string;
		well: string;
	};
}

function probe(health: string): Record<string, boolean> {
	open(new URL("/proof/?google=workspace&tone=light", health).href, 1440, 900);
	const workspace = JSON.parse(
		run(`(async () => {
			const settle = () => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)));
			document.querySelector(".table tbody tr")?.click();
			await settle();
			const opened = document.querySelector("dialog.drawer")?.hasAttribute("open") ?? false;
			document.querySelector(".drawer-shut")?.click();
			await settle();
			const closed = !(document.querySelector("dialog.drawer")?.hasAttribute("open") ?? false);
			const tabs = [...document.querySelectorAll(".schema-tab")];
			tabs[1]?.click();
			await settle();
			const raw = document.querySelector(".schema-raw") !== null;
			const head = document.querySelector(".table-sort");
			const before = head?.closest("th")?.getAttribute("aria-sort");
			head?.click();
			await settle();
			const after = head?.closest("th")?.getAttribute("aria-sort");
			return JSON.stringify({ opened, closed, raw, sorted: before !== after });
		})()`),
	) as Record<string, boolean>;
	open(new URL("/proof/?google=workspace&tone=light", health).href, 390, 844);
	const narrow = JSON.parse(
		run(`(async () => {
			const settle = () => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)));
			document.querySelector(".navigator-lead button")?.click();
			await settle();
			const opened = document.querySelector(".aside-open") !== null;
			document.querySelector(".aside-shut")?.click();
			await settle();
			const closed = document.querySelector(".aside-open") === null;
			return JSON.stringify({ mobile: opened && closed });
		})()`),
	) as Record<string, boolean>;
	open(new URL("/proof/?google=accounts&tone=light", health).href, 1440, 900);
	const accounts = JSON.parse(
		run(`(async () => {
			const settle = () => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)));
			const cue = document.querySelector(".vault-cue");
			cue?.click();
			await settle();
			const revealed = cue?.getAttribute("aria-pressed") === "true" && document.body.textContent.includes("K7M2-9P4Q");
			const buttons = [...document.querySelectorAll("button")];
			buttons.find((one) => one.textContent?.includes("409"))?.click();
			await settle();
			const conflict = document.querySelector(".note-hold") !== null;
			return JSON.stringify({ revealed, conflict });
		})()`),
	) as Record<string, boolean>;
	return { ...workspace, ...narrow, ...accounts };
}

const cases = families.flatMap((entry) =>
	tones.flatMap((tone) => sizes.map((size) => ({ ...entry, tone, ...size }))),
);

function capture(health: string): Sample[] {
	const records: Sample[] = [];
	for (const entry of cases) {
		const url = new URL(
			`/proof/?google=${entry.family}&tone=${entry.tone}`,
			health,
		).href;
		open(url, entry.width, entry.height);
		const data = measure();
		const name = `${entry.family}-${entry.tone}-${entry.width}.png`;
		execFileSync(
			"playwright-cli",
			["screenshot", "--filename", resolve(shots, name), "--full-page"],
			{ stdio: "ignore" },
		);
		records.push({
			family: entry.family,
			system: entry.system,
			tone: entry.tone,
			width: entry.width,
			height: entry.height,
			...data,
			shot: `.local/tmp/google/${name}`,
		});
	}
	return records;
}

test.skipIf(process.env.LOOK !== "1")(
	"captures Google Accounts and Workspace surfaces across light, dark, desktop, and mobile",
	() => {
		execFileSync("pnpm", ["exec", "vite", "build"], {
			cwd: root,
			stdio: "ignore",
		});
		mkdirSync(shots, { recursive: true });
		const held = state().running;
		if (!held)
			execFileSync("sidecar", ["start", target], {
				cwd: plant,
				stdio: "ignore",
			});
		let records: Sample[] = [];
		let checks: Record<string, boolean> = {};
		try {
			const health = state().healthUrl;
			if (health === null) throw new Error(`${target} has no health URL`);
			answers(health, 20);
			records = capture(health);
			checks = probe(health);
		} finally {
			if (!held)
				execFileSync("sidecar", ["stop", target], {
					cwd: plant,
					stdio: "ignore",
				});
		}
		writeFileSync(seat, `${JSON.stringify(records, null, "\t")}\n`);
		for (const item of records) {
			expect(
				item.document,
				`${item.system} ${item.tone} ${item.width}`,
			).toBeLessThanOrEqual(item.width);
			if (item.family === "accounts" && item.width === 390) {
				expect(item.ground, `narrow ${item.tone} accounts`).toBe(item.panel);
			}
			if (item.family === "workspace" && item.tone === "dark") {
				expect(item.well, "dark workspace well").not.toBe(item.panel);
			}
		}
		expect(checks).toEqual({
			opened: true,
			closed: true,
			raw: true,
			sorted: true,
			mobile: true,
			revealed: true,
			conflict: true,
		});
	},
	300000,
);
