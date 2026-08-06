#!/usr/bin/env node
/* ==========================================================================
   MOPCON 2026 — 靜態頁產生器
   --------------------------------------------------------------------------
   用法：
     node tools/build.mjs            產生一次 2026/*.html
     node tools/build.mjs --serve    產生 ＋ 開本機預覽（存檔會自動重整）
     node tools/build.mjs --serve --port=3000

   只用 Node 內建功能，沒有 package.json、沒有 npm install、沒有 node_modules。

   樣板語法只有兩種：
     <!--#include parts/header.html -->   把另一個檔案原封不動貼進來
                                          （路徑相對於 _src/；被貼進來的檔案
                                            自己帶縮排，指令請寫在行首）
     {{key}}                              代入 _src/config.js 裡的值
                                          （SITE 的每個 key ＋ 該頁自己的欄位）

   注意：{{key}} 是「原封不動貼進去」，不會做 HTML 逸出。
         所以 config.js 的 title／desc 裡不要用半形雙引號 "。
   ========================================================================== */

import { readFileSync, writeFileSync, existsSync, statSync, watch } from 'node:fs';
import { createServer } from 'node:http';
import { join, resolve, dirname, extname, normalize } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const YEAR_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..');  /* …/2026 */
const SRC      = join(YEAR_DIR, '_src');
const ROOT     = resolve(YEAR_DIR, '..');                                 /* repo 根目錄 */
const YEAR_URL = '/' + YEAR_DIR.slice(ROOT.length + 1).replace(/\\/g, '/') + '/';

const argv    = process.argv.slice(2);
const SERVE   = argv.includes('--serve');
const PORT    = Number((argv.find((a) => a.startsWith('--port=')) || '').split('=')[1]) || 8080;

/* ── 樣板展開 ───────────────────────────────────────────────────────────── */

const INCLUDE_RE = /<!--#include\s+([^\s>]+)\s*-->/g;

/* 把 <!--#include …--> 一層一層貼進來（depth 是防呆：A include B、B 又 include A） */
function expandIncludes(text, from, depth = 0) {
  if (depth > 10) throw new Error(`include 巢狀太深，${from} 附近可能互相 include 了`);
  return text.replace(INCLUDE_RE, (_, rel) => {
    const file = join(SRC, rel);
    if (!existsSync(file)) throw new Error(`${from} 裡的 <!--#include ${rel} --> 找不到檔案：${file}`);
    return expandIncludes(readFileSync(file, 'utf8'), rel, depth + 1);
  });
}

/* 代入 {{key}}；有沒對上的一律報錯，不要讓 {{tilte}} 這種錯字上線 */
function fillVars(text, vars, from) {
  const missing = new Set();
  const out = text.replace(/\{\{(\w+)\}\}/g, (whole, key) => {
    if (key in vars && vars[key] != null) return String(vars[key]);
    missing.add(key);
    return whole;
  });
  if (missing.size) {
    throw new Error(
      `${from} 用到了沒有定義的變數：${[...missing].map((k) => '{{' + k + '}}').join('、')}\n` +
      `  → 請到 _src/config.js 的 SITE 或這一頁的設定裡補上`);
  }
  return out;
}

/* ── 產生 ───────────────────────────────────────────────────────────────── */

let buildId = 0;

async function build() {
  /* 加上 query 讓 Node 每次都重新讀 config.js（不然 watch 時會拿到舊的） */
  const { SITE, PAGES } = await import(pathToFileURL(join(SRC, 'config.js')).href + '?v=' + Date.now());
  const layout = readFileSync(join(SRC, 'layout.html'), 'utf8');

  for (const page of PAGES) {
    const pageFile = join(SRC, 'pages', page.file);
    if (!existsSync(pageFile)) throw new Error(`config.js 寫了 ${page.file}，但 _src/pages/${page.file} 不存在`);
    const body = readFileSync(pageFile, 'utf8');

    let out;
    if (page.layout === null) {
      /* 逃生門：這一頁完全自己來，build 只負責原封不動複製出去 */
      out = body;
    } else {
      /* 先把 include 全部貼好、把「本身也是 HTML」的兩個坑（content 與 head）
         併進 layout，最後才一次代入 {{…}}。
         順序不能反過來——內容裡的 {{h1}}、JSON-LD 裡的 {{dateISO}}，
         要跟 layout 的 {{title}} 在同一輪被代掉，不然它們會原樣印出來。
         （用 function 版的 replace，內容裡的 $& 之類才不會被當成特殊符號。） */
      const content = expandIncludes(body, page.file);
      const head = page.head ? expandIncludes(readFileSync(join(SRC, page.head), 'utf8'), page.head) : '';
      let doc = expandIncludes(layout, 'layout.html');
      doc = splice(doc, 'content', content);
      doc = splice(doc, 'head', head);
      out = fillVars(doc, { ...SITE, ...page, ...derived(SITE, page) }, page.file);
    }
    writeFileSync(join(YEAR_DIR, page.file), out);
  }

  writeFileSync(join(YEAR_DIR, 'sitemap.xml'), sitemap(SITE, PAGES));

  buildId++;
  return PAGES.length;
}

