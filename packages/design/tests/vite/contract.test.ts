import { design } from "@perishlab/design/vite";
import { afterEach, expect, test, vi } from "vitest";

const state = vi.hoisted(() => ({
	missing: "",
	invalid: false,
	failure: undefined as Error | undefined,
}));

function wrap(current: NodeJS.Require): NodeJS.Require {
	const load = Object.assign((id: string) => {
		if (
			(state.invalid || state.failure) &&
			id === current.resolve("@perishlab/crest/assets")
		) {
			if (state.failure) throw state.failure;
			return {};
		}
		return current(id);
	}, current);
	load.resolve = Object.assign(
		(...args: Parameters<typeof current.resolve>) => {
			if (args[0] === state.missing)
				throw Object.assign(new Error(`Missing ${state.missing}`), {
					code: "ERR_PACKAGE_PATH_NOT_EXPORTED",
				});
			return current.resolve(...args);
		},
		current.resolve,
	);
	return load;
}

vi.mock("node:module", async (original) => {
	const native = await original<typeof import("node:module")>();
	const module = { ...native };
	vi.spyOn(module, "createRequire").mockImplementation((url) =>
		wrap(native.createRequire(url)),
	);
	return module;
});

afterEach(() => {
	state.missing = "";
	state.invalid = false;
	state.failure = undefined;
});

test.each(["@perishlab/crest/assets", "@perishlab/crest/media/manifest.json"])(
	"qualifies %s when the plugin is requested, leaving the imported entry usable",
	(path) => {
		state.missing = path;
		expect(typeof design).toBe("function");
		expect(() => design()).toThrow(
			expect.objectContaining({
				code: "DESIGN_CREST_CONTRACT",
				message: expect.stringContaining("current stable @perishlab/crest"),
				cause: expect.objectContaining({
					code: "ERR_PACKAGE_PATH_NOT_EXPORTED",
				}),
			}),
		);
	},
);

test("refuses an assets module without the public selection and reader functions", () => {
	state.invalid = true;
	expect(() => design()).toThrow(
		expect.objectContaining({
			code: "DESIGN_CREST_CONTRACT",
			cause: expect.any(TypeError),
		}),
	);
});

test("preserves an error executing a resolved module rather than misclassifying its origin", () => {
	state.failure = new Error("assets execution failed");
	expect(() => design()).toThrow(state.failure);
});
