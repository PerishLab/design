import { Card, Frame, Grid, Hero, Nav } from "@perish/react-components";
import { type ReactNode, useState } from "react";
import { notes } from "../docs/notes";
import { seeds } from "../docs/samples";
import { Knobs } from "../knobs/Knobs";
import { Stage } from "./Stage";

type Locale = "en" | "zh";

const speech: Record<Locale, { title: string; line: string; toggle: string }> =
	{
		en: {
			title: "perish design",
			line: "one system, many flavours",
			toggle: "简体中文",
		},
		zh: {
			title: "perish 设计系统",
			line: "一套系统,多种风味",
			toggle: "English",
		},
	};

function Bench(props: { name: string; locale: Locale }): ReactNode {
	const [values, set] = useState<Record<string, unknown>>(
		seeds[props.name] ?? {},
	);
	const entry = notes[props.name] ?? {};
	return (
		<Card title={props.name}>
			<Stage name={props.name} values={values} />
			<Knobs
				entry={entry}
				values={values}
				locale={props.locale}
				change={(prop, next) => set({ ...values, [prop]: next })}
			/>
		</Card>
	);
}

export function Gallery(): ReactNode {
	const [locale, speak] = useState<Locale>("en");
	const said = speech[locale];
	return (
		<Frame>
			<Nav>
				<button
					type="button"
					onClick={() => speak(locale === "en" ? "zh" : "en")}
				>
					{said.toggle}
				</button>
			</Nav>
			<Hero title={said.title} text={said.line} mark="◆" />
			<Grid>
				{Object.keys(notes).map((name) => (
					<Bench key={name} name={name} locale={locale} />
				))}
			</Grid>
		</Frame>
	);
}
