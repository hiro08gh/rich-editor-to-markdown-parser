# rich-editor-to-markdown-parser

Convert microCMS Rich Editor response to Markdown.

<img width="1326" alt="スクリーンショット 0005-12-09 14 26 25" src="https://github.com/hiro08gh/rich-editor-to-markdown-parser/assets/39504660/68c9397f-1c80-45fa-97be-ca3fdc1e46ef">

## Installation

```
npm install rich-editor-to-markdown-parser
```

## Usage

```js
import { parser } from 'rich-editor-to-markdown-parser';
// If you are importing multiple items with the same name parser, please assign an alias to them.
import { parser as RichEditorToMarkddownParser } from 'rich-editor-to-markdown-parser';

const html = '<h1>Hello World!</h1><p>This <strong>html</strong> string is <s>convert</s>into <a href="https://exampe.com">markdown.</a></p>'

parser(html); // # Hello World!\n\nThis **html** string is ~~convert~~ into [markdown.](https://exampe.com)
```

※ Unsupported HTML tags are parsed as strings. When converting markdown to HTML, consider sanitizing it using [DOMPurify](https://github.com/cure53/DOMPurify) or [sanitize-html](https://github.com/apostrophecms/sanitize-html).
## HTML list

| HTML | Description |
| --- | --- |
| Heading |  |
| Bold |  |
| Italic |  |
| Underline | Parsed with HTML tags |
| Strike |  |
| Code |  |
| TextAlign | Not supported |
| Horizontal Rule |  |
| Blockquote |  |
| CodeBlock |  |
| Table |  |
| ListBullet |  |
| ListOrdered |  |
| Link |  |
| Image |  |
| Embed | Not supported |
| Custom class | Parsed with HTML tags |

## Options

| Option | Description | Defualt |
| --- | --- | --- |
| image.size | Contain width and height image size. ex) ?w=1200&h=630 | true |
| image.query | Add image query in markdown. ex) ?format=webp | '' |
| markStyle.strong | ** or __ | ** |
| markStyle.em | *  or _ | * |
| markStyle.li | - or * or + | - |
| markStyle.hr | --- or *** or ___ | --- |
| markStyle.pre | ``` or ~~~ | ``` |

## Development

First, install npm dependencies.

```bash
npm install
```

Running unit test. This library uses vitest.

```bash
npm run test
```

Build modules.

```bash
npm run build
```
