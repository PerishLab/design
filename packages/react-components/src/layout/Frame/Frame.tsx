import type { ReactNode } from "react";
import "@fontsource/spectral/600.css";
import "../../tokens.scss" with { type: "text" };
import "../../themes/dark.scss" with { type: "text" };
import "../../themes/light.scss" with { type: "text" };
import "./Frame.scss" with { type: "text" };

type Props = {
	children: ReactNode;
};

export function Frame(props: Props): ReactNode {
	return <div className="frame">{props.children}</div>;
}
