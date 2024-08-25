import parse from "html-dom-parser";
import { convertDOMToMarkdown } from "./convert-dom-to-markdown";
import { makeOptions } from "./options";
import type { OptionTypes } from "./options";

/**
 * @param html - HTML string.
 * @param options - Options.
 * @returns - String
 */
const HTMLToMarkdownParser = (html: string, options?: OptionTypes) => {
	const { image, markStyle } = makeOptions(options);
	const nodes = parse(html);
	if (nodes) {
		return convertDOMToMarkdown({ nodes, image, markStyle });
	}

	console.error("Failed to parse HTML string.");
	return "";
};

export { HTMLToMarkdownParser };
