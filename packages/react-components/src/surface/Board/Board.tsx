import type { ReactNode } from "react";

type Props = {
	title: string;
	brief?: string;
	children: ReactNode;
};

export function Board(props: Props): ReactNode {
	return (
		<section className="board">
			<header className="board-head">
				<h2 className="board-title">{props.title}</h2>
				{props.brief ? <p className="board-brief">{props.brief}</p> : null}
			</header>
			<div className="board-body">{props.children}</div>
		</section>
	);
}
