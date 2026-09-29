import * as english from "design-docs/i18n/en";
import { lint, roles } from "design-docs/i18n/policy";
import * as chinese from "design-docs/i18n/zh";
import { expect, test } from "vitest";

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
