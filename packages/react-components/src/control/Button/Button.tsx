import type { ReactNode } from "react";

type Props = {
	children?: ReactNode;
	label?: string;
	press?: () => void;
	tone?: "solid" | "quiet";
	wide?: boolean;
	busy?: boolean;
	submit?: boolean;
};

export function Button(props: Props): ReactNode {
	const tone = props.tone ?? "solid";
	const width = props.wide === true ? " button-wide" : "";
	return (
		<button
			type={props.submit === true ? "submit" : "button"}
			className={`button button-${tone}${width}`}
			disabled={props.busy}
			aria-busy={props.busy}
			onClick={props.press}
		>
			{props.children ?? props.label}
		</button>
	);
}
