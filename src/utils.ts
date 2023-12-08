import type { Element } from 'html-dom-parser';

/**
 * DOM Element group.
 */
const TEXT_ELEMENT = [
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'strong',
  'em',
  's',
  'br',
  'u',
  'blockquote',
];
const HORIZONTAL_RULE_ELEMENT = ['hr'];
const LINK_ELEMENT = ['a'];
const IMAGE_ELEMENT = ['img', 'figure', 'figcaption'];
const CODE_ELEMENT = ['div', 'pre', 'code'];
const TABLE_ELEMENT = ['table', 'tbody', 'tr', 'th', 'td'];
const LIST_ELEMENT = ['ul', 'ol', 'li'];
const CUSTOM_CLASS_ELEMENT = ['span'];

/**
 * Find target DOM element.
 */
const isTextElement = (node: Element) => {
  return find(TEXT_ELEMENT, node.name);
};

const isHorizontalRuleElement = (node: Element) => {
  return find(HORIZONTAL_RULE_ELEMENT, node.name);
};

const isLinkElement = (node: Element) => {
  return find(LINK_ELEMENT, node.name);
};

const isImageElement = (node: Element) => {
  return find(IMAGE_ELEMENT, node.name);
};

const isCodeElement = (node: Element) => {
  return find(CODE_ELEMENT, node.name);
};

const isTableElement = (node: Element) => {
  return find(TABLE_ELEMENT, node.name);
};

const isListElement = (node: Element) => {
  return find(LIST_ELEMENT, node.name);
};

const isCustomClassElement = (node: Element) => {
  return node.attribs.class && find(CUSTOM_CLASS_ELEMENT, node.name);
};

const find = (elements: string[], name: string) => {
  return elements.some((v) => v === name);
};

export {
  isTextElement,
  isHorizontalRuleElement,
  isLinkElement,
  isListElement,
  isImageElement,
  isCodeElement,
  isTableElement,
  isCustomClassElement,
};
