import { HTMLToMarkdownParser } from '../../src/html-to-markdown-parser';

describe('List', () => {
  test('should return convert figure img to image marks', () => {
    const parsed = HTMLToMarkdownParser('<ul><li>text</li><li>text2</li></ul>');
    expect(parsed).toBe('- text\n- text2\n');
  });

  test('should return convert figure img to image marks', () => {
    const parsed = HTMLToMarkdownParser(
      '<ol><li href="1">text</li><li>text</li><li>text</li></ol>',
    );
    expect(parsed).toBe('1 text\n2 text\n3 text\n');
  });

  test('should return convert figure img to image marks', () => {
    const parsed = HTMLToMarkdownParser(
      '<ul><li>list1<ul><li>list2</li></ul></li></ul',
    );
    expect(parsed).toBe('- list1\n  - list2\n\n');
  });
});
