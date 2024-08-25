import { HTMLToMarkdownParser } from "./html-to-markdown-parser";
import type { OptionTypes } from "./options";

/**
 * @param html - HTML string.
 * @param options - Options.
 * @returns - String
 */
export const RichEditorToMarkdownParser = (
	html: string,
	options?: OptionTypes,
) => {
	if (typeof html !== "string") {
		throw new TypeError("First argument must be a string");
	}

	if (!html) {
		return "";
	}

	return HTMLToMarkdownParser(html, options);
};

export default RichEditorToMarkdownParser;
