declare module "virtual:perish/brand" {
	export const manifest: import("@perishlab/crest/assets").Manifest;
	export const urls: Record<string, string>;
}
declare module "virtual:perish/views" {
	import type { Catalog } from "@perishlab/design";

	const source: Catalog;
	export default source;
}
