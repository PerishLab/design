import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export function Frame(props: Props): ReactNode {
	return <div className="frame">{props.children}</div>;
}
