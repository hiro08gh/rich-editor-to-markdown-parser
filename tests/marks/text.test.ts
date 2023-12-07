import { HTMLToMarkdownParser } from '../../src/html-to-markdown-parser';
import { options } from './options';

describe('Text', () => {
  test('should return convert p to text', () => {
    const parsed = HTMLToMarkdownParser('<p>Hello</p>');
    expect(parsed).toBe('Hello');
  });

  test('should return convert p to text', () => {
    const parsed = HTMLToMarkdownParser('<p>Hello</p><p>World</p>');
    expect(parsed).toBe('Hello\n\nWorld');
  });

  test('should return convert br to \n', () => {
    const parsed = HTMLToMarkdownParser('<p>Hello<br />World</p>');
    expect(parsed).toBe('Hello\nWorld');
  });

  test('should return convert strong to **text**', () => {
    const parsed = HTMLToMarkdownParser('<p><strong>Hello</strong></p>');
    expect(parsed).toBe('**Hello**');
  });

  test('should return convert strong to option', () => {
    const parsed = HTMLToMarkdownParser(
      '<p><strong>Hello</strong></p>',
      options,
    );
    expect(parsed).toBe('__Hello__');
  });

  test('should return convert italic to *text*', () => {
    const parsed = HTMLToMarkdownParser('<p><em>Hello</em></p>');
    expect(parsed).toBe('*Hello*');
  });

  test('should return convert italic to option', () => {
    const parsed = HTMLToMarkdownParser('<p><em>Hello</em></p>', options);
    expect(parsed).toBe('_Hello_');
  });

  test('should return convert s to ~~text~~', () => {
    const parsed = HTMLToMarkdownParser('<p><s>Hello</s></p>');
    expect(parsed).toBe('~~Hello~~');
  });

  test('should return convert u to <u>text</u>', () => {
    const parsed = HTMLToMarkdownParser('<p><u>Hello</u></p>');
    expect(parsed).toBe('<u>Hello</u>');
  });

  test('should return convert a to link marks', () => {
    const parsed = HTMLToMarkdownParser(
      '<p><a href="https://example.com">ここにリンク</a></p>',
    );
    expect(parsed).toBe('[ここにリンク](https://example.com)');
  });
});
