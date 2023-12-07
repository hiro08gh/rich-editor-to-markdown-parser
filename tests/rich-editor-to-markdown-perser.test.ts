import Parser from '../src';

describe('HTMLToMarkdownParser', () => {
  test('should return convert markdown', () => {
    const parsed = Parser('<h1>Hello World!</h1><p>Hello World!</p>');
    expect(parsed).toBe('# Hello World!\n\nHello World!');
  });
});
