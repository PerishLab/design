import type { ReactNode } from "react";
import "./Hero.scss" with { type: "text" };

type Props = {
	title: string;
	text: string;
	mark?: string;
};

export function Hero(props: Props): ReactNode {
	return (
		<header className="hero">
			{props.mark !== undefined ? (
				<img
					className="ghost"
					src={props.mark}
					alt=""
					width="224"
					height="224"
				/>
			) : null}
			<h1>{props.title}</h1>
			<p>{props.text}</p>
		</header>
	);
}
