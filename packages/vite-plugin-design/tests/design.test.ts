import { existsSync } from "node:fs";
import { expect, test } from "vitest";
import { design } from "../src/lib";

const plugin = design();

test("strips", () => {
	const code = `import "./Card.scss" with { type: "text" };`;
	const out = plugin.transform(code, "/x/Card.tsx");
	expect(out?.code).toBe(`import "./Card.scss";`);
});

test("spacing", () => {
	const code = `import '../a.scss'   with{type:'text'};`;
	const out = plugin.transform(code, "/x/a.ts");
	expect(out?.code).toBe(`import '../a.scss';`);
});

test("untouched", () => {
	const code = `import "./Card.scss";`;
	expect(plugin.transform(code, "/x/Card.tsx")).toBeNull();
});

test("scoped", () => {
	const code = `import "./notice.txt" with { type: "text" };`;
	expect(plugin.transform(code, "/x/Card.tsx")).toBeNull();
});

test("sources", () => {
	const code = `import "./Card.scss" with { type: "text" };`;
	expect(plugin.transform(code, "/x/Card.scss")).toBeNull();
	expect(plugin.transform(code, "/x/data.json")).toBeNull();
});

test("idempotent", () => {
	const code = `import "./Card.scss" with { type: "text" };`;
	const once = plugin.transform(code, "/x/Card.tsx");
	expect(plugin.transform(once?.code ?? "", "/x/Card.tsx")).toBeNull();
});

test("many", () => {
	const code = [
		`import "./a.scss" with { type: "text" };`,
		`import "./b.scss" with { type: "text" };`,
	].join("\n");
	const out = plugin.transform(code, "/x/Frame.tsx");
	expect(out?.code).toBe(`import "./a.scss";\nimport "./b.scss";`);
});

test("virtual", () => {
	expect(plugin.resolveId("virtual:perish-design/font")).toBe(
		"\0virtual:perish-design/font",
	);
	expect(plugin.resolveId("./Card.scss")).toBeNull();
	expect(plugin.load("./Card.scss")).toBeNull();
});

test("font", () => {
	const id = plugin.resolveId("virtual:perish-design/font") ?? "";
	const code = plugin.load(id) ?? "";
	const found = /^import (".*");\n$/.exec(code);
	const target = JSON.parse(found?.[1] ?? '""');
	expect(target).toMatch(/600\.css$/);
	expect(target.startsWith("/")).toBe(true);
	expect(existsSync(target)).toBe(true);
});
