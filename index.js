const log = require('hexo-log')({
  debug: false,
  silent: false
});

const cachedPost = {};
let lastPost;

function cachePost(data) {
  lastPost = data;
  return data;
}

function cachePermalink(permalink) {
  if (lastPost) {
    const fileName = lastPost.source.match(/[^/]*$/)[0].replace(/\.md$/, '');
    cachedPost[fileName] = permalink;
  }
  return permalink;
}

hexo.extend.filter.register('post_permalink', cachePost, 1);
hexo.extend.filter.register('post_permalink', cachePermalink, 25);

function replaceLinkId(data) {
  const re = /\^(\w+)$/gm;
  data.content = data.content.replace(re, (match, marker) => {
    const uniqueId = "^" + marker;
    log.info("hexo-obsidian-block-ref-cover: Replace ID ", marker);
    return `<span id="${uniqueId}" style="font-size: smaller; color: gray; vertical-align: top; opacity: 0.75;">${match}</span>`;
  });
    
}

function replaceRef(post) {
  const re = /\[\[(?:(?<file>[^\n#\|\]]+)?(?:#(?<title>[^\n\|\]]+))?)(?:\|(?<text>[^\n\]]+))?\]\]/g;

  post.content = post.content.replace(re, function (match, p1, p2, p3) {
    let fileName;
    let linkText;
    let title;

    try {
      fileName = p1 ? decodeURI(p1) : post.source.match(/[^/]*$/)[0].replace(/\.md$/, '');
      title = p2 ? decodeURI(p2) : null; // p2 is the title
      linkText = p3 ? decodeURI(p3) : fileName + (title ? `#${title}` : ''); // p3 is the link text

      if (title) {
        title = title.toLowerCase().replace(/ /g, '-');
      }
    } catch (e) {
      log.error("hexo-obsidian-block-ref-cover: Invalid URI ", p1);
      return `<a href="#">Invalid link</a>`; // Return a default link if URI is invalid
    }

    if (cachedPost[fileName]) {
      log.info("hexo-obsidian-block-ref-cover: Replace ", fileName);
      let href = `/${cachedPost[fileName]}`;
      if (title) {
        href += `#${title}`;
      }
      return `<a href="${href}">${linkText}</a>`;
    } else {
      log.warn("hexo-obsidian-block-ref-cover: No cached permalink for ", fileName);
    }

    return match;
  });
  return post;
}

hexo.extend.filter.register('before_post_render', replaceLinkId);
hexo.extend.filter.register("before_post_render", replaceRef);

module.exports = {
  replaceLinkId,
  replaceRef,
};