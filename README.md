# hexo-obsidian-block-ref-cover

A Hexo plugin to convert Obsidian block references into permalinks for Hexo blogs.

基于 Hexo 的 permalinks, 将 Obsidian 的块引用语法转为 Hexo 链接.

This module allows you to easily use the block reference syntax of Obsidian to render Hexo.

这个模块可以让你轻松使用 hexo 渲染 Obsidian 的块引用语法.

- `[[file]]` `[[file|text]]`
- `[[file#title]]` `[[file#title|text]]`
- `[[file#^id]]` `[[file#^id|text]]`
- `[[#title]]` `[[#title|text]]`
- `[[#^id]]` `[[#^id|text]]`
 
## Installation

```markdown
npm install hexo-obsidian-block-ref-cover --save
```

## Usage

You need config permalinks in `_config.yml`.

需在 `_config.yml` 中配置 permalinks.

```yaml
# in _config.yml
permalink: p/:year/:month/:day/:hour/:minute/:second/

# or with hexo-abbrlink
permalink: :author/:abbrlink/    
permalink_defaults:
  author: jasper
abbrlink:
  alg: crc32  # crc16(default) and crc32
  rep: hex    # dec(default) and hex
pretty_urls:
  trailing_index: true 
  trailing_html: true 
```

## More Details

Obsidian block reference syntax can be divided into the following types:

Obsidian 块引用语法可以分为下面几种:

- `[[file]]` `[[file|text]]`
- `[[file#title]]` `[[file#title|text]]`
- `[[file#^id]]` `[[file#^id|text]]`
- `[[#title]]` `[[#title|text]]`
- `[[#^id]]` `[[#^id|text]]`

When converting to Hexo links, `file` will be replaced by permalinks; and `title` will be replaced by `#title` in the url.

在转换为 Hexo 链接时, `file` 会被替换为 permalinks; 而 `title` 在 url 中会替换为 `#title`.

The most troublesome thing is the processing of `^id`. Here, the entire `^id` is replaced with a span tag at the original text, so that `#^id` can be treated as a normal title.

比较麻烦的是 `^id` 的处理, 这里在原文处将 `^id` 整个替换为了 span 标签,这样就能将 `#^id` 当作普通 title 处理了.

There is also a special case where the reference is to this article, which leads to no `file` field, and the file name of this file is obtained through `post.source`, and other processing is the same.

还有一种特殊情况是引用本文,导致没有 `file` 字段,通过 `post.source` 取到本文件的文件名, 其他处理流程相同.

## Thanks

This module is forked from [hexo-filter-titlebased-link](https://www.npmjs.com/package/hexo-filter-titlebased-link), thanks to the original author.

本模块 fork 自 [hexo-filter-titlebased-link](https://www.npmjs.com/package/hexo-filter-titlebased-link),感谢原作者.

## Related Hexo Plugins

- [hexo-filter-titlebased-link](https://www.npmjs.com/package/hexo-filter-titlebased-link)
- [hexo-filter-link-post](https://github.com/tcatche/hexo-filter-link-post): Transfer relative post link in markdown file to post link. 
- [hexo-abbrlink](https://github.com/Rozbo/hexo-abbrlink): Create one and only link for every post for hexo. 

## License

[MIT](./LICENSE)
