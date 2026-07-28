import type { ReactNode } from "react";

type Stop = {
	mark: string;
	name: string;
	text: string;
};

type Props = {
	stops: Stop[];
};

export function Rail(props: Props): ReactNode {
	return (
		<ol className="rail">
			{props.stops.map((stop) => (
				<li key={stop.name}>
					<span className="mark" aria-hidden="true">
						{stop.mark}
					</span>
					<b>{stop.name}</b>
					<span>{stop.text}</span>
				</li>
			))}
		</ol>
	);
}
