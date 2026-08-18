import { expect, test } from "vitest";
import { design } from "../../src/vite/lib.ts";

test("deduplicates the Svelte runtime", async () => {
	await expect(design().config()).resolves.toMatchObject({
		resolve: { dedupe: ["svelte"] },
	});
});
