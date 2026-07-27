import type { ReactNode } from "react";

type Props = {
	label: string;
	href: string;
};

export function Link(props: Props): ReactNode {
	return (
		<a className="link" href={props.href}>
			{props.label}
		</a>
	);
}
