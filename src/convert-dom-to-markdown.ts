import type { DOMNode, Element, Text } from "html-dom-parser";
import {
	createCodeBlockMark,
	createCustomClass,
	createHorizontalRuleMark,
	createImageMark,
	createInlineCodeMark,
	createLinkMark,
	createTextMark,
} from "./marks";
import type { Image, MarkStyle } from "./options";
import {
	isCodeElement,
	isCustomClassElement,
	isHorizontalRuleElement,
	isImageElement,
	isLinkElement,
	isListElement,
	isTableElement,
	isTextElement,
} from "./utils";

/**
 * Converts an array of DOM nodes into a Markdown string.
 * @param nodes - Array of DOM nodes to convert.
 * @param image - Image conversion options.
 * @param markStyle - Style options for Markdown formatting.
 * @returns The generated Markdown string.
 */
const convertDOMToMarkdown = ({
	nodes,
	image,
	markStyle,
}: {
	nodes: DOMNode[];
	image: Image;
	markStyle: MarkStyle;
}): string => {
	const result = [];

	for (const node of nodes) {
		if (node.type === "text") {
			result.push(convertTextNode(node));
		}

		if (node.type === "tag") {
			result.push(convertTagNode(node, image, markStyle));

			if (node.children.length !== 0) {
				convertDOMToMarkdown({
					nodes: node.children as DOMNode[],
					image,
					markStyle,
				});
			}
		}
	}

	return result.join("\n\n");
};

/**
 * Converts a text node into a Markdown string.
 * @param node - The text node to convert.
 * @returns The text content as a string.
 */
const convertTextNode = (node: Text): string => {
	return node.data;
};

/**
 * Converts an HTML element node into Markdown based on its type.
 * @param node - The HTML element node to convert.
 * @param image - Image conversion options.
 * @param markStyle - Style options for Markdown formatting.
 * @returns The generated Markdown string for the element.
 */
const convertTagNode = (
	node: Element,
	image: Image,
	markStyle: MarkStyle,
): string => {
	if (isTextElement(node)) {
		const marks = getRecursionMarks(node, image, markStyle);
		return createTextMark({ tagName: node.name, marks, markStyle });
	}

	if (isHorizontalRuleElement(node)) {
		const marks = getRecursionMarks(node, image, markStyle);
		return createHorizontalRuleMark(marks, markStyle);
	}

	if (isLinkElement(node)) {
		const { href } = node.attribs;
		const marks = getRecursionMarks(node, image, markStyle);

		return createLinkMark(marks, href);
	}

	if (isImageElement(node)) {
		if (node.name === "figure") {
			const marks = getRecursionMarks(node, image, markStyle);

			return marks;
		}

		const { alt } = node.attribs;
		const imgUrl = buildImageUrl(node, image);

		return createImageMark({
			src: imgUrl,
			alt,
		});
	}
	if (isCodeElement(node)) {
		if (node.name === "div") {
			const marks = getRecursionMarks(node, image, markStyle);

			return marks;
		}

		if (node.name === "pre") {
			const marks = getRecursionMarks(node, image, markStyle);

			const language = getChildNodeClass(node)
				.join("")
				.replace("language-", "");
			const fileName =
				node.parentNode?.type === "tag"
					? node.parentNode.attribs["data-filename"]
					: undefined;

			return createCodeBlockMark({ marks, markStyle, language, fileName });
		}

		if (node.name === "code") {
			const marks = getRecursionMarks(node, image, markStyle);
			const isCodeBlock =
				node.parentNode?.type === "tag" && node.parentNode?.name === "pre";

			return isCodeBlock ? marks : createInlineCodeMark(marks);
		}
	}

	if (isListElement(node)) {
		if (node.name === "ul" || node.name === "ol") {
			const marks = getRecursionMarks(node, image, markStyle);
			if (node.parentNode?.type === "tag" && node.parentNode?.name === "li") {
				return marks;
			}

			return marks;
		}
		const marks = getRecursionMarks(node, image, markStyle);
		const space =
			node.parent?.type === "tag" &&
			node.parent.prev &&
			(node.parent.name === "ul" || node.parent.name === "ol")
				? " ".repeat(findDepth(node) - 1)
				: "";
		const addLine =
			node.parent?.type === "tag" && !node.prev && node.parent.prev ? "\n" : "";
		const endLine = node.next ? "\n" : "";

		if (node.parentNode?.type === "tag" && node.parentNode?.name === "ol") {
			const olNum = Array.from(node.parentNode.children).indexOf(node) + 1;

			return `${addLine}${space}${olNum} ${marks}${endLine}`;
		}

		return `${addLine}${space}- ${marks}${endLine}`;
	}

	if (isTableElement(node)) {
		if (node.name === "table" || node.name === "tbody") {
			const marks = getRecursionMarks(node, image, markStyle);

			return marks;
		}

		if (node.name === "tr") {
			const marks = getRecursionMarks(node, image, markStyle);
			const head = node.prev
				? ""
				: `${"| --- ".repeat(node.children.length)}|\n`;

			return marks + head;
		}

		if (node.name === "th" || node.name === "td") {
			const marks = getRecursionMarks(node, image, markStyle);
			const nextStr = node.next ? " " : " " + "|";
			const endLine = node.next ? "" : "\n";

			return `| ${marks}${nextStr}${endLine}`;
		}
	}

	if (isCustomClassElement(node)) {
		const marks = getRecursionMarks(node, image, markStyle);
		const { class: _class } = node.attribs;

		return createCustomClass(marks, _class);
	}

	if (node.children.length !== 0) {
		convertDOMToMarkdown({
			nodes: node.children as DOMNode[],
			image,
			markStyle,
		});
	}

	return "";
};

