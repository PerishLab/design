import {
	Badge,
	Banner,
	Button,
	Card,
	Code,
	Copy,
	Footer,
	Forge,
	Frame,
	Grid,
	Hero,
	Ledger,
	List,
	Nav,
	Rail,
	Search,
} from "@perish/react-components";
import { type ReactNode, useState } from "react";

const atoms = [
	{ word: "kernel", count: 12 },
	{ word: "grammar", count: 8 },
];

const stops = [
	{ mark: "01", name: "declare", text: "the library names the design" },
	{ mark: "02", name: "materialise", text: "the plugin wires it up" },
];

const sample = 'const seal = "clean";\n';

function Seat(props: { name: string; children: ReactNode }) {
	return <Card title={props.name}>{props.children}</Card>;
}

export function Gallery() {
	const [term, seek] = useState("");
	return (
		<Frame>
			<Nav>
				<Badge>design</Badge>
			</Nav>
			<Hero title="perish design" text="one system, many flavours" mark="◆" />
			<Grid>
				<Seat name="Badge">
					<Badge>stable</Badge>
				</Seat>
				<Seat name="Button">
					<Button>press</Button>
				</Seat>
				<Seat name="Code">
					<Code name="seal.ts" copy>
						{sample}
					</Code>
				</Seat>
				<Seat name="Copy">
					<Copy text="negentropy --strict ." />
				</Seat>
				<Seat name="Forge">
					<Forge repo="PerishFire/design" />
				</Seat>
				<Seat name="Search">
					<Search value={term} change={seek} hint="filter components" />
				</Seat>
				<Seat name="Ledger">
					<Ledger atoms={atoms} />
				</Seat>
				<Seat name="List">
					<List>
						<li>declare</li>
						<li>materialise</li>
					</List>
				</Seat>
				<Seat name="Rail">
					<Rail stops={stops} />
				</Seat>
			</Grid>
			<Banner mark="◆" title="Banner" line="a banner carries one line" />
			<Footer>
				<Badge>beta</Badge>
			</Footer>
		</Frame>
	);
}
