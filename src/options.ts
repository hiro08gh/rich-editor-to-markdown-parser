export type OptionTypes = {
  image?: Partial<Image>;
  /**
   * Change markdown style.
   */
  markStyle?: Partial<MarkStyle>;
};

export type Image = {
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

export type MarkStyle = {
  strong: '**' | '__';
  em: '*' | '_';
  li: '*' | '-' | '+';
  hr: '---' | '***' | '___';
  pre: '```' | '~~~';
};

const makeOptions = (options?: OptionTypes) => {
  return {
    image: {
      size: options?.image?.size ?? true,
      query: options?.image?.query ?? '',
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
