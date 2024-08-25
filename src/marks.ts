import type { MarkStyle } from "./options";

const createTextMark = ({
	tagName,
	marks,
	markStyle,
}: {
	tagName: string;
	marks: string;
	markStyle: MarkStyle;
}) => {
	switch (tagName) {
		case "p":
			return marks;
		case "h1":
			return `# ${marks}`;
		case "h2":
			return `## ${marks}`;
		case "h3":
			return `### ${marks}`;
		case "h4":
			return `#### ${marks}`;
		case "h5":
			return `##### ${marks}`;
		case "strong":
			return markStyle.strong + marks + markStyle.strong;
		case "em":
			return markStyle.em + marks + markStyle.em;
		case "s":
			return `~~${marks}~~`;
		case "u":
			return `<u>${marks}</u>`;
		case "blockquote":
			return `> ${marks}`;
		case "br":
			return "\n";
		default:
			return "";
	}
};

const createHorizontalRuleMark = (marks: string, markStyle: MarkStyle) => {
	return marks + markStyle.hr;
};

const createImageMark = ({ src, alt }: { src: string; alt: string }) => {
	return `![${alt}](${src})`;
};

const createLinkMark = (marks: string, href: string) => {
	return `[${marks}](${href})`;
};

const createCodeBlockMark = ({
	marks,
	markStyle,
	language,
	fileName,
}: {
	marks: string;
	markStyle: MarkStyle;
	language?: string;
	fileName?: string;
}) => {
	const fileNameMark = fileName ? `:${fileName}` : "";
	return `${markStyle.pre}${language}${fileNameMark}\n${marks}\n${markStyle.pre}`;
};

const createInlineCodeMark = (marks: string) => {
	return `\`${marks}\``;
};

const createCustomClass = (marks: string, _class: string) => {
	return `<span class="${_class}">${marks}</span>`;
};

export {
	createTextMark,
	createHorizontalRuleMark,
	createLinkMark,
	createImageMark,
	createCodeBlockMark,
	createInlineCodeMark,
	createCustomClass,
};
