import type { ReactNode } from "react";

type Props = {
	title: string;
	text: string;
	mark?: string;
};

export function Hero(props: Props): ReactNode {
	return (
		<header className="hero">
			{props.mark !== undefined ? (
				<span className="ghost" aria-hidden="true">
					{props.mark}
				</span>
			) : null}
			<h1>{props.title}</h1>
			<p>{props.text}</p>
		</header>
	);
}
