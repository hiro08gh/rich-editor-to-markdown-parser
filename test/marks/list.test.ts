import { describe, expect, test } from "vitest";
import { HTMLToMarkdownParser } from "../../src/html-to-markdown-parser";

describe("List", () => {
	test("should return convert ul to -", () => {
		const parsed = HTMLToMarkdownParser("<ul><li>text</li><li>text2</li></ul>");
		expect(parsed).toBe("- text\n- text2");
	});

	test("should return convert ol to number", () => {
		const parsed = HTMLToMarkdownParser(
			'<ol><li href="1">text</li><li>text</li><li>text</li></ol>',
		);
		expect(parsed).toBe("1 text\n2 text\n3 text");
	});

	test("should return convert nested list", () => {
		const parsed = HTMLToMarkdownParser(
			"<ul><li>text1</li><li>text2<ul><li>text3</li><li>text4<ol><li>text5</li><li>text6</li><li>text7</li></ol></li></ul></li></ul>",
		);
		expect(parsed).toBe(
			"- text1\n- text2\n  - text3\n  - text4\n    1 text5\n    2 text6\n    3 text7",
		);
	});
});
