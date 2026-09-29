import { expect, test } from "vitest";
import { cycle, move, type State } from "../src/focus/Tabs/Carousel/model.ts";

const values = ["base", "folio", "glass"];
const dwell = 5000;
const lease = 300000;
const timing = { values, dwell, lease };
const auto: State = { value: "base", mode: "auto", left: dwell };

test("automatic rotation advances without an empty state", () => {
	expect(
		cycle(auto, { type: "elapse", by: dwell, active: true }, timing),
	).toEqual({
		value: "folio",
		mode: "auto",
		left: dwell,
	});
});

test("pointer selection resets a durable lease before automatic rotation resumes", () => {
	const held = cycle(auto, { type: "pointer", value: "glass" }, timing);
	expect(held).toEqual({ value: "glass", mode: "held", left: lease });
	const reset = cycle(held, { type: "pointer", value: "folio" }, timing);
	expect(reset.left).toBe(lease);
	expect(
		cycle(reset, { type: "elapse", by: lease, active: true }, timing),
	).toEqual({
		value: "folio",
		mode: "auto",
		left: dwell,
	});
});

test("keyboard focus and explicit pause require explicit resume", () => {
	const paused = cycle(auto, { type: "keyboard", value: "glass" }, timing);
	expect(
		cycle(paused, { type: "elapse", by: lease, active: true }, timing),
	).toBe(paused);
	expect(cycle(paused, { type: "resume" }, timing)).toEqual({
		value: "glass",
		mode: "auto",
		left: dwell,
	});
});

test("hidden or hovered time does not consume either clock", () => {
	expect(
		cycle(auto, { type: "elapse", by: lease, active: false }, timing),
	).toBe(auto);
	const held = cycle(auto, { type: "pointer", value: "folio" }, timing);
	expect(
		cycle(held, { type: "elapse", by: lease, active: false }, timing),
	).toBe(held);
});

test("roving selection wraps and supports boundaries", () => {
	expect(move(2, 3, "ArrowRight")).toBe(0);
	expect(move(0, 3, "ArrowLeft")).toBe(2);
	expect(move(1, 3, "Home")).toBe(0);
	expect(move(1, 3, "End")).toBe(2);
});
