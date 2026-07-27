import type { ComponentType, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
	createBrowserRouter,
	type RouteObject,
	RouterProvider,
} from "react-router";
import { Note } from "../../content/Note/Note.js";
import { Button } from "../../control/Button/Button.js";
import { Field } from "../../control/Field/Field.js";
import { Card } from "../../layout/Card/Card.js";
import { Page } from "../Page/Page.js";

type Module = {
	default: unknown;
};

type Source = {
	path: string;
	load: () => Promise<Module>;
};

export type Catalog = {
	login: boolean;
	views: readonly Source[];
};

type Props = {
	source: Catalog;
};

function pattern(path: string): string {
	return path.replace(/\{([a-z][a-z0-9]*)\}/g, ":$1");
}

function view(source: Source): RouteObject {
	return {
		path: pattern(source.path),
		lazy: async () => {
			const held = await source.load();
			return { Component: held.default as ComponentType };
		},
	};
}

function back(): string {
	const raw = new URLSearchParams(globalThis.location.search).get("return");
	return raw?.startsWith("/") === true && !raw.startsWith("//") ? raw : "/";
}

function Login(): ReactNode {
	const [name, setName] = useState("");
	const [pass, setPass] = useState("");
	const [warn, setWarn] = useState("");
	const [busy, setBusy] = useState(false);

	async function submit(): Promise<void> {
		setBusy(true);
		setWarn("");
		try {
			const res = await fetch("/api/login", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ login: name, pass }),
			});
			if (res.ok) {
				globalThis.location.assign(back());
				return;
			}
			setWarn(
				res.status === 401 || res.status === 400
					? "That login and password did not match."
					: "Sign in failed. Try again.",
			);
		} catch {
			setWarn("Sign in failed. Try again.");
		}
		setBusy(false);
	}

	return (
		<Card title="Sign in">
			<Field label="Login" value={name} change={setName} />
			<Field label="Password" value={pass} change={setPass} kind="password" />
			{warn === "" ? null : <Note text={warn} tone="warn" />}
			<Button label="Sign in" press={submit} busy={busy} wide />
		</Card>
	);
}

function Missing(): ReactNode {
	return (
		<Page title="Not found">
			<Note text="That page does not exist." tone="warn" />
		</Page>
	);
}

function routes(source: Catalog): RouteObject[] {
	const found = source.views.map(view);
	if (source.login) {
		found.push({ path: "/login", Component: Login });
	}
	found.push({ path: "*", Component: Missing });
	return found;
}

export function Views(props: Props): ReactNode {
	const router = useMemo(
		() => createBrowserRouter(routes(props.source)),
		[props.source],
	);
	return <RouterProvider router={router} />;
}
