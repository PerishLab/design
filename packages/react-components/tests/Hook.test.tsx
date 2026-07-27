import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router";
import { expect, test } from "vitest";
import { hook, usePath } from "../src/lib";

const View = hook(
	() => ({ name: "ada" }),
	(props: { name: string }) => <p>{props.name}</p>,
);

test("hook", () => {
	expect(renderToStaticMarkup(<View />)).toBe("<p>ada</p>");
});

function Actor() {
	const { actor } = usePath("actor");
	return <p>{actor}</p>;
}

test("path", () => {
	const markup = renderToStaticMarkup(
		<MemoryRouter initialEntries={["/actor/ada"]}>
			<Routes>
				<Route path="/actor/:actor" element={<Actor />} />
			</Routes>
		</MemoryRouter>,
	);
	expect(markup).toContain("<p>ada</p>");
});
