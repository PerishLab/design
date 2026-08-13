import { expect, test } from "vitest";
import { design } from "../../src/vite/lib.ts";

test("deduplicates the Svelte runtime", () => {
	expect(design().config()).toMatchObject({ resolve: { dedupe: ["svelte"] } });
});
