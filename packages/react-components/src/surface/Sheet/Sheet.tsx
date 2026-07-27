import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export function Sheet(props: Props): ReactNode {
	return <section className="sheet">{props.children}</section>;
}
