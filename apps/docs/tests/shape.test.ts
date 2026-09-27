import { execFileSync } from "node:child_process";
import { hold, marks } from "@perishlab/crest/crest";
import { sets } from "@perishlab/sign/sets";
import { expect, test } from "vitest";

const heaviest = 3;
const live = 20;
const least = 14;

function frames(): string {
	const held: Record<
		string,
		{ grow: number; drawn: Record<string, string[]> }
	> = {};
	for (const [name, set] of Object.entries(sets)) {
		if (set.cut === "text") continue;
		const drawn: Record<string, string[]> = {};
		for (const [one, strokes] of Object.entries(set.drawn))
			drawn[one] = [...strokes, ...(set.lit?.[one] ?? [])];
		held[name] = { grow: set.cut === "line" ? heaviest : 0, drawn };
	}
	return `(() => {
		const sets = ${JSON.stringify(held)};
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("viewBox", "0 0 24 24");
		svg.style.cssText = "position:absolute;width:240px;height:240px;visibility:hidden";
		document.body.appendChild(svg);
		const bad = [];
		for (const [set, held] of Object.entries(sets)) {
			for (const [name, paths] of Object.entries(held.drawn)) {
				let x0 = 99, y0 = 99, x1 = -99, y1 = -99;
				for (const d of paths) {
					const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
					p.setAttribute("d", d); svg.appendChild(p);
					const b = p.getBBox();
					x0 = Math.min(x0, b.x); y0 = Math.min(y0, b.y);
					x1 = Math.max(x1, b.x + b.width); y1 = Math.max(y1, b.y + b.height);
					p.remove();
				}
				const w = x1 - x0 + held.grow, h = y1 - y0 + held.grow;
				const big = Math.max(w, h);
				const edge = held.grow / 2;
				if (big < ${least} || big > ${live} ||
					x0 - edge < 2 || y0 - edge < 2 || x1 + edge > 22 || y1 + edge > 22)
					bad.push(set + "." + name + " " + w.toFixed(1) + "x" + h.toFixed(1));
			}
		}
		svg.remove();
		return JSON.stringify(bad);
	})()`;
}

test.skipIf(process.env.LOOK !== "1")(
	"draws every mark inside one live area",
	() => {
		execFileSync("playwright-cli", ["goto", "about:blank"], {
			stdio: "ignore",
		});
		const raw = execFileSync("playwright-cli", ["--raw", "eval", frames()], {
			encoding: "utf8",
		});
		expect(JSON.parse(JSON.parse(raw.trim()))).toEqual([]);
	},
	60000,
);

function held(): string {
	return `(() => {
		const marks = ${JSON.stringify(marks)};
		const hold = ${JSON.stringify(hold)};
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("viewBox", "0 0 24 24");
		svg.style.cssText = "position:absolute;width:240px;height:240px;visibility:hidden";
		document.body.appendChild(svg);
		const out = [];
		for (const [name, paths] of Object.entries(marks)) {
			if (paths.length === 0) continue;
			let x0 = 99, y0 = 99, x1 = -99, y1 = -99;
			for (const d of paths) {
				const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
				p.setAttribute("d", d); svg.appendChild(p);
				const b = p.getBBox();
				x0 = Math.min(x0, b.x); y0 = Math.min(y0, b.y);
				x1 = Math.max(x1, b.x + b.width); y1 = Math.max(y1, b.y + b.height);
				p.remove();
			}
			if (x0 < hold.near || y0 < hold.near || x1 > hold.far || y1 > hold.far)
				out.push(name + " " + x0.toFixed(1) + "," + y0.toFixed(1) + " " + x1.toFixed(1) + "," + y1.toFixed(1));
		}
		svg.remove();
		return JSON.stringify(out);
	})()`;
}

test.skipIf(process.env.LOOK !== "1")(
	"keeps every crest mark inside the hold the base leaves it",
	() => {
		execFileSync("playwright-cli", ["goto", "about:blank"], {
			stdio: "ignore",
		});
		const raw = execFileSync("playwright-cli", ["--raw", "eval", held()], {
			encoding: "utf8",
		});
		expect(JSON.parse(JSON.parse(raw.trim()))).toEqual([]);
	},
	60000,
);
