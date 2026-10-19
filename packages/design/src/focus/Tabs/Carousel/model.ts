export type Mode = "auto" | "held" | "paused";

export type State = {
	value: string;
	mode: Mode;
	left: number;
};

export type Event =
	| { type: "elapse"; by: number; active: boolean }
	| { type: "pointer"; value: string }
	| { type: "keyboard"; value?: string }
	| { type: "pause" }
	| { type: "resume" };

export type Timing = {
	values: string[];
	dwell: number;
	lease: number;
};

type Step = (at: number, length: number) => number;

const steps = new Map<string, Step>([
	["ArrowRight", (at, length) => (at + 1) % length],
	["ArrowDown", (at, length) => (at + 1) % length],
	["ArrowLeft", (at, length) => (at - 1 + length) % length],
	["ArrowUp", (at, length) => (at - 1 + length) % length],
	["Home", () => 0],
	["End", (_at, length) => length - 1],
]);

export function move(at: number, length: number, key: string): number {
	const step = steps.get(key);
	return step ? step(at, length) : at;
}

export function cycle(state: State, event: Event, timing: Timing): State {
	const { values, dwell, lease } = timing;
	switch (event.type) {
		case "pointer":
			return { value: event.value, mode: "held", left: lease };
		case "keyboard":
			return {
				value: event.value ?? state.value,
				mode: "paused",
				left: dwell,
			};
		case "pause":
			return { ...state, mode: "paused", left: dwell };
		case "resume":
			return { ...state, mode: "auto", left: dwell };
	}
	if (state.mode === "paused" || !event.active || event.by <= 0) return state;

	const left = state.left - event.by;
	if (left > 0) return { ...state, left };
	if (state.mode === "held") return { ...state, mode: "auto", left: dwell };
	if (values.length < 2) return { ...state, left: dwell };

	const at = Math.max(0, values.indexOf(state.value));
	return {
		value: values[(at + 1) % values.length],
		mode: "auto",
		left: dwell,
	};
}
