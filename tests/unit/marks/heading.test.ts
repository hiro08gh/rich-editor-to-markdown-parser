import { describe, expect, test } from "vitest";
import { HTMLToMarkdownParser } from "../../../src/html-to-markdown-parser";

describe("Heading", () => {
	test("should return convert h1 to #", () => {
		const parsed = HTMLToMarkdownParser("<h1>Hello</h1>");
		expect(parsed).toBe("# Hello");
	});

	test("should return convert h2 to ##", () => {
		const parsed = HTMLToMarkdownParser("<h2>Hello</h2>");
		expect(parsed).toBe("## Hello");
	});

	test("should return convert h3 to ###", () => {
		const parsed = HTMLToMarkdownParser("<h3>Hello</h3>");
		expect(parsed).toBe("### Hello");
	});

	test("should return convert h4 to ####", () => {
		const parsed = HTMLToMarkdownParser("<h4>Hello</h4>");
		expect(parsed).toBe("#### Hello");
	});

	test("should return convert h5 to #####", () => {
		const parsed = HTMLToMarkdownParser("<h5>Hello</h5>");
		expect(parsed).toBe("##### Hello");
	});

	test("should return convert h1 with strong", () => {
		const parsed = HTMLToMarkdownParser("<h1><strong>Hello</strong></h1>");
		expect(parsed).toBe("# **Hello**");
	});

	test("should return convert h6 to empty", () => {
		const parsed = HTMLToMarkdownParser("<h6>Hello</h6>");
		expect(parsed).toBe("");
	});
});
