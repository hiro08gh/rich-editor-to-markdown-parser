import { HTMLToMarkdownParser } from '../../src/html-to-markdown-parser';
import { options } from './options';

describe('Horizontal Rule', () => {
  test('should return convert hr to ---', () => {
    const parsed = HTMLToMarkdownParser('<p>text</p><hr /><p>text</p>');
    expect(parsed).toBe('text\n\n---\n\ntext');
  });

  test('should return convert hr to option', () => {
    const parsed = HTMLToMarkdownParser(
      '<p>text</p><hr /><p>text</p>',
      options,
    );
    expect(parsed).toBe('text\n\n***\n\ntext');
  });
});
