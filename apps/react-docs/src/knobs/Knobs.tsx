import type { ReactNode } from "react";
import type { Entry } from "../docs/notes";

type Props = {
	entry: Entry;
	values: Record<string, unknown>;
	locale: "en" | "zh";
	change: (prop: string, next: unknown) => void;
};

function Field(props: {
	prop: string;
	note: Entry[string];
	value: unknown;
	locale: "en" | "zh";
	change: (next: unknown) => void;
}): ReactNode {
	const said = props.locale === "zh" ? props.note.zh : props.note.en;
	if (props.note.kind === "flag") {
		return (
			<label className="knob">
				<span>{props.prop}</span>
				<input
					type="checkbox"
					checked={Boolean(props.value)}
					onChange={(event) => props.change(event.target.checked)}
				/>
				<em>{said}</em>
			</label>
		);
	}
	if (props.note.kind === "call" || props.note.kind === "list") {
		return (
			<div className="knob">
				<span>{props.prop}</span>
				<code>{props.note.kind === "call" ? "fn" : "fixed example"}</code>
				<em>{said}</em>
			</div>
		);
	}
	return (
		<label className="knob">
			<span>{props.prop}</span>
			<input
				type="text"
				value={String(props.value ?? "")}
				onChange={(event) => props.change(event.target.value)}
			/>
			<em>{said}</em>
		</label>
	);
}

export function Knobs(props: Props): ReactNode {
	return (
		<div className="knobs">
			{Object.entries(props.entry).map(([prop, note]) => (
				<Field
					key={prop}
					prop={prop}
					note={note}
					value={props.values[prop]}
					locale={props.locale}
					change={(next) => props.change(prop, next)}
				/>
			))}
		</div>
	);
}
