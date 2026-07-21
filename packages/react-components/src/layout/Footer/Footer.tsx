import type { ReactNode } from "react";
import "./Footer.scss" with { type: "text" };

type Props = {
	children?: ReactNode;
};

export function Footer(props: Props): ReactNode {
	return (
		<footer className="footer">
			<span>
				a PerishLab workshop — this site is MIT and guarded by its own
				constitution.
			</span>
			<nav>{props.children}</nav>
		</footer>
	);
}
