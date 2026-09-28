import { expect, test } from "vitest";
import * as english from "../src/lib/i18n/en/index.ts";
import { lint, roles } from "../src/lib/i18n/policy.ts";
import * as chinese from "../src/lib/i18n/zh/index.ts";

test("assigns explicit roles to governed copy", () => {
	expect(roles).toEqual({ "front.claim": "claim" });
});

test("refuses sentence punctuation at the end of a Chinese claim", () => {
	expect(lint("zh", { front: { claim: "语言会变。结构不变。" } })).toEqual([
		{
			locale: "zh",
			path: "front.claim",
			role: "claim",
			rule: "zh-claim-terminal-punctuation",
		},
	]);
	expect(lint("zh", { front: { claim: "审美会变，骨架不变" } })).toEqual([]);
});

test("current locale books satisfy their copy roles", () => {
	expect(lint("en", english)).toEqual([]);
	expect(lint("zh", chinese)).toEqual([]);
});
