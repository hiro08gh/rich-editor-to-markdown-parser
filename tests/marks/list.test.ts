import { HTMLToMarkdownParser } from '../../src/html-to-markdown-parser';

describe('List', () => {
  test('should return convert ul to -', () => {
    const parsed = HTMLToMarkdownParser('<ul><li>text</li><li>text2</li></ul>');
    expect(parsed).toBe('- text\n- text2\n');
  });

  test('should return convert ol to number', () => {
    const parsed = HTMLToMarkdownParser(
      '<ol><li href="1">text</li><li>text</li><li>text</li></ol>',
    );
    expect(parsed).toBe('1 text\n2 text\n3 text\n');
  });
});
