import { type ReactNode, useState } from "react";
import "./Copy.scss" with { type: "text" };

type Props = {
	text: string;
};

export function Copy(props: Props): ReactNode {
	const [done, flip] = useState(false);
	const grab = () => {
		navigator.clipboard.writeText(props.text);
		flip(true);
		setTimeout(() => flip(false), 1600);
	};
	return (
		<button
			className={done ? "copy done" : "copy"}
			type="button"
			onClick={grab}
		>
			{done ? "copied" : "copy"}
		</button>
	);
}
