import type { ReactNode } from "react";

type Props = {
	mark: string;
	title: string;
	line: string;
	children?: ReactNode;
};

export function Banner(props: Props): ReactNode {
	return (
		<header className="banner">
			<span className="mark" aria-hidden="true">
				{props.mark}
			</span>
			<div>
				<h1>{props.title}</h1>
				<p>{props.line}</p>
			</div>
			<nav>{props.children}</nav>
		</header>
	);
}
