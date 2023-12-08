# rich-editor-to-markdown-parser

Convert microCMS Rich Editor response to Markdown.

## Installation

```
npm install rich-editor-to-markdown-parser
```

## Usage

```js
import parse from 'rich-editor-to-markdown-parser';

const markdown = '<h1>Hello World!</h1>';
parse(markdown); // # Hello World!
```
