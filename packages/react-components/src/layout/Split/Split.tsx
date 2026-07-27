import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export function Split(props: Props): ReactNode {
	return <div className="split">{props.children}</div>;
}
