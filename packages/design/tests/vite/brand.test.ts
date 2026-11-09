import { createHash } from "node:crypto";
import { manifest } from "virtual:perish/brand";
import { asset, read } from "@perishlab/crest/assets";
import { design } from "@perishlab/design/vite";
import { expect, test } from "vitest";

test("materialises official bytes with a complete selection receipt and matching head", () => {
	const plugin = design({
		serve: false,
		brand: { product: "design", origin: "https://design.example" },
	});
	plugin.configResolved({ root: process.cwd(), base: "/docs/" });
	const output = new Map<string, string | Buffer>();
	plugin.generateBundle.call({
		addWatchFile() {},
		emitFile(file) {
			output.set(file.fileName, file.source);
		},
	});
	const receipt = JSON.parse(String(output.get(".perish/brand.json")));
	expect(receipt.schema).toBe("design.brand/v1");
	expect(receipt.package.name).toBe("@perishlab/crest");
	expect(receipt.manifest.digest).toMatch(/^sha256:[a-f0-9]{64}$/);
	expect(receipt.model).toEqual(read(manifest).model);
	expect(receipt.assets).toHaveLength(108);
	for (const item of receipt.assets) {
		const bytes = output.get(item.output.slice("/docs/".length));
		expect(bytes).toBeDefined();
		expect(
			`sha256:${createHash("sha256")
				.update(bytes ?? "")
				.digest("hex")}`,
		).toBe(item.digest);
	}
	const selected = asset(manifest, {
		product: "design",
		surface: "light",
		form: "sign",
		step: "full",
		medium: "png",
		size: 180,
	});
	const share = receipt.assets.find(
		(item: { id: string }) => item.id === selected.id,
	);
	expect(plugin.transformIndexHtml()).toContainEqual({
		tag: "meta",
		attrs: {
			property: "og:image",
			content: `https://design.example${share.output}`,
		},
	});
});

test("unknown products and unsupported build bases refuse rather than falling back", () => {
	expect(() =>
		design({
			brand: { product: "unknown", origin: "https://design.example" },
		}).transformIndexHtml(),
	).toThrow("Unknown Crest product");
	expect(() =>
		design({
			brand: { product: "design", origin: "http://design.example" },
		}).transformIndexHtml(),
	).toThrow("HTTPS origin");
	expect(() =>
		design().configResolved({ root: process.cwd(), base: "./" }),
	).toThrow("absolute local Vite base");
});
