import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import { Banner, Hero, Rail } from "../src/lib";

test("marks are glyphs", () => {
	const markup = renderToStaticMarkup(
		<>
			<Banner mark="◆" title="banner" line="line" />
			<Hero mark="◆" title="hero" text="text" />
			<Rail stops={[{ mark: "01", name: "one", text: "first" }]} />
		</>,
	);
	expect(markup).not.toContain("<img");
	expect(markup).toContain(">◆</span>");
	expect(markup).toContain(">01</span>");
});
