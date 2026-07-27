import type { ReactNode } from "react";

type Props = {
	title: string;
	children: ReactNode;
};

export function Page(props: Props): ReactNode {
	return (
		<main className="page">
			<h1 className="page-title">{props.title}</h1>
			{props.children}
		</main>
	);
}
