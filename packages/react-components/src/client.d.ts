declare module "virtual:perish/views" {
	type View = {
		path: string;
		load: () => Promise<{ default: unknown }>;
	};

	type Source = {
		login: boolean;
		views: readonly View[];
	};

	const source: Source;
	export default source;
}
