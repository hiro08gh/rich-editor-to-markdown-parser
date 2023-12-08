import { OptionTypes } from './options';

const createTextMark = (
  tagName: string,
  text: string,
  markStyle: OptionTypes['markStyle'],
) => {
  switch (tagName) {
    case 'p':
      return text;
    case 'h1':
      return '#' + ' ' + text;
    case 'h2':
      return '##' + ' ' + text;
    case 'h3':
      return '###' + ' ' + text;
    case 'h4':
      return '####' + ' ' + text;
    case 'h5':
      return '#####' + ' ' + text;
    case 'strong':
      return markStyle.strong + text + markStyle.strong;
    case 'em':
      return markStyle.em + text + markStyle.em;
    case 's':
      return '~~' + text + '~~';
    case 'u':
      return '<u>' + text + '</u>';
    case 'blockquote':
      return '>' + ' ' + text;
    case 'br':
      return '\n';
    default:
      return '';
  }
};

const createHorizontalRuleMark = (
  marks: string,
  markStyle: OptionTypes['markStyle'],
) => {
  return marks + markStyle.hr;
};

const createImageMark = (src: string, alt: string, query: string) => {
  return `![${alt}](${src}${query})`;
};

const createLinkMark = (marks: string, href: string) => {
  return `[${marks}](${href})`;
};

const createCodeBlockMark = (
  text: string,
  markStyle: OptionTypes['markStyle'],
  language?: string,
  fileName?: string,
) => {
  const fileNameMark = fileName ? ':' + fileName : '';
  return (
    markStyle.pre + language + fileNameMark + '\n' + text + '\n' + markStyle.pre
  );
};

const createInlineCodeMark = (marks: string) => {
  return '`' + marks + '`';
};

const createCustomClass = (marks: string, _class: string) => {
  return `<span=class="${_class}">` + marks + '</span>';
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
