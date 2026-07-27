import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export function Shell(props: Props): ReactNode {
	return <div className="shell">{props.children}</div>;
}
