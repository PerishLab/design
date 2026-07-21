import type { ReactNode } from "react";

type Props = {
	title: string;
	children: ReactNode;
};

export function Card(props: Props): ReactNode {
	return (
		<section className="card">
			<h3>{props.title}</h3>
			{props.children}
		</section>
	);
}
