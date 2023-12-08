import { defineConfig } from 'tsup';

export default defineConfig([
  {
    name: 'main',
    entry: { 'rich-editor-to-markdown-parser': './src/index.ts' },
    format: ['cjs', 'esm'],
    legacyOutput: true,
    sourcemap: true,
    clean: true,
    bundle: true,
    splitting: false,
    dts: true,
    minify: true,
  },
]);
