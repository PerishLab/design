import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export function Badge(props: Props): ReactNode {
	return <span className="badge">{props.children}</span>;
}
