import type { DOMNode, Element, Text } from 'html-dom-parser';
import type { OptionTypes } from './options';
import {
  createTextMark,
  createHorizontalRuleMark,
  createLinkMark,
  createImageMark,
  createCodeBlockMark,
  createInlineCodeMark,
} from './marks';
import {
  isTextElement,
  isHorizontalRuleElement,
  isLinkElement,
  isListElement,
  isImageElement,
  isCodeElement,
  isTableElement,
} from './utils';

type Args = {
  nodes: DOMNode[];
  image: OptionTypes['image'];
  markStyle: OptionTypes['markStyle'];
};

const convertDOMToMarkdown = ({ nodes, image, markStyle }: Args): string => {
  let result = [];

  for (const node of nodes) {
    if (node.type === 'text') {
      result.push(convertTextNode(node));
    }

    if (node.type === 'tag') {
      result.push(convertTagNode(node, image, markStyle));

      if (node.children.length !== 0) {
        convertDOMToMarkdown({
          // @ts-expect-error TODO: fix type
          nodes: node.children,
          image,
          markStyle,
        });
      }
    }
  }

  return result.join('\n\n');
};

/**
 * Get text in DOMNode
 */
const convertTextNode = (node: Text): string => {
  return node.data;
};

/**
 * Converts HTML tags to marks
 */
const convertTagNode = (
  node: Element,
  image: OptionTypes['image'],
  markStyle: OptionTypes['markStyle'],
): string => {
  if (isTextElement(node)) {
    const marks = getRecursionMarks(node, image, markStyle);
    return createTextMark(node.name, marks, markStyle);
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
    if (node.name === 'figure') {
      const marks = getRecursionMarks(node, image, markStyle);

      return marks;
    } else {
      const { src, alt, width, height } = node.attribs;
      // TODO refactoring
      const sizeQuery = image.size ? '?w=' + width + '&h=' + height : '';

      return createImageMark(src, alt, sizeQuery + image.query);
    }
  }
  if (isCodeElement(node)) {
    if (node.name === 'div') {
      const marks = getRecursionMarks(node, image, markStyle);

      return marks;
    }

    if (node.name === 'pre') {
      const marks = getRecursionMarks(node, image, markStyle);

      const language = getChildNodeClass(node).join('');
      const fileName =
        node.parentNode?.type === 'tag'
          ? node.parentNode.attribs['data-filename']
          : undefined;

      return createCodeBlockMark(marks, markStyle, language, fileName);
    }

    if (node.name === 'code') {
      const marks = getRecursionMarks(node, image, markStyle);
      const isCodeBlock =
        node.parentNode?.type === 'tag'
          ? node.parentNode?.name === 'pre'
          : undefined;

      return isCodeBlock ? marks : createInlineCodeMark(marks);
    }
  }

  if (isListElement(node)) {
    if (node.name === 'ul' || node.name === 'ol') {
      const marks = getRecursionMarks(node, image, markStyle);
      const prev =
        node.parentNode?.type === 'tag' && node.parentNode?.name === 'li'
          ? '\n' + '  ' + marks
          : marks;

      return prev;
    } else {
      const marks = getRecursionMarks(node, image, markStyle);

      if (node.parentNode?.type === 'tag' && node.parentNode?.name === 'ol') {
        const index = Array.from(node.parentNode.children).indexOf(node);

        return index + 1 + ' ' + marks + '\n';
      } else {
        return '-' + ' ' + marks + '\n';
      }
    }
  }

  if (isTableElement(node)) {
    if (node.name === 'table' || node.name === 'tbody') {
      const marks = getRecursionMarks(node, image, markStyle);

      return marks;
    }

    if (node.name === 'tr') {
      const marks = getRecursionMarks(node, image, markStyle);
      const prev = node.prev
        ? ''
        : '| --- '.repeat(node.children.length) + '|' + '\n';

      return marks + prev;
    }

    if (node.name === 'th' || node.name === 'td') {
      const marks = getRecursionMarks(node, image, markStyle);
      const next = node.next ? '' : '\n';
      const line = node.next ? ' ' : ' ' + '|';

      return '|' + ' ' + marks + line + next;
    }
  }

  if (node.children.length !== 0) {
    convertDOMToMarkdown({
      // @ts-expect-error TODO: fix type
      nodes: node.children,
      image,
      markStyle,
    });
  }

  return '';
};

/**
 * Recursively process convertDOMToMarkdown to get the markdown string
 */
const getRecursionMarks = (
  node: DOMNode,
  image: OptionTypes['image'],
  markStyle: OptionTypes['markStyle'],
) => {
  if (node.type === 'tag') {
    return node.childNodes
      .map((child) => {
        const childNode =
          child.type === 'tag' || child.type === 'text' ? child : null;

        if (childNode === null) {
          return '';
        }

        return convertDOMToMarkdown({
          nodes: [childNode],
          image,
          markStyle,
        });
      })
      .join('');
  }

  return '';
};

/**
 * Get child node class.
 */
const getChildNodeClass = (node: Element) => {
  return node.children
    .map((child) => (child.type === 'tag' ? child.attribs.class : undefined))
    .filter(Boolean);
};

export { convertDOMToMarkdown };
