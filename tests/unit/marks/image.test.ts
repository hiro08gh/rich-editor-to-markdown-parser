import { describe, expect, test } from "vitest";
import { HTMLToMarkdownParser } from "../../../src/html-to-markdown-parser";
import { options } from "./options";

describe("Image", () => {
	test("should return convert img to image marks", () => {
		const parsed = HTMLToMarkdownParser(
			'<figure><img src="https://images.microcms-assets.io/assets/service/test/file.png" alt="text" width="1200" height="630" /></figure>',
		);
		expect(parsed).toBe(
			"![text](https://images.microcms-assets.io/assets/service/test/file.png?w=1200&h=630)",
		);
	});

	test("should return convert img to without alt", () => {
		const parsed = HTMLToMarkdownParser(
			'<figure><img src="https://images.microcms-assets.io/assets/service/test/file.png" alt="" width="1200" height="630" /></figure>',
		);
		expect(parsed).toBe(
			"![](https://images.microcms-assets.io/assets/service/test/file.png?w=1200&h=630)",
		);
	});

	test("should return convert img to option", () => {
		const parsed = HTMLToMarkdownParser(
			'<figure><img src="https://images.microcms-assets.io/assets/service/test/file.png" alt="" width="1200" height="630" /></figure>',
			options,
		);
		expect(parsed).toBe(
			"![](https://images.microcms-assets.io/assets/service/test/file.png?format=webp)",
		);
	});

	test("should return convert img with link", () => {
		const parsed = HTMLToMarkdownParser(
			'<figure><a href="https://example.com"><img src="https://images.microcms-assets.io/assets/service/test/file.png" alt="" width="1200" height="630" /></a></figure>',
		);
		expect(parsed).toBe(
			"[![](https://images.microcms-assets.io/assets/service/test/file.png?w=1200&h=630)](https://example.com)",
		);
	});
});
