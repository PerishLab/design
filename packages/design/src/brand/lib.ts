import { manifest, urls } from "virtual:perish/brand";
import { asset, type Manifest, type Request } from "@perishlab/crest/assets";

export type Surface = Request["surface"];
export type Bearing = { product: string; surface?: Surface };

export function brand(product: string, surface: Surface = "light") {
	const selected = asset(manifest as Manifest, {
		product,
		surface,
		form: "sign",
		step: "full",
		medium: "svg",
		size: 100,
	});
	const url = urls[selected.id];
	if (!url) throw new Error(`Missing materialised Crest image: ${selected.id}`);
	return { ...selected, url };
}

export function bearing(node: HTMLImageElement, initial: Bearing) {
	let selected = initial;
	const media = matchMedia("(prefers-color-scheme: dark)");
	function refresh(): void {
		const modes = getComputedStyle(node).colorScheme.split(/\s+/);
		const auto =
			modes.includes("dark") && (!modes.includes("light") || media.matches)
				? "dark"
				: "light";
		const image = brand(selected.product, selected.surface ?? auto);
		node.src = image.url;
		node.dataset.crest = image.id;
	}
	const observer = new MutationObserver(refresh);
	for (let parent = node.parentElement; parent; parent = parent.parentElement)
		observer.observe(parent, {
			attributes: true,
			attributeFilter: ["class", "style", "data-tone", "data-system"],
		});
	media.addEventListener("change", refresh);
	refresh();
	return {
		update(next: Bearing): void {
			selected = next;
			refresh();
		},
		destroy(): void {
			observer.disconnect();
			media.removeEventListener("change", refresh);
		},
	};
}
