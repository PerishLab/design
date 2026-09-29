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

export function move(at: number, length: number, key: string): number {
	if (key === "ArrowRight" || key === "ArrowDown") return (at + 1) % length;
	if (key === "ArrowLeft" || key === "ArrowUp")
		return (at - 1 + length) % length;
	if (key === "Home") return 0;
	if (key === "End") return length - 1;
	return at;
}

export function cycle(state: State, event: Event, timing: Timing): State {
	const { values, dwell, lease } = timing;
	if (event.type === "pointer")
		return { value: event.value, mode: "held", left: lease };
	if (event.type === "keyboard")
		return {
			value: event.value ?? state.value,
			mode: "paused",
			left: dwell,
		};
	if (event.type === "pause") return { ...state, mode: "paused", left: dwell };
	if (event.type === "resume") return { ...state, mode: "auto", left: dwell };
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
