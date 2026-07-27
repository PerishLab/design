import type { ReactNode } from "react";

type Props = {
	text: string;
	tone?: "warn" | "calm";
};

export function Note(props: Props): ReactNode {
	return <p className={`note note-${props.tone ?? "calm"}`}>{props.text}</p>;
}
