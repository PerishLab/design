import { Card, Frame, Grid, Hero, Nav } from "@perish/react-components";
import { type ReactNode, useState } from "react";
import { Link } from "react-router";
import { notes } from "../docs/notes";
import { seeds } from "../docs/samples";
import { Knobs } from "../knobs/Knobs";
import type { Locale } from "../lib/routes";
import { Stage } from "./Stage";

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

export function Gallery(props: { locale: Locale }): ReactNode {
	const locale = props.locale;
	const said = speech[locale];
	return (
		<Frame>
			<Nav>
				<Link to={locale === "en" ? "/zh-CN/" : "/"}>{said.toggle}</Link>
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
