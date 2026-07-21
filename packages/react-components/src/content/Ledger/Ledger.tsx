import type { ReactNode } from "react";
import "./Ledger.scss" with { type: "text" };

type Atom = {
	word: string;
	count: number;
};

type Props = {
	atoms: Atom[];
};

export function Ledger(props: Props): ReactNode {
	return (
		<ul className="ledger">
			{props.atoms.map((atom) => (
				<li key={atom.word}>
					<span>{atom.word}</span>
					<span className="tail" /> <span className="tally">{atom.count}</span>
				</li>
			))}
		</ul>
	);
}
