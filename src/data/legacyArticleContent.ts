import { existsSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import type { LegacyPost } from './legacyPosts';

const projectRoot = process.cwd();
const publicRoot = join(projectRoot, 'public');
const legacyHtmlRoot = join(projectRoot, 'src', 'legacy-html');

function getLegacyHtmlPath(post: LegacyPost) {
  const cleanHref = post.href.replace(/^\/+|\/+$/g, '');
  const htmlPath = join(legacyHtmlRoot, cleanHref, 'index.html');
  const relativePath = relative(legacyHtmlRoot, htmlPath);

  if (relativePath.startsWith('..')) {
    throw new Error(`Legacy post path escapes src/legacy-html/: ${post.href}`);
  }

  return htmlPath;
}

function extractPostBody(html: string) {
  const startMatch = html.match(/<div class="post-body"(?:\s+itemprop="articleBody")?\s*>/);

  if (startMatch?.index == null) {
    return '';
  }

  const bodyStart = startMatch.index + startMatch[0].length;
  const tagPattern = /<\/?div\b[^>]*>/gi;
  tagPattern.lastIndex = bodyStart;

  let depth = 1;
  let tagMatch: RegExpExecArray | null;

  while ((tagMatch = tagPattern.exec(html)) !== null) {
    depth += tagMatch[0].startsWith('</') ? -1 : 1;

    if (depth === 0) {
      return html.slice(bodyStart, tagMatch.index).trim();
    }
  }

  return '';
}

function normalizeLegacyHtml(html: string, post: LegacyPost) {
  const postPath = post.href.replace(/^\/+/, '');

  return html
    .replace(/<a href="#([^"]+)" class="headerlink" title="[^"]*"><\/a>/g, '')
    .replace(/<span class="exturl" data-url="[^"]+">([\s\S]*?)<i class="fa fa-external-link-alt"><\/i><\/span>/g, '$1')
    .replace(/\sclass="headerlink"/g, '')
    .replace(/src="assets\//g, `src="/${postPath}assets/`)
    .replace(/href="assets\//g, `href="/${postPath}assets/`)
    .replace(/<br>\s*<img src="\/([^"]*\/assets\/[^"]+)"[^>]*>\s*<br>/g, (_match, assetPath: string) => {
      return existsSync(join(publicRoot, assetPath)) ? _match : '';
    })
    .replace(/<img src="\/([^"]*\/assets\/[^"]+)"[^>]*>/g, (_match, assetPath: string) => {
      return existsSync(join(publicRoot, assetPath)) ? _match : '';
    });
}

export function getLegacyArticleHtml(post: LegacyPost) {
  const htmlPath = getLegacyHtmlPath(post);

  if (!existsSync(htmlPath)) {
    return '';
  }

  const source = readFileSync(htmlPath, 'utf8');
  return normalizeLegacyHtml(extractPostBody(source), post);
}
