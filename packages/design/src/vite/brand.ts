import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { asset, type Request, read } from "@perishlab/crest/assets";

export type Brand = { product: string; origin: string };
type Image = { file: string; bytes: Buffer; digest: string; id: string };

function digest(bytes: Buffer): string {
	return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

export function material() {
	const resolve = createRequire(import.meta.url).resolve;
	const source = resolve("@perishlab/crest/media/manifest.json");
	const root = dirname(dirname(source));
	const bytes = readFileSync(source);
	const manifest = read(JSON.parse(bytes.toString("utf8")));
	const published = JSON.parse(
		readFileSync(join(root, "package.json"), "utf8"),
	);
	if (
		published.name !== "@perishlab/crest" ||
		!/^\d+\.\d+\.\d+$/.test(published.version) ||
		published.version === "0.0.0"
	)
		throw new Error("Brand material needs the formal Crest package");
	const images: Image[] = manifest.assets.map((item) => {
		const bytes = readFileSync(join(root, item.file));
		if (digest(bytes) !== item.digest)
			throw new Error(`Changed Crest image: ${item.id}`);
		return {
			file: `crest/${item.digest.slice(7)}.${item.medium}`,
			bytes,
			digest: item.digest,
			id: item.id,
		};
	});
	return {
		manifest,
		images,
		package: { name: published.name, version: published.version },
		digest: digest(bytes),
		source,
	};
}

export function paths(images: Image[], base: string) {
	return Object.fromEntries(
		images.map((image) => [image.id, `${base}${image.file}`]),
	);
}

export function head(
	held: ReturnType<typeof material>,
	brand: Brand,
	base: string,
) {
	const origin = new URL(brand.origin);
	if (origin.protocol !== "https:" || origin.pathname !== "/")
		throw new Error("Brand origin must be an HTTPS origin");
	if (
		[origin.search, origin.hash, origin.username, origin.password].some(Boolean)
	)
		throw new Error(
			"Brand origin cannot carry a query, fragment or credentials",
		);
	const urls = paths(held.images, base);
	function image(
		medium: "svg" | "png",
		size: number,
		surface: Request["surface"] = "light",
	): string {
		return urls[
			asset(held.manifest, {
				product: brand.product,
				surface,
				form: "sign",
				step: "full",
				medium,
				size,
			}).id
		];
	}
	const share = new URL(image("png", 180), origin).href;
	return [
		...(["light", "dark"] as const).flatMap((surface) => [
			{
				tag: "link",
				attrs: {
					rel: "icon",
					type: "image/svg+xml",
					media: `(prefers-color-scheme: ${surface})`,
					href: image("svg", 100, surface),
				},
			},
			{
				tag: "link",
				attrs: {
					rel: "icon",
					type: "image/png",
					sizes: "48x48",
					media: `(prefers-color-scheme: ${surface})`,
					href: image("png", 48, surface),
				},
			},
		]),
		{
			tag: "link",
			attrs: {
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: image("png", 180),
			},
		},
		...[
			["property", "og:image", share],
			["property", "og:image:width", "180"],
			["property", "og:image:height", "180"],
			["property", "og:image:alt", `${brand.product} Crest`],
			["name", "twitter:card", "summary"],
			["name", "twitter:image", share],
		].map(([key, name, content]) => ({
			tag: "meta",
			attrs: { [key]: name, content },
		})),
	];
}
