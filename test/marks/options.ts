import { OptionTypes } from '../../src/options';

export const options: OptionTypes = {
  image: {
    size: false,
    query: 'format=webp',
  },
  markStyle: {
    strong: '__',
    em: '_',
    li: '*',
    hr: '***',
    pre: '~~~',
  },
};
