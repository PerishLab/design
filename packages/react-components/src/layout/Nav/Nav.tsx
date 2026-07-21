import type { ReactNode } from "react";
import "./Nav.scss" with { type: "text" };

type Props = {
	children: ReactNode;
};

export function Nav(props: Props): ReactNode {
	return <nav className="nav">{props.children}</nav>;
}
