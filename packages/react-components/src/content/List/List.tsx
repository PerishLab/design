import type { ReactNode } from "react";
import "./List.scss" with { type: "text" };

type Props = {
	children: ReactNode;
};

export function List(props: Props): ReactNode {
	return <ul className="list">{props.children}</ul>;
}
