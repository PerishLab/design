import {
	Badge,
	Banner,
	Board,
	Button,
	Card,
	Code,
	Copy,
	Field,
	Footer,
	Forge,
	Grid,
	Hero,
	Ledger,
	Line,
	Link,
	List,
	Nav,
	Note,
	Page,
	Rail,
	Search,
	Sheet,
	Shell,
	Split,
	Tag,
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
		case "Board":
			return (
				<Board title={said(held, "title")} brief={said(held, "brief")}>
					{said(held, "children")}
				</Board>
			);
		case "Button":
			return (
				<Button
					label={said(held, "label")}
					press={() => {}}
					tone={said(held, "tone") === "quiet" ? "quiet" : "solid"}
					wide={Boolean(held.wide)}
					busy={Boolean(held.busy)}
				>
					{said(held, "children")}
				</Button>
			);
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
		case "Field":
			return (
				<Field
					label={said(held, "label")}
					value={said(held, "value")}
					change={() => {}}
					kind={said(held, "kind") === "password" ? "password" : "text"}
					hint={said(held, "hint")}
				/>
			);
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
		case "Line":
			return (
				<Line name={said(held, "name")} meta={said(held, "meta")}>
					{said(held, "children")}
				</Line>
			);
		case "Link":
			return <Link label={said(held, "label")} href={said(held, "href")} />;
		case "List":
			return (
				<List>
					<li>{said(held, "children")}</li>
				</List>
			);
		case "Nav":
			return <Nav>{said(held, "children")}</Nav>;
		case "Note":
			return (
				<Note
					text={said(held, "text")}
					tone={said(held, "tone") === "warn" ? "warn" : "calm"}
				/>
			);
		case "Page":
			return <Page title={said(held, "title")}>{said(held, "children")}</Page>;
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
		case "Sheet":
			return <Sheet>{said(held, "children")}</Sheet>;
		case "Shell":
			return <Shell>{said(held, "children")}</Shell>;
		case "Split":
			return <Split>{said(held, "children")}</Split>;
		case "Tag":
			return (
				<Tag
					text={said(held, "text")}
					tone={said(held, "tone") === "warn" ? "warn" : "calm"}
				/>
			);
		default:
			return null;
	}
}
