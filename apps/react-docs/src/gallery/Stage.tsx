import {
	Badge,
	Banner,
	Button,
	Card,
	Code,
	Copy,
	Footer,
	Forge,
	Grid,
	Hero,
	Ledger,
	List,
	Nav,
	Rail,
	Search,
} from "@perish/react-components";
import type { ReactNode } from "react";
import { atoms, stops } from "../docs/samples";

type Props = {
	name: string;
	values: Record<string, unknown>;
};

function said(values: Record<string, unknown>, prop: string): string {
	return String(values[prop] ?? "");
}

export function Stage(props: Props): ReactNode {
	const held = props.values;
	switch (props.name) {
		case "Badge":
			return <Badge>{said(held, "children")}</Badge>;
		case "Banner":
			return (
				<Banner
					mark={said(held, "mark")}
					title={said(held, "title")}
					line={said(held, "line")}
				>
					{said(held, "children")}
				</Banner>
			);
		case "Button":
			return <Button>{said(held, "children")}</Button>;
		case "Card":
			return <Card title={said(held, "title")}>{said(held, "children")}</Card>;
		case "Code":
			return (
				<Code name={said(held, "name")} copy={Boolean(held.copy)}>
					{said(held, "children")}
				</Code>
			);
		case "Copy":
			return <Copy text={said(held, "text")} />;
		case "Footer":
			return <Footer>{said(held, "children")}</Footer>;
		case "Forge":
			return <Forge repo={said(held, "repo")} />;
		case "Grid":
			return <Grid>{said(held, "children")}</Grid>;
		case "Hero":
			return (
				<Hero
					title={said(held, "title")}
					text={said(held, "text")}
					mark={said(held, "mark")}
				/>
			);
		case "Ledger":
			return <Ledger atoms={atoms} />;
		case "List":
			return (
				<List>
					<li>{said(held, "children")}</li>
				</List>
			);
		case "Nav":
			return <Nav>{said(held, "children")}</Nav>;
		case "Rail":
			return <Rail stops={stops} />;
		case "Search":
			return (
				<Search
					value={said(held, "value")}
					change={() => {}}
					hint={said(held, "hint")}
				/>
			);
		default:
			return null;
	}
}
