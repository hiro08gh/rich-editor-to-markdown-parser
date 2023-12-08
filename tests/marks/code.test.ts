import { HTMLToMarkdownParser } from '../../src/html-to-markdown-parser';
import { options } from './options';

describe('Code Block', () => {
  test('should return convert code block', () => {
    const parsed = HTMLToMarkdownParser('<code>text</code>');
    expect(parsed).toBe('`text`');
  });

  test('should return convert code block', () => {
    const parsed = HTMLToMarkdownParser(
      '<pre><code>console.log(&apos;test&apos;)</code></pre>',
    );
    expect(parsed).toBe("```\nconsole.log('test')\n```");
  });

  test('should return convert code block to option', () => {
    const parsed = HTMLToMarkdownParser(
      '<pre><code>console.log(&apos;test&apos;)</code></pre>',
      options,
    );
    expect(parsed).toBe("~~~\nconsole.log('test')\n~~~");
  });

  test('should return convert code block with language', () => {
    const parsed = HTMLToMarkdownParser(
      '<pre><code class="language-javascript">console.log(&apos;test&apos;)</code></pre>',
    );
    expect(parsed).toBe("```javascript\nconsole.log('test')\n```");
  });

  test('should return convert code block with filename', () => {
    const parsed = HTMLToMarkdownParser(
      '<div data-filename="filename"><pre><code class="language-javascript">console.log(&apos;test&apos;)</code></pre></div>',
    );
    expect(parsed).toBe("```javascript:filename\nconsole.log('test')\n```");
  });
});
