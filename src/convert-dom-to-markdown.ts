import type { DOMNode, Element, Text } from 'html-dom-parser';
import type { MarkStyle, Image } from './options';
import {
  createTextMark,
  createHorizontalRuleMark,
  createLinkMark,
  createImageMark,
  createCodeBlockMark,
  createInlineCodeMark,
  createCustomClass,
} from './marks';
import {
  isTextElement,
  isHorizontalRuleElement,
  isLinkElement,
  isListElement,
  isImageElement,
  isCodeElement,
  isTableElement,
  isCustomClassElement,
} from './utils';

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
    if (node.type === 'text') {
      result.push(convertTextNode(node));
    }

    if (node.type === 'tag') {
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
    if (node.name === 'figure') {
      const marks = getRecursionMarks(node, image, markStyle);

      return marks;
    } else {
      const { alt } = node.attribs;
      const imgUrl = buildImageUrl(node, image);

      return createImageMark({
        src: imgUrl,
        alt,
      });
    }
  }

  if (isCodeElement(node)) {
    if (node.name === 'div') {
      const marks = getRecursionMarks(node, image, markStyle);

      return marks;
    }

    if (node.name === 'pre') {
      const marks = getRecursionMarks(node, image, markStyle);

      const language = getChildNodeClass(node)
        .join('')
        .replace('language-', '');
      const fileName =
        node.parentNode?.type === 'tag'
          ? node.parentNode.attribs['data-filename']
          : undefined;

      return createCodeBlockMark({ marks, markStyle, language, fileName });
    }

    if (node.name === 'code') {
      const marks = getRecursionMarks(node, image, markStyle);
      const isCodeBlock =
        node.parentNode?.type === 'tag' && node.parentNode?.name === 'pre';

      return isCodeBlock ? marks : createInlineCodeMark(marks);
    }
  }

  if (isListElement(node)) {
    if (node.name === 'ul' || node.name === 'ol') {
      const marks = getRecursionMarks(node, image, markStyle);
      if (node.parentNode?.type === 'tag' && node.parentNode?.name === 'li') {
        return marks;
      }

      return marks;
    } else {
      const marks = getRecursionMarks(node, image, markStyle);
      const space =
        node.parent?.type === 'tag' &&
        node.parent.prev &&
        (node.parent.name === 'ul' || node.parent.name === 'ol')
          ? ' '.repeat(findDepth(node) - 1)
          : '';
      const addLine =
        node.parent?.type === 'tag' && !node.prev && node.parent.prev
          ? '\n'
          : '';
      const endLine = node.next ? '\n' : '';

      if (node.parentNode?.type === 'tag' && node.parentNode?.name === 'ol') {
        const olNum = Array.from(node.parentNode.children).indexOf(node) + 1;

        return addLine + space + olNum + ' ' + marks + endLine;
      } else {
        return addLine + space + '-' + ' ' + marks + endLine;
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
      const head = node.prev
        ? ''
        : '| --- '.repeat(node.children.length) + '|' + '\n';

      return marks + head;
    }

    if (node.name === 'th' || node.name === 'td') {
      const marks = getRecursionMarks(node, image, markStyle);
      const nextStr = node.next ? ' ' : ' ' + '|';
      const endLine = node.next ? '' : '\n';

      return '|' + ' ' + marks + nextStr + endLine;
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

  return '';
};

/**
 * Recursively process convertDOMToMarkdown to get the markdown string
 */
const getRecursionMarks = (
  node: Element,
  image: Image,
  markStyle: MarkStyle,
) => {
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
};

/**
 * Get child node class.
 */
const getChildNodeClass = (node: Element) => {
  return node.children
    .map((child) => (child.type === 'tag' ? child.attribs.class : undefined))
    .filter(Boolean);
};

/**
 * Build image url with query params
 */
const buildImageUrl = (
  node: Element,
  image: { size?: boolean; query?: string },
) => {
  const { src, width, height } = node.attribs;
  const url = new URL(src);

  if (image.size) {
    url.searchParams.set('w', width?.toString() ?? '');
    url.searchParams.set('h', height?.toString() ?? '');
  }

  if (image.query) {
    const params = new URLSearchParams(image.query);

    params.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
  }

  return url.href;
};

const findDepth = (node: Element, currentDepth = 0): number => {
  const depth = currentDepth;

  if (node.parent?.type === 'tag' && isListElement(node.parent)) {
    return findDepth(node.parent, depth + 1);
  }

  return depth;
};

export { convertDOMToMarkdown };