/* 把「值本身就是 HTML」的坑填掉。用 split/join 而不是 replace，
   一來是全部都換掉（layout 寫了兩次也不會漏），二來值裡的 $& 不會被當成特殊符號。 */
function splice(doc, slot, html) {
  return doc.split('{{' + slot + '}}').join(html);
}

/* build 自己算出來的值，不用在 config.js 手動維護 */
function derived(SITE, page) {
  if (page.head && !existsSync(join(SRC, page.head))) {
    throw new Error(`config.js 裡 ${page.file} 的 head 指到 _src/${page.head}，但這個檔案不存在`);
  }
  return {
    /* canonical／og:url：首頁用目錄網址（.../2026/），其他頁才帶檔名 */
    url:     pageUrl(SITE, page.file),
    ogImage: SITE.origin + SITE.base + SITE.ogImage
  };
}

function pageUrl(SITE, file) {
  return SITE.origin + SITE.base + (file === 'index.html' ? '' : file);
}

/* 只列這一年的頁面。根目錄那份 sitemap.xml 是列各年度首頁的，兩份互不干擾，
   robots.txt 兩份都有列出來。新增頁面時這裡會自己跟著長，不用手動維護。 */
function sitemap(SITE, PAGES) {
  const rows = PAGES.map((p) =>
    `  <url><loc>${pageUrl(SITE, p.file)}</loc><changefreq>weekly</changefreq>` +
    `<priority>${p.file === 'index.html' ? '1.00' : '0.80'}</priority></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
         `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>\n`;
}

/* ── 本機預覽 ───────────────────────────────────────────────────────────── */

const MIME = {
  '.html': 'text/html; charset=utf-8',  '.css': 'text/css; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml; charset=utf-8',
  '.png':  'image/png',  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',  '.ico': 'image/x-icon', '.webp': 'image/webp',
  '.woff': 'font/woff',  '.woff2': 'font/woff2', '.pdf': 'application/pdf'
};

/* 存檔後自動重整：每秒問一次 /__build，數字變了就 reload。
   只在預覽時注入，寫到硬碟上的 HTML 不會有這段。 */
const RELOAD_JS =
  '<script>(function(){var v=null;setInterval(function(){' +
  'fetch("/__build").then(function(r){return r.text()}).then(function(t){' +
  'if(v===null){v=t}else if(v!==t){location.reload()}}).catch(function(){})},1000)})()</script>\n';

function serve() {
  createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);

    if (url === '/__build') {
      res.writeHead(200, { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' });
      return res.end(String(buildId));
    }
    if (url === '/') {
      res.writeHead(302, { Location: YEAR_URL });
      return res.end();
    }

    let file = normalize(join(ROOT, url));
    if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end('403'); }
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
    if (!existsSync(file) || statSync(file).isDirectory()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(`<meta charset="utf-8"><h1>404</h1><p>找不到 ${url}</p><p><a href="${YEAR_URL}">回 ${YEAR_URL}</a></p>`);
    }

    const ext = extname(file).toLowerCase();
    const head = { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': 'no-store' };
    if (ext === '.html') {
      const html = readFileSync(file, 'utf8').replace('</body>', RELOAD_JS + '</body>');
      res.writeHead(200, head);
      return res.end(html);
    }
    res.writeHead(200, head);
    res.end(readFileSync(file));
  }).listen(PORT, () => {
    console.log(`\n  預覽網址  http://localhost:${PORT}${YEAR_URL}`);
    console.log(`  監看中    _src/（存檔會自動重新產生並重整瀏覽器）`);
    console.log(`  結束      Ctrl+C\n`);
  });

  let timer = null;
  watch(SRC, { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      try {
        const n = await build();
        console.log(`  ✓ 重新產生 ${n} 頁  ${new Date().toTimeString().slice(0, 8)}`);
      } catch (err) {
        console.error(`\n  ✗ ${err.message}\n`);
      }
    }, 60);
  });
}

/* ── 開跑 ───────────────────────────────────────────────────────────────── */

try {
  const n = await build();
  console.log(`✓ 產生 ${n} 頁 ＋ sitemap.xml 到 ${YEAR_DIR}`);
} catch (err) {
  console.error(`\n✗ 產生失敗：${err.message}\n`);
  process.exit(1);
}
if (SERVE) serve();
