# rich-editor-to-markdown-parser

Convert microCMS Rich Editor response to Markdown.

<img width="1326" alt="スクリーンショット 0005-12-09 14 26 25" src="https://github.com/hiro08gh/rich-editor-to-markdown-parser/assets/39504660/68c9397f-1c80-45fa-97be-ca3fdc1e46ef">

## Installation

```
npm install rich-editor-to-markdown-parser
```

## Usage

```js
import parse from 'rich-editor-to-markdown-parser';

const html = '<h1>Hello World!</h1><p>This <strong>html</strong> string is <s>convert</s>into <a href="https://exampe.com">markdown.</a></p>'

parse(html); // # Hello World!\n\nThis **html** string is ~~convert ~~into [markdown.](https://exampe.com)
```

※ Unsupported HTML tags are parsed as strings. Please perform appropriate processing such as escaping with a markdown parsing library.

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
| ListBullet | Nesting list is not supported |
| ListOrdered | Nesting list is not supported |
| Link |  |
| Image |  |
| Embed | Not supported |
| Custom class | Parsed with HTML tags |

## Options

| Option | Description | Defualt |
| --- | --- | --- |
| image.size | Contain width and height image size. ex) ?w=1200&h=630 | false|
| image.query | Add image query in markdown. ex) ?format=webp | '' |
| markStyle.strong | ** or __ | ** |
| markStyle.em | *  or _ | * |
| markStyle.li | * or - or + | * |
| markStyle.hr | --- or *** or ___ | --- |
| markStyle.pre | ``` or ~~~ | ``` |
