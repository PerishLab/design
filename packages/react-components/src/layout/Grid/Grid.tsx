import type { ReactNode } from "react";
import "./Grid.scss" with { type: "text" };

type Props = {
	children: ReactNode;
};

export function Grid(props: Props): ReactNode {
	return <div className="grid">{props.children}</div>;
}
