import type { ReactNode } from "react";
import "./Badge.scss" with { type: "text" };

type Props = {
	children: ReactNode;
};

export function Badge(props: Props): ReactNode {
	return <span className="badge">{props.children}</span>;
}
