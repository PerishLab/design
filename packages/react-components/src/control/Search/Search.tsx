import type { ReactNode } from "react";
import "./Search.scss" with { type: "text" };

type Props = {
	value: string;
	change: (next: string) => void;
	hint?: string;
};

export function Search(props: Props): ReactNode {
	return (
		<input
			className="search"
			type="search"
			value={props.value}
			placeholder={props.hint}
			onChange={(event) => props.change(event.target.value)}
		/>
	);
}
