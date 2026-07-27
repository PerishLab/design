import type { ReactNode } from "react";

type Props = {
	text: string;
	tone?: "calm" | "warn";
};

export function Tag(props: Props): ReactNode {
	return (
		<span className={`tag tag-${props.tone ?? "calm"}`}>{props.text}</span>
	);
}
