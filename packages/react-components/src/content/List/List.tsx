import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export function List(props: Props): ReactNode {
	return <ul className="list">{props.children}</ul>;
}
