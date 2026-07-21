import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export function Grid(props: Props): ReactNode {
	return <div className="grid">{props.children}</div>;
}
