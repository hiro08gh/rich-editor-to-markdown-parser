# rich-editor-to-markdown-parser

Convert microCMS Rich Editor response to Markdown

## Installation

npm:

```
npm install rich-editor-to-markdown-parser
```

## Usage

```js
import parseHTML from 'rich-editor-to-markdown-parser';

const html = '<h1>Hello World!</h1>';
parseHTML(html); // # Hello World!
```
