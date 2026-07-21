import type { ReactNode } from "react";
import "./Button.scss" with { type: "text" };

type Props = {
	children: ReactNode;
};

export function Button(props: Props): ReactNode {
	return (
		<button type="button" className="button">
			{props.children}
		</button>
	);
}
