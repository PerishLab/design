import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import {
	Board,
	Button,
	Field,
	Line,
	Link,
	Note,
	Page,
	Sheet,
	Shell,
	Split,
	Tag,
} from "../src/lib";

test("product primitives", () => {
	const markup = renderToStaticMarkup(
		<Shell>
			<Page title="identity">
				<Board title="profile" brief="one operator">
					<Field label="name" value="ada" change={() => {}} />
					<Line name="ada" meta="operator">
						<Tag text="admin" />
					</Line>
					<Split>
						<Link label="back" href="/" />
						<Button label="save" press={() => {}} busy />
					</Split>
					<Note text="held" tone="warn" />
				</Board>
				<Sheet>bounded</Sheet>
			</Page>
		</Shell>,
	);
	expect(markup).toContain('class="shell"');
	expect(markup).toContain('class="board"');
	expect(markup).toContain('class="field-input"');
	expect(markup).toContain('class="button button-solid"');
	expect(markup).toContain('class="note note-warn"');
});