/**
 * Recursively processes DOM nodes to generate a Markdown string.
 * @param node - The parent DOM element.
 * @param image - Image conversion options.
 * @param markStyle - Style options for Markdown formatting.
 * @returns The concatenated Markdown string for the children.
 */
const getRecursionMarks = (
	node: Element,
	image: Image,
	markStyle: MarkStyle,
) => {
	return node.childNodes
		.map((child) => {
			const childNode =
				child.type === "tag" || child.type === "text" ? child : null;

			if (childNode === null) {
				return "";
			}

			return convertDOMToMarkdown({
				nodes: [childNode],
				image,
				markStyle,
			});
		})
		.join("");
};

/**
 * Extracts the class names of a node's children.
 * @param node - The DOM element.
 * @returns An array of class names.
 */
const getChildNodeClass = (node: Element) => {
	return node.children
		.map((child) => (child.type === "tag" ? child.attribs.class : undefined))
		.filter(Boolean);
};

/**
 * Builds an image URL with optional size and query parameters.
 * @param node - The image DOM element.
 * @param image - Image conversion options (size and query parameters).
 * @returns The constructed image URL.
 */
const buildImageUrl = (
	node: Element,
	image: { size?: boolean; query?: string },
) => {
	const { src, width, height } = node.attribs;
	const url = new URL(src);

	if (image.size) {
		url.searchParams.set("w", width?.toString() ?? "");
		url.searchParams.set("h", height?.toString() ?? "");
	}

	if (image.query) {
		const params = new URLSearchParams(image.query);

		params.forEach((value, key) => {
			url.searchParams.set(key, value);
		});
	}

	return url.href;
};

/**
 * Calculates the nesting depth of a list element.
 * @param node - The list element.
 * @param currentDepth - The current depth (default is 0).
 * @returns The calculated depth.
 */
const findDepth = (node: Element, currentDepth = 0): number => {
	const depth = currentDepth;

	if (node.parent?.type === "tag" && isListElement(node.parent)) {
		return findDepth(node.parent, depth + 1);
	}

	return depth;
};

export { convertDOMToMarkdown };
