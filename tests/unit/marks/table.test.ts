import { describe, expect, test } from "vitest";
import { HTMLToMarkdownParser } from "../../../src/html-to-markdown-parser";

describe("Table", () => {
	test("should return convert table", () => {
		const parsed = HTMLToMarkdownParser(
			'<table><tbody><tr><th colspan="1" rowspan="1"><p>TH</p></th><th colspan="1" rowspan="1"><p>TH</p></th></tr><tr><td colspan="1" rowspan="1"><p>TD</p></td></tr></tbody></table>',
		);
		expect(parsed).toBe("| TH | TH |\n| --- | --- |\n| TD |\n");
	});
});
