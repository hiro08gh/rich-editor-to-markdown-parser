export type OptionTypes = {
  image: {
    /**
     * Contain width and height image size
     * ex) ?w=1200&h=630
     */
    size: boolean;
    /**
     * Add image query in markdown.
     * ex) ?format=webp
     */
    query: string;
  };
  /**
   * Change markdown style.
   */
  markStyle: {
    strong: '**' | '__';
    em: '*' | '_';
    li: '*' | '-' | '+';
    hr: '---' | '***' | '___';
    pre: '```' | '~~~';
  };
};

const makeOptions = (options?: OptionTypes) => {
  return {
    image: {
      size: options?.image.size ?? false,
      query: options?.image.query ?? '',
    },
    markStyle: {
      strong: options?.markStyle?.strong ?? '**',
      em: options?.markStyle?.em ?? '*',
      li: options?.markStyle?.li ?? '-',
      hr: options?.markStyle?.hr ?? '---',
      pre: options?.markStyle?.pre ?? '```',
    },
  };
};

export { makeOptions };
