import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export function Nav(props: Props): ReactNode {
	return <nav className="nav">{props.children}</nav>;
}
