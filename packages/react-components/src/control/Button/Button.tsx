import type { ReactNode } from "react";

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
