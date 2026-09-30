import { design } from "@perishlab/design/vite";
import { expect, test } from "vitest";

test("deduplicates the Svelte runtime", async () => {
	await expect(design().config()).resolves.toMatchObject({
		resolve: { dedupe: ["svelte"] },
	});
});
