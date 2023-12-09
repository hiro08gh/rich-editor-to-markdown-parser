# rich-editor-to-markdown-parser

Convert microCMS Rich Editor response to Markdown.

## Installation

```
npm install rich-editor-to-markdown-parser
```

## Usage

```js
import parse from 'rich-editor-to-markdown-parser';

const markdown = '<h1>Hello World!</h1><p>This <strong>html</strong> string is <s>convert</s>into <a href="https://exampe.com">markdown.</a></p>'

parse(markdown); // # Hello World!\n\nThis **html** string is ~~convert ~~into [markdown.](https://exampe.com)
```

## HTML list

| HTML | Description |
| --- | --- |
| Heading |  |
| Bold |  |
| Italic |  |
| Underline | Parsed with HTML tags. <u>text</u> |
| Strike |  |
| Code |  |
| TextAlign | Not supported |
| Horizontal Rule |  |
| Blockquote |  |
| CodeBlock |  |
| Table |  |
| ListBullet | Nesting list is not supported |
| ListOrdered | Nesting list is not supported. |
| Link |  |
| Image |  |
| Embed | Not supported |
| Custom class | Parsed with HTML tags. <span class='class'></span> |

## Options

| Option | Description |
| --- | --- |
| image.size | Contain width and height image size. ex) ?w=1200&h=630 |
| image.query | Add image query in markdown. ex) ?format=webp |
| markStyle.strong | ** or __ |
| markStyle.em | *  or _ |
| markStyle.li |  * or - or + |
| markStyle.hr | --- or *** or ___ |
| markStyle.pre | ``` or ~~~ |