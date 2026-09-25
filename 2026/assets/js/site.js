/* ==========================================================================
   MOPCON 2026 — arc-teal 樣板的共用 JavaScript
   --------------------------------------------------------------------------
   內容順序：
     A. 導航列設定（NAV / NAV_CTA）← 要增減選單項目只改這裡
     B. 小工具
     C. 桌機導航列（含下拉、溢出收進「更多」）
     D. 手機漢堡抽屜
     E. 首頁的議程預覽／講者／贊助牆／統計數字
     F. 議程頁（軌道篩選＋時間軸；今年單日，沒有 Day 切換）
     G. 講者頁（列出全部講者）
     H. 贊助頁（依級別排卡片）
     I. 啟動
   沒有用到任何外部套件，純 vanilla JS。
   ========================================================================== */

/* ==========================================================================
   A. 導航列設定
   ========================================================================== */

/* ▼ 要增減導航列項目，只改這個陣列（children 就會變下拉選單）
      text     顯示文字
      href     連結；還沒有頁面就先放 '#'
      children 有填就變成下拉選單（下拉項目只要 text + href）
   桌機寬度不夠時，右邊的項目會自動收進「更多 ▾」，不用改 CSS。 */
var NAV = [
  { text: '首頁',        href: 'index.html' },
  { text: 'JSDC',        href: 'https://2026.jsdc.tw/' },
  { text: '主辦單位',    href: 'organizers.html' },
  { text: '特色議程',    href: 'sessions.html' },
  // { text: '議程介紹',    href: 'agenda.html' },
  { text: '講者陣容',    href: 'speakers.html' },
  // { text: '贊助夥伴',    href: 'sponsor.html' },
  { text: '時光機', children: [
      { text: 'MOPCON 2025', target: "_blank", href: 'https://mopcon.org/2025/' },
      { text: 'MOPCON 2024', target: "_blank", href: 'https://mopcon.org/2024/' },
      { text: 'MOPCON 2023', target: "_blank", href: 'https://mopcon.org/2023/' },
      { text: 'MOPCON 2022', target: "_blank", href: 'https://mopcon.org/2022/' },
      { text: 'MOPCON 2021', target: "_blank", href: 'https://mopcon.org/2021/' },
      { text: 'MOPCON 2020', target: "_blank", href: 'https://mopcon.org/2020/' },
      { text: 'MOPCON 2019', target: "_blank", href: 'https://mopcon.org/2019/' },
      { text: 'MOPCON 2018', target: "_blank", href: 'https://mopcon.org/2018/' },
      { text: 'MOPCON 2017', target: "_blank", href: 'https://mopcon.org/2017/' },
      { text: 'MOPCON 2016', target: "_blank", href: 'https://mopcon.org/2016/' },
      { text: 'MOPCON 2015', target: "_blank", href: 'https://mopcon.org/2015/' },
      { text: 'MOPCON 2014', target: "_blank", href: 'https://mopcon.org/2014/' },
      { text: 'MOPCON 2013', target: "_blank", href: 'https://mopcon.org/2013/' },
      { text: 'MOPCON 2012', target: "_blank", href: 'https://mopcon.org/2012/' }
  ]}
];
var NAV_CTA = { text: '前往購票', href: '#' };
NAV_CTA = null;  // 還沒有購票連結，先隱藏

/* 溢出時那顆按鈕的文字（桌機空間不夠才會出現） */
var NAV_MORE_TEXT = '更多';

/* ==========================================================================
   B. 小工具
   ========================================================================== */

/* 把字串裡的特殊符號轉成安全的 HTML（假資料換成真資料後也不會壞版） */
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* 目前是哪一頁（用來標 aria-current）；file:// 直接開也判斷得出來 */
function currentFile() {
  var p = location.pathname.split('/').pop();
  return p ? p : 'index.html';
}
function isCurrent(href) {
  if (!href || href.charAt(0) === '#') return false;
  return href.split('/').pop() === currentFile();
}

function el(tag, cls, html) {
  var n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
}

/* 截斷字串至指定字元數（預設 120 字元），超過部分補上 '...'。
   完整支援 multi-byte 字元（中文、全形字、Emoji、Surrogate Pairs 等），
   優先使用 Intl.Segmenter 或 Array.from（以 Unicode 字元/字形叢集為單位），
   確保截斷時不破壞最後一個 multi-byte 字元。 */
function truncateBio(s, maxLen) {
  if (!s) return '';
  maxLen = maxLen || 120;

  var chars;
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    var segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    chars = Array.from(segmenter.segment(s), function (item) { return item.segment; });
  } else {
    chars = Array.from(s);
  }

  if (chars.length <= maxLen) return s;

  var out = chars.slice(0, maxLen).join('');
  /* 防禦性檢查：若最後一個 code unit 恰好為孤立的高位代理字元（High Surrogate），予以移除以防亂碼 */
  var lastCode = out.charCodeAt(out.length - 1);
  if (lastCode >= 0xD800 && lastCode <= 0xDBFF) {
    out = out.slice(0, -1);
  }

  return out + '...';
}

/* ==========================================================================
   C. 桌機導航列
   --------------------------------------------------------------------------
   溢出策略：先把 NAV 全部排出來，量得出寬度不夠時，從最右邊的項目開始
   一個一個收進「更多 ▾」的下拉選單裡（有子選單的項目會變成標題＋縮排連結）。
   所以不論放 3 個還是 30 個項目都不會擠爛、也不會蓋到 logo。
   ========================================================================== */

var navList, navEl, moreItem, moreSub;

function buildDesktopNav() {
  navEl = document.getElementById('mainNav');
  navList = document.getElementById('navList');
  if (!navList) return;
  navList.innerHTML = '';

  NAV.forEach(function (item, i) {
    navList.appendChild(buildNavItem(item, i));
  });

  /* 「更多」項目：平常隱藏，量到不夠寬才會出現 */
  moreItem = el('li', 'nav-item nav-more');
  moreItem.hidden = true;
  var btn = el('button', 'nav-link', esc(NAV_MORE_TEXT) + '<span class="caret" aria-hidden="true"></span>');
  btn.type = 'button';
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-haspopup', 'true');
  moreSub = el('ul', 'sub sub--end');
  moreItem.appendChild(btn);
  moreItem.appendChild(moreSub);
  navList.appendChild(moreItem);

  /* 購票 CTA */
  var cta = document.getElementById('headerCta');
  if (cta) {
    if (NAV_CTA) {
      cta.textContent = NAV_CTA.text;
      cta.setAttribute('href', NAV_CTA.href);
    } else {
      cta.parentNode.removeChild(cta);
    }
  }
}

function _buildNavA(item, style) {
  var a = el('a', style);
  a.setAttribute('href', item.href);
  a.textContent = item.text;
  if (item.target) a.setAttribute('target', item.target);
  return a;
}

function buildNavItem(item, i) {
  var li = el('li', 'nav-item');
  li.setAttribute('data-i', i);
  if (item.children && item.children.length) {
    var btn = el('button', 'nav-link', esc(item.text) + '<span class="caret" aria-hidden="true"></span>');
    btn.type = 'button';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-haspopup', 'true');
    var sub = el('ul', 'sub');
    item.children.forEach(function (c) {
      var sli = document.createElement('li');
      sli.appendChild(_buildNavA(c));
      sub.appendChild(sli);
    });
    li.appendChild(btn);
    li.appendChild(sub);
  } else {
    var a = _buildNavA(item, 'nav-link');
    if (isCurrent(item.href)) a.setAttribute('aria-current', 'page');
    li.appendChild(a);
  }
  return li;
}

/* 目前這排項目實際佔多寬（不能用 scrollWidth：選單是靠右排的，
   往左邊溢出的部分 scrollWidth 量不到） */
function navContentWidth() {
  var kids = navList.children, w = 0, n = 0;
  for (var i = 0; i < kids.length; i++) {
    if (kids[i].hidden) continue;
    w += kids[i].offsetWidth;
    n++;
  }
  var gap = parseFloat(window.getComputedStyle(navList).columnGap);
  if (n > 1 && gap) w += gap * (n - 1);
  return w;
}

/* 量寬度，決定要收幾個項目進「更多」 */
function fitNav() {
  if (!navList || !navEl) return;
  if (window.innerWidth < 768) return;          /* 手機用抽屜，不用算 */

  /* 1) 先全部攤開 */
  var items = [];
  var kids = navList.children;
  for (var i = 0; i < kids.length; i++) {
    if (kids[i] === moreItem) continue;
    kids[i].hidden = false;
    items.push(kids[i]);
  }
  moreSub.innerHTML = '';
  moreItem.hidden = true;
  moreItem.removeAttribute('data-has-current');
  closeAllSubs();

  /* 2) 從最後一個往前收，直到塞得進去 */
  var guard = items.length + 2;
  var idx = items.length - 1;
  while (guard-- > 0 && navContentWidth() > navEl.clientWidth && idx >= 0) {
    if (moreItem.hidden) { moreItem.hidden = false; continue; }  /* 先讓「更多」占位再量 */
    collapseIntoMore(items[idx], NAV[parseInt(items[idx].getAttribute('data-i'), 10)]);
    idx--;
  }
  if (!moreSub.children.length) moreItem.hidden = true;
}

function collapseIntoMore(li, data) {
  li.hidden = true;
  var wrap = document.createElement('li');
  if (data && data.children && data.children.length) {
    wrap.className = 'sub-group';
    var inner = '<span class="sub-group-t">' + esc(data.text) + '</span><ul>';
    data.children.forEach(function (c) {
      inner += '<li><a href="' + esc(c.href) + '">' + esc(c.text) + '</a></li>';
    });
    wrap.innerHTML = inner + '</ul>';
  } else if (data) {
    wrap.innerHTML = '<a href="' + esc(data.href) + '">' + esc(data.text) + '</a>';
    if (isCurrent(data.href)) {
      wrap.firstChild.setAttribute('aria-current', 'page');
      moreItem.setAttribute('data-has-current', 'true');
    }
  }
  moreSub.insertBefore(wrap, moreSub.firstChild);
}

/* ── 下拉選單開關（hover、click、Enter 都可以；Esc 與點外面會關） ── */
function openSub(li) {
  closeAllSubs(li);
  li.classList.add('is-open');
  var btn = li.querySelector('.nav-link');
  if (btn && btn.tagName === 'BUTTON') btn.setAttribute('aria-expanded', 'true');
  alignSub(li);
}
function closeSub(li) {
  li.classList.remove('is-open');
  var btn = li.querySelector('.nav-link');
  if (btn && btn.tagName === 'BUTTON') btn.setAttribute('aria-expanded', 'false');
}
function closeAllSubs(except) {
  if (!navList) return;
  var open = navList.querySelectorAll('.nav-item.is-open');
  for (var i = 0; i < open.length; i++) if (open[i] !== except) closeSub(open[i]);
}
/* 靠右邊的選單改成右對齊，避免被視窗邊緣切掉 */
function alignSub(li) {
  var sub = li.querySelector('.sub');
  if (!sub) return;
  sub.classList.remove('sub--end');
  var r = sub.getBoundingClientRect();
  if (r.right > window.innerWidth - 8 || r.left < 8) sub.classList.add('sub--end');
}

function bindNavEvents() {
  if (!navList) return;

  navList.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('.nav-link') : null;
    if (!btn || btn.tagName !== 'BUTTON') return;
    var li = btn.parentNode;
    if (li.classList.contains('is-open')) closeSub(li); else openSub(li);
  });

  /* hover 開關：mouseenter／mouseleave 不會冒泡，所以用捕獲階段（第三個參數 true）接。
     只處理「滑進／滑出 li 本身」，滑進下拉面板時不會誤關（面板是 li 的子節點）。 */
  navList.addEventListener('mouseenter', function (e) {
    var li = e.target;
    if (!li.classList || !li.classList.contains('nav-item')) return;
    if (!li.querySelector('.sub') || window.innerWidth < 768) return;
    openSub(li);
  }, true);

  navList.addEventListener('mouseleave', function (e) {
    var li = e.target;
    if (!li.classList || !li.classList.contains('is-open')) return;
    if (window.innerWidth < 768) return;
    closeSub(li);
  }, true);

  document.addEventListener('click', function (e) {
    if (navList.contains(e.target)) return;
    closeAllSubs();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = navList.querySelector('.nav-item.is-open');
    if (open) {
      var btn = open.querySelector('.nav-link');
      closeSub(open);
      if (btn) btn.focus();
    }
  });

  /* 焦點離開整個項目時也要關（鍵盤使用者一路 Tab 過子選單之後，
     不然那片下拉面板會一直浮在內容上面）。focusout 會冒泡，所以不用捕獲階段。 */
  navList.addEventListener('focusout', function (e) {
    var li = e.target.closest ? e.target.closest('.nav-item') : null;
    if (li && li.classList.contains('is-open') && !li.contains(e.relatedTarget)) closeSub(li);
  });
}

/* sticky header 捲動後加一點陰影（很輕微，不做浮誇動畫） */
function bindHeaderShadow() {
  var h = document.getElementById('siteHeader');
  if (!h) return;
  var tick = false;
  function upd() {
    h.classList.toggle('is-stuck', window.pageYOffset > 4);
    tick = false;
  }
  window.addEventListener('scroll', function () {
    if (tick) return;
    tick = true;
    window.requestAnimationFrame(upd);
  });
  upd();
}

/* ==========================================================================
   D. 手機漢堡抽屜
   ========================================================================== */
var drawer, burger, lastFocus;

function buildDrawer() {
  drawer = document.getElementById('drawer');
  burger = document.getElementById('burger');
  if (!drawer) return;
  var body = document.getElementById('drawerNav');
  var ul = el('ul');

  NAV.forEach(function (item) {
    var li = document.createElement('li');
    if (item.children && item.children.length) {
      var btn = el('button', 'm-acc',
        '<span>' + esc(item.text) + '</span><span class="caret" aria-hidden="true"></span>');
      btn.type = 'button';
      btn.setAttribute('aria-expanded', 'false');
      var sub = el('ul', 'm-sub');
      sub.hidden = true;
      item.children.forEach(function (c) {
        sub.appendChild(el('li', null, '<a href="' + esc(c.href) + '">' + esc(c.text) + '</a>'));
      });
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
        sub.hidden = open;
      });
      li.appendChild(btn);
      li.appendChild(sub);
    } else {
      var a = el('a', 'm-link', esc(item.text));
      a.setAttribute('href', item.href);
      if (isCurrent(item.href)) a.setAttribute('aria-current', 'page');
      li.appendChild(a);
    }
    ul.appendChild(li);
  });
  body.innerHTML = '';
  body.appendChild(ul);

  var foot = document.getElementById('drawerCta');
  if (foot) {
    if (NAV_CTA) {
      foot.textContent = NAV_CTA.text;
      foot.setAttribute('href', NAV_CTA.href);
    } else {
      foot.parentNode.removeChild(foot);
    }
  }

  if (burger) burger.addEventListener('click', openDrawer);
  var close = document.getElementById('drawerClose');
  if (close) close.addEventListener('click', closeDrawer);

  drawer.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeDrawer(); return; }
    if (e.key === 'Tab') trapTab(e, drawer);
  });
}

function openDrawer() {
  if (!drawer) return;
  lastFocus = document.activeElement;
  drawer.hidden = false;
  document.body.classList.add('nav-open');
  if (burger) burger.setAttribute('aria-expanded', 'true');
  var first = drawer.querySelector('#drawerClose');
  if (first) first.focus();
}
function closeDrawer() {
  if (!drawer || drawer.hidden) return;
  drawer.hidden = true;
  document.body.classList.remove('nav-open');
  if (burger) burger.setAttribute('aria-expanded', 'false');
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}
function trapTab(e, root) {
  var all = root.querySelectorAll('a[href],button');
  var f = [];
  for (var i = 0; i < all.length; i++) if (all[i].offsetParent !== null) f.push(all[i]);
  if (!f.length) return;
  var first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

/* ==========================================================================
   E. 首頁：議程預覽／講者／贊助牆／統計數字
   ========================================================================== */

/* 「議程」＝ 一般議程 ＋ Keynote；報到／休息／午餐／閉幕不算場次 */
function isTalkRow(s) {
  return s.type === 'talk' || s.type === 'keynote';
}

/* 幾何佔位圖形（圓環／六邊形／方形輪流出現），正式照片或 logo 進來就換掉 */
var PH_SHAPES = ['shape-ring', 'shape-hex', 'shape-sq'];
function phShape(i, white) {
  return '<span class="shape ' + PH_SHAPES[i % 3] + (white ? ' shape-w' : '') + '" aria-hidden="true"></span>';
}
function trackName(id) {
  if (typeof TRACKS === 'undefined') return id;
  for (var i = 0; i < TRACKS.length; i++) if (TRACKS[i].id === id) return TRACKS[i].name;
  return id;
}
function trackClass(track) {
  if (!track) return '';
  var t = String(track).toLowerCase().trim();
  if (t.indexOf('software defined reality') !== -1 || t === 'sdr') return 'tag-track-sdr tag-class-sdr';
  if (t.indexOf('next-gen intelligence') !== -1 || t.indexOf('next-gen') !== -1) return 'tag-track-nextgen tag-class-nextgen';
  if (t.indexOf('ai in action') !== -1) return 'tag-track-ai-action tag-class-ai-action';
  if (t === 'a' || t === 'b' || t === 'c') return 'tag-' + t.toUpperCase();
  return 'tag-' + t.replace(/[^a-z0-9_-]+/gi, '-');
}
function levelClass(level) {
  if (!level) return '';
  var l = String(level).toLowerCase();
  if (l.indexOf('expert') !== -1 || l.indexOf('進階') !== -1 || l.indexOf('高階') !== -1) {
    return 'tag-level-expert';
  }
  if (l.indexOf('normal') !== -1 || l.indexOf('中階') !== -1 || l.indexOf('實作') !== -1) {
    return 'tag-level-normal';
  }
  if (l.indexOf('basic') !== -1 || l.indexOf('入門') !== -1 || l.indexOf('基礎') !== -1) {
    return 'tag-level-basic';
  }
  return 'tag-level-default';
}

function categoryClass(cls) {
  if (!cls) return '';
  var c = String(cls).toLowerCase().trim();
  if (c.indexOf('software defined reality') !== -1) {
    return 'tag-class-sdr';
  }
  if (c.indexOf('next-gen intelligence') !== -1 || c.indexOf('next-gen') !== -1) {
    return 'tag-class-nextgen';
  }
  if (c.indexOf('ai in action') !== -1) {
    return 'tag-class-ai-action';
  }
  if (c.indexOf('ai') !== -1) {
    return 'tag-class-ai';
  }
  if (c.indexOf('uxv') !== -1 || c.indexOf('unmanned') !== -1 || c.indexOf('vehicle') !== -1) {
    return 'tag-class-uxv';
  }
  if (c.indexOf('robotics') !== -1 || c.indexOf('robot') !== -1) {
    return 'tag-class-robotics';
  }
  if (c.indexOf('security') !== -1 || c.indexOf('安全') !== -1) {
    return 'tag-class-security';
  }
  if (c.indexOf('mobile') !== -1 || c.indexOf('ios') !== -1 || c.indexOf('android') !== -1) {
    return 'tag-class-mobile';
  }
  if (c.indexOf('cloud') !== -1 || c.indexOf('devops') !== -1) {
    return 'tag-class-cloud';
  }
  return 'tag-class-default';
}

function levelTagHtml(level) {
  if (!level) return '';
  var cls = levelClass(level);
  return '<span class="tag tag-level ' + cls + '"><span class="tag-dot" aria-hidden="true"></span>' + esc(level) + '</span>';
}

function trackTagHtml(track) {
  if (!track || track === 'ALL') return '';
  return '<span class="tag ' + esc(trackClass(track)) + '"><span class="tag-dot" aria-hidden="true"></span>' +
         esc(trackName(track)) + '</span>';
}

function classTagHtml(className) {
  if (!className) return '';
  var cls = categoryClass(className);
  return '<span class="tag tag-class ' + cls + '"><span class="tag-dot" aria-hidden="true"></span>' + esc(className) + '</span>';
}

function tagsHtml(s) {
  var h = '<div class="tag-row">';
  if (s.type === 'keynote') h += '<span class="tag tag-key">Keynote</span>';
  if (s.track && s.track !== 'ALL') {
    h += '<span class="tag ' + esc(trackClass(s.track)) + '"><span class="tag-dot" aria-hidden="true"></span>' +
         esc(trackName(s.track)) + '</span>';
  }
  if (s.level) h += levelTagHtml(s.level);
  return h + '</div>';
}

/* 首頁議程預覽要顯示幾筆：想多一筆／少一筆就改這個數字 */
var PREVIEW_MAX = 5;

function renderAgendaPreview() {
  var box = document.getElementById('agendaPreview');
  if (!box || typeof SESSIONS === 'undefined') return;
  /* 挑選規則（不寫死索引、也不看日期，所以改了 data.js 也不會挑出空的）：
     第一輪 先挑「每一場 Keynote」＋「每一軌最早的那一場」；
     第二輪 若還沒滿 PREVIEW_MAX，就依 data.js 的順序往後補。
     data.js 是由早到晚寫的，而第一輪挑到的一定是各軌最早的，所以補完仍是時間順序。 */
  var picked = [], used = {}, seen = {};
  SESSIONS.forEach(function (s, i) {
    if (!isTalkRow(s) || picked.length >= PREVIEW_MAX) return;
    var key = (s.type === 'keynote') ? ('keynote-' + i) : ('track-' + s.track);
    if (seen[key]) return;
    seen[key] = 1;
    used[i] = 1;
    picked.push(s);
  });
  SESSIONS.forEach(function (s, i) {
    if (!isTalkRow(s) || used[i] || picked.length >= PREVIEW_MAX) return;
    used[i] = 1;
    picked.push(s);
  });
  var h = '';
  picked.forEach(function (s) {
    h += '<li class="prev-item">' +
           '<div class="prev-time">' + esc(s.start) + '</div>' +
           '<div class="prev-body">' +
             '<h3>' + esc(s.title) + '</h3>' +
             '<p class="prev-meta">' + esc(s.speaker) + '｜' + esc(s.org) + '</p>' +
             tagsHtml(s) +
           '</div>' +
         '</li>';
  });
  box.innerHTML = h;
}

function renderSpeakers() {
  var box = document.getElementById('speakerGrid');
  if (!box || typeof SPEAKERS === 'undefined') return;
  var h = '';
  SPEAKERS.slice(0, 8).forEach(function (p, i) {
    let avatar = p.img ? '<img loading="lazy" decoding="async" src="' + esc(p.img) + '" alt="">' : '<div class="avatar">' + phShape(i, true) + '</div>';
    h += '<li class="spk">' +
           '<div class="ph ph-round avatar">' + avatar + '</div>' +
           '<h3>' + esc(p.name) + '</h3>' +
           '<p>' + esc(p.role) + '｜' + esc(p.org) + '</p>' +
         '</li>';
  });
  box.innerHTML = h;
}

/* 贊助牆：依級別分組，級別越高格子越大 */
var WALL_CLASS = { xl: 'wall-1', lg: 'wall-2', md: 'wall-2', sm: 'wall-3', xs: 'wall-3' };
function renderSponsorWall() {
  var box = document.getElementById('sponsorWall');
  if (!box || typeof SPONSORS === 'undefined' || typeof SPONSOR_TIERS === 'undefined') return;
  var h = '', n = 0;
  SPONSOR_TIERS.forEach(function (tier) {
    var list = SPONSORS.filter(function (s) { return s.tier === tier.id; });
    if (!list.length) return;
    h += '<div class="wall"><h3 class="wall-t">' + esc(tier.name) + '</h3>' +
         '<div class="wall-grid ' + (WALL_CLASS[tier.size] || 'wall-3') + '">';
    list.forEach(function (s) {
      h += '<div class="ph">' + (s.logo ? '<img src="' + esc(s.logo) + '" alt="">'
             : phShape(n, false)) +
           '<span class="wall-name">' + esc(s.name) + '</span></div>';
      n++;
    });
    h += '</div></div>';
  });
  box.innerHTML = h;
}

/* 首頁「大會簡介」下面那排統計數字：能從 data.js 算的就算，不要手動維護。
   HTML 裡對應的寫法是 <b data-count="tracks">3</b>，寫在標籤裡的數字只是
   「JS 沒跑時看到的備援值」，JS 一跑就會被算出來的值蓋掉。
   目前首頁用到 tracks 與 sessions 兩個；speakers／sponsors 先備著，
   想在哪裡多顯示一個數字，就加一個 data-count="…" 的元素，不用改這支函式。
   ※ 天數算不出來——今年單日、SESSIONS 已經沒有 day 欄位，
     所以首頁那顆「1 Day」是直接寫在 index.html 裡的，改天數要手動改那一行。 */
function fillCounts() {
  if (typeof SESSIONS === 'undefined') return;
  var map = {
    tracks:   (typeof TRACKS === 'undefined' ? 0 : TRACKS.length),
    sessions: SESSIONS.filter(isTalkRow).length,
    speakers: (typeof SPEAKERS === 'undefined' ? 0 : SPEAKERS.length),
    sponsors: (typeof SPONSORS === 'undefined' ? 0 : SPONSORS.length)
  };
  var els = document.querySelectorAll('[data-count]');
  for (var i = 0; i < els.length; i++) {
    var k = els[i].getAttribute('data-count');
    if (map[k] != null) els[i].textContent = map[k];
  }
}

/* ==========================================================================
   F. 議程頁：軌道篩選 ＋ 縱向時間軸
   --------------------------------------------------------------------------
   今年是「單日三軌」，所以這裡沒有 Day 切換，只有軌道篩選。
   （要改回多天的話：data.js 每筆加回 day 欄位，這裡再加一組分頁按鈕。）

   版面：一個「時段」一列（<li class="ses">），左邊一個時間、右邊放這個時段的
   所有軌道卡片。桌機（≥1024px）時那些卡片會橫向並排，所以同一時間的三軌會
   對齊在同一條水平線上；窄螢幕就直向堆疊，卡片上的軌道標籤說明是哪一廳。
   ========================================================================== */
var agState = { track: 'ALL' };

function renderAgendaPage() {
  var list = document.getElementById('agendaList');
  if (!list || typeof SESSIONS === 'undefined') return;

  /* 軌道篩選：TRACKS 加一軌就多一顆 */
  var trBox = document.getElementById('trackChips');
  if (trBox) {
    var th = '<li><button type="button" class="chip" data-track="ALL" aria-pressed="true">全部</button></li>';
    (typeof TRACKS === 'undefined' ? [] : TRACKS).forEach(function (t) {
      th += '<li><button type="button" class="chip chip-' + esc(t.id) + '" data-track="' + esc(t.id) +
            '" aria-pressed="false"><span class="tag-dot" aria-hidden="true"></span>' +
            esc(t.name) + '</button></li>';
    });
    trBox.innerHTML = th;
    trBox.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button[data-track]') : null;
      if (!b) return;
      agState.track = b.getAttribute('data-track');
      var all = trBox.querySelectorAll('button[data-track]');
      for (var i = 0; i < all.length; i++) all[i].setAttribute('aria-pressed', all[i] === b ? 'true' : 'false');
      paintAgenda();
    });
  }
  paintAgenda();
}

function paintAgenda() {
  var list = document.getElementById('agendaList');
  if (!list) return;
  var rows = SESSIONS.filter(function (s) {
    if (agState.track === 'ALL') return true;
    /* 報到／休息／午餐／Keynote／閉幕（track 填 'ALL'）在任何篩選條件下都留著 */
    return s.track === agState.track || s.track === 'ALL';
  });

  /* 把「start 與 end 都一樣」的相鄰列併成一個時段。
     用相鄰比對（不是丟進 map 收集）是刻意的：data.js 的順序就是畫面的順序，
     萬一有人把同一個時間寫在陣列的兩個地方，這裡會照原順序排成兩個時段，
     而不是默默把它們搬到一起，比較容易在畫面上看出資料寫錯了。 */
  var slots = [];
  rows.forEach(function (s) {
    var last = slots[slots.length - 1];
    if (last && last.start === s.start && last.end === s.end) last.items.push(s);
    else slots.push({ start: s.start, end: s.end, items: [s] });
  });

  var h = '';
  slots.forEach(function (slot) {
    /* 一個時段的長相看第一筆就夠了：跨全軌的列本來就只有一筆，
       同時段的三軌則一定都是 talk。--cols 是給 CSS 排橫向欄數用的。 */
    var head = slot.items[0];
    h += '<li class="ses is-' + esc(head.type) + '" style="--cols:' + slot.items.length + '">' +
           '<span class="ses-node" aria-hidden="true"></span>' +
           '<span class="ses-time">' + esc(slot.start) +
             (slot.end ? '<span class="to">– ' + esc(slot.end) + '</span>' : '') +
           '</span>' +
           '<div class="ses-cards">';
    slot.items.forEach(function (s) {
      /* 非議程的列（報到／休息／午餐／閉幕⋯）畫成一顆細長膠囊，不畫講者與標籤 */
      h += '<div class="ses-card">';
      if (!isTalkRow(s)) {
        h += '<span class="ses-label">' + esc(s.title || '') + '</span>';
      } else {
        h += '<h3>' + esc(s.title) + '</h3>' +
             '<p class="ses-who"><b>' + esc(s.speaker) + '</b>　' + esc(s.org) + '</p>' +
             tagsHtml(s);
      }
      h += '</div>';
    });
    h += '</div></li>';
  });
  if (!h) h = '<li class="tl-empty">這個條件下沒有議程</li>';
  list.innerHTML = h;

  /* 只有「全部」才會出現多軌並排，這時候時間軸放寬到跟頁面一樣寬，
     三張卡片才不會被擠成細長條；篩到單一軌時收回原本的閱讀寬度。 */
  list.classList.toggle('is-wide', agState.track === 'ALL');

  /* 篩選結果的統計文字：
     1) 這一行有中文（軌道名稱、「場」），所以整串都不掛 .display
        —— Alternity 沒有中文字符，中文會 fallback 成另一種字型，同一行變兩種字。
        （要掛也只能掛在「Track A」這種純英數的短字串上，這裡不值得為它多包一層。）
     2) 直接寫「N 場」，不要寫成「N / 全站總場次」——分子是篩選後的場次、
        分母是全部的，會變成「6 / 16」，維護的人會以為漏了一大半議程。 */
  var count = document.getElementById('filterCount');
  if (count) {
    var talks = rows.filter(isTalkRow).length;
    var label = (agState.track === 'ALL' ? '全部' : trackName(agState.track));
    count.textContent = label + '　' + talks + ' 場';
  }
}

/* ==========================================================================
   G. 講者頁
   --------------------------------------------------------------------------
   跟首頁那塊「講者陣容」的差別：
     首頁   只取前 8 位，只顯示姓名／職稱／單位（深青底、白字、圓形佔位）
     講者頁 列出 SPEAKERS 的全部，多顯示軌道標籤與 bio（白底卡片）
   兩邊讀的是同一份 data.js，所以加人只要改那個陣列。
   ========================================================================== */
/* 解析網址對應之服務名稱（如 LinkedIn、Facebook、X 等） */
function getServiceDisplayName(url) {
  if (!url) return '';
  var u = String(url).toLowerCase();
  if (u.indexOf('linkedin.com') !== -1) return 'LinkedIn';
  if (u.indexOf('facebook.com') !== -1 || u.indexOf('fb.me') !== -1 || u.indexOf('fb.com') !== -1) return 'Facebook';
  if (u.indexOf('x.com') !== -1 || u.indexOf('twitter.com') !== -1) return 'X';
  if (u.indexOf('github.com') !== -1) return 'GitHub';
  if (u.indexOf('instagram.com') !== -1) return 'Instagram';
  if (u.indexOf('threads.net') !== -1) return 'Threads';
  if (u.indexOf('youtube.com') !== -1 || u.indexOf('youtu.be') !== -1) return 'YouTube';
  if (u.indexOf('medium.com') !== -1) return 'Medium';
  return String(url).replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/\/.*$/, '');
}

/* 將文字中的 URL 自動轉為超連結（點擊彈出新視窗開啟） */
function linkifyText(text) {
  if (!text) return '';
  var re = /(https?:\/\/[a-zA-Z0-9\-._~:/?#[\]@!$&'*+,;=%]+)/g;
  var parts = [];
  var last = 0;
  var m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      parts.push(esc(text.slice(last, m.index)));
    }
    var rawUrl = m[0];
    var trailingPunct = '';
    var punctMatch = rawUrl.match(/[.,;:!?)]+$/);
    if (punctMatch) {
      trailingPunct = punctMatch[0];
      rawUrl = rawUrl.slice(0, -trailingPunct.length);
    }
    parts.push('<a class="spk-summary-link" href="' + esc(rawUrl) + '" target="_blank" rel="noopener noreferrer">' +
               esc(rawUrl) + '<span class="sr-only">（另開新視窗）</span></a>' + esc(trailingPunct));
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    parts.push(esc(text.slice(last)));
  }
  return parts.join('');
}

/* 格式化講者 bio：若內容僅為 URL 則轉成對應服務名稱之超連結，其餘內容則自動轉換其中的 URL */
function formatBioHtml(bio, truncateLength) {
  if (!bio) return '';
  var trimmed = String(bio).trim();
  var urlMatch = trimmed.match(/^(https?:\/\/[^\s]+)$/i) || trimmed.match(/^(www\.[^\s]+)$/i);
  if (urlMatch) {
    var url = urlMatch[1];
    if (/^www\./i.test(url)) url = 'https://' + url;
    var serviceName = getServiceDisplayName(url);
    return '<a class="spk-bio-link" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' +
           esc(serviceName) + '<span class="sr-only">（另開新視窗）</span></a>';
  }
  if (truncateLength) {
    return esc(truncateBio(trimmed, truncateLength));
  }
  return linkifyText(trimmed);
}

/* 講者的社群／個人頁連結圖示資訊解析 */
function getSocialIconInfo(url, customLabel) {
  if (!url) return null;
  var u = String(url).toLowerCase();
  var lbl = customLabel ? String(customLabel).toLowerCase().trim() : '';
  if (u.indexOf('facebook.com') !== -1 || u.indexOf('fb.me') !== -1 || u.indexOf('fb.com') !== -1 || lbl === 'facebook' || lbl === 'fb') {
    return {
      type: 'facebook',
      label: customLabel || 'Facebook',
      svg: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>'
    };
  }
  if (u.indexOf('x.com') !== -1 || u.indexOf('twitter.com') !== -1 || lbl === 'x' || lbl.indexOf('twitter') !== -1) {
    return {
      type: 'x',
      label: customLabel || 'X (Twitter)',
      svg: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'
    };
  }
  if (u.indexOf('linkedin.com') !== -1 || lbl === 'linkedin') {
    return {
      type: 'linkedin',
      label: customLabel || 'LinkedIn',
      svg: '<svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6z"/></svg>'
    };
  }
  if (u.indexOf('github.com') !== -1 || u.indexOf('github.io') !== -1 || lbl === 'github') {
    return {
      type: 'github',
      label: customLabel || 'GitHub',
      svg: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>'
    };
  }
  if (u.indexOf('instagram.com') !== -1 || lbl === 'instagram') {
    return {
      type: 'instagram',
      label: customLabel || 'Instagram',
      svg: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>'
    };
  }
  if (u.indexOf('threads.net') !== -1 || lbl === 'threads') {
    return {
      type: 'threads',
      label: customLabel || 'Threads',
      svg: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12.186 24C5.466 24 0 18.673 0 12.108 0 5.405 5.442 0 12.186 0c6.643 0 11.968 5.253 11.968 11.957 0 .61-.044 1.218-.13 1.815h-4.372c.046-.576.07-1.157.07-1.742 0-4.303-3.327-7.697-7.536-7.697-4.27 0-7.72 3.424-7.72 7.683 0 4.28 3.427 7.724 7.72 7.724 2.873 0 5.378-1.572 6.64-3.905l3.856 2.052C20.65 21.362 16.745 24 12.186 24z"/></svg>'
    };
  }
  return {
    type: 'website',
    label: customLabel || '個人網站',
    svg: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>'
  };
}

/* 講者的社群／個人頁連結（圖標化顯示） */
function speakerSocialsHtml(p) {
  if (!p) return '';
  var links = [];
  if (p.link) {
    if (typeof p.link === 'string' && p.link.indexOf(',') !== -1) {
      var urls = p.link.split(',').map(function (u) { return u.trim(); }).filter(Boolean);
      var labels = (typeof p.linkText === 'string')
        ? p.linkText.split(',').map(function (l) { return l.trim(); })
        : [];
      urls.forEach(function (url, idx) {
        links.push({ url: url, label: labels[idx] || '' });
      });
    } else {
      links.push({ url: String(p.link).trim(), label: p.linkText ? String(p.linkText).trim() : '' });
    }
  }
  if (Array.isArray(p.links)) {
    p.links.forEach(function (l) {
      if (typeof l === 'string') links.push({ url: l.trim() });
      else if (l && l.url) links.push({ url: l.url.trim(), label: (l.label || l.text || '').trim() });
    });
  }
  ['fb', 'facebook', 'x', 'twitter', 'github', 'linkedin', 'web', 'website', 'instagram', 'threads'].forEach(function (key) {
    if (p[key]) {
      var val = String(p[key]).trim();
      if (!links.some(function (l) { return l.url === val; })) {
        links.push({ url: val });
      }
    }
  });

  if (!links.length) return '';

  var h = '<div class="spk-modal-socials">';
  links.forEach(function (item) {
    var info = getSocialIconInfo(item.url, item.label);
    if (!info) return;
    h += '<a class="spk-social-btn spk-social-' + esc(info.type) + '" href="' + esc(item.url) +
         '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(info.label) +
         '" title="' + esc(info.label) + '">' +
         info.svg +
         '<span class="sr-only">（另開新視窗）</span></a>';
  });
  h += '</div>';
  return h;
}

function openSpeakerModal(id, pushUrl) {
  if (!id || typeof SPEAKERS === 'undefined') return false;
  var speaker = SPEAKERS.find(function (s) {
    return s.id === id || ('2026_' + s.name.replace(/\s+/g, '-')) === id;
  });
  if (!speaker) return false;

  var modal = document.getElementById('speakerModal');
  var body = document.getElementById('speakerModalBody');
  if (!modal || !body) return false;

  var idx = SPEAKERS.indexOf(speaker);
  var avatar = speaker.img
    ? '<img src="' + esc(speaker.img) + '" alt="' + esc(speaker.name) + '">'
    : phShape(idx >= 0 ? idx : 0, true);

  var profileTags = speaker.keynote ? '<span class="tag tag-key">Keynote</span>' : '';

  var contentHtml =
    '<div class="spk-modal-profile">' +
      '<div class="spk-modal-avatar ph ph-round">' + avatar + '</div>' +
      '<div class="spk-modal-meta">' +
        '<h3 id="spkModalName" class="spk-modal-name">' + esc(speaker.name) + '</h3>' +
        '<p class="spk-modal-role">' + esc(speaker.role) + '｜' + esc(speaker.org) + '</p>' +
        (profileTags ? '<div class="tag-row">' + profileTags + '</div>' : '') +
        speakerSocialsHtml(speaker) +
      '</div>' +
    '</div>' +
    '<hr class="spk-modal-divider">' +
    '<div class="spk-modal-section">' +
      '<h4 class="spk-modal-section-title">介紹</h4>' +
      '<div class="spk-modal-bio">' + (speaker.bio ? formatBioHtml(speaker.bio, 0) : '尚無講者簡介') + '</div>' +
    '</div>';

  var row1Badges = '';
  if (speaker.track) row1Badges += trackTagHtml(speaker.track);
  if (speaker.level) row1Badges += levelTagHtml(speaker.level);
  var row1Html = row1Badges ? '<div class="tag-row spk-modal-tags">' + row1Badges + '</div>' : '';

  var row2Badges = '';
  if (speaker.class) {
    speaker.class.split(',').forEach(function (c) {
      var t = c.trim();
      if (t) row2Badges += classTagHtml(t);
    });
  }
  var row2Html = row2Badges ? '<div class="tag-row spk-modal-tags">' + row2Badges + '</div>' : '';

  if (speaker.agenda) {
    contentHtml +=
      '<hr class="spk-modal-divider">' +
      '<div class="spk-modal-section">' +
        '<h4 class="spk-modal-section-title">議程主題</h4>' +
        '<h5 class="spk-modal-agenda-title">' + esc(speaker.agenda) + '</h5>' +
        row1Html +
        row2Html +
      '</div>';
  } else if (row1Html || row2Html) {
    contentHtml +=
      '<hr class="spk-modal-divider">' +
      '<div class="spk-modal-section">' +
        row1Html +
        row2Html +
      '</div>';
  }
  if (speaker.summary) {
    contentHtml +=
      '<br><div class="spk-modal-section">' +
        '<h4 class="spk-modal-section-title">議程摘要</h4>' +
        '<div class="spk-modal-bio">' + linkifyText(speaker.summary) + '</div>' +
      '</div>';
  }

  body.innerHTML = contentHtml;
  modal.hidden = false;
  document.body.classList.add('modal-open');

  var closeBtn = document.getElementById('speakerModalClose');
  if (closeBtn) closeBtn.focus();

  if (pushUrl) {
    var url = new URL(window.location.href);
    url.searchParams.set('id', speaker.id);
    window.history.pushState({ speakerId: speaker.id }, '', url.toString());
  }

  return true;
}

function closeSpeakerModal(pushUrl) {
  var modal = document.getElementById('speakerModal');
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  document.body.classList.remove('modal-open');

  if (pushUrl) {
    var url = new URL(window.location.href);
    if (url.searchParams.has('id')) {
      url.searchParams.delete('id');
      window.history.pushState(null, '', url.pathname + (url.search ? url.search : ''));
    }
  }
}

var speakerModalBound = false;
function bindSpeakerModalEvents() {
  if (speakerModalBound) return;
  speakerModalBound = true;

  var closeBtn = document.getElementById('speakerModalClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      closeSpeakerModal(true);
    });
  }
  var backdrop = document.getElementById('speakerModalBackdrop');
  if (backdrop) {
    backdrop.addEventListener('click', function () {
      closeSpeakerModal(true);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var modal = document.getElementById('speakerModal');
      if (modal && !modal.hidden) {
        closeSpeakerModal(true);
      }
    }
  });
  window.addEventListener('popstate', function () {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');
    if (id) {
      openSpeakerModal(id, false);
    } else {
      closeSpeakerModal(false);
    }
  });
}

function renderSpeakerPage() {
  var box = document.getElementById('speakerList');
  if (!box || typeof SPEAKERS === 'undefined') return;
  var h = '';
  SPEAKERS.forEach(function (p, i) {
    /* 講者頁卡片上不顯示 track、level 與 class，僅在個別講者彈出視窗（speakers.html?id=...）顯示 */
    var tags = p.keynote ? '<div class="tag-row"><span class="tag tag-key">Keynote</span></div>' : '';
    var avatar = p.img ? '<img loading="lazy" decoding="async" src="' + esc(p.img) + '" alt="' + esc(p.name) + '">' : phShape(i, true);
    h += '<li class="card spk-card" data-speaker-id="' + esc(p.id) + '" tabindex="0" role="button" aria-haspopup="dialog">' +
           '<div class="ph ph-round avatar">' + avatar + '</div>' +
           '<div class="spk-body">' +
             '<div class="spk-head">' +
               '<h3>' + esc(p.name) + '</h3>' +
               (p.role ? '<span class="spk-role">' + esc(p.role) + '</span>' : '') +
             '</div>' +
             (p.org ? '<p class="spk-org">' + esc(p.org) + '</p>' : '') +
             tags +
             (p.bio ? '<p class="spk-bio">' + formatBioHtml(p.bio, 120) + '</p>' : '') +
           '</div>' +
           '<span class="spk-card-more" aria-hidden="true">more &rarr;</span>' +
         '</li>';
  });
  box.innerHTML = h;

  /* 「共 N 位講者」；跟議程頁的篩選統計一樣，不寫成分數，維護的人才不會誤會 */
  var count = document.getElementById('speakerCount');
  if (count) count.textContent = '共 ' + SPEAKERS.length + ' 位講者';

  /* 綁定彈出視窗相關事件 */
  bindSpeakerModalEvents();

  /* 點擊講者卡片開啟彈窗（點擊卡片內的對外連結則不觸發） */
  box.onclick = function (e) {
    if (e.target.closest('a')) return;
    var card = e.target.closest('.spk-card');
    if (!card) return;
    var id = card.getAttribute('data-speaker-id');
    if (id) openSpeakerModal(id, true);
  };
  box.onkeydown = function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      if (e.target.closest('a')) return;
      var card = e.target.closest('.spk-card');
      if (!card) return;
      e.preventDefault();
      var id = card.getAttribute('data-speaker-id');
      if (id) openSpeakerModal(id, true);
    }
  };

  /* 初始載入時若網址帶有 ?id=$speaker_id 則直接開啟該講者視窗 */
  var initialId = new URLSearchParams(window.location.search).get('id');
  if (initialId) {
    openSpeakerModal(initialId, false);
  }
}

/* ==========================================================================
   H. 贊助頁
   ========================================================================== */
function renderSponsors() {
  var box = document.getElementById('sponsorTiers');
  if (!box || typeof SPONSORS === 'undefined' || typeof SPONSOR_TIERS === 'undefined') return;
  var h = '', n = 0;
  SPONSOR_TIERS.forEach(function (tier) {
    var list = SPONSORS.filter(function (s) { return s.tier === tier.id; });
    if (!list.length) return;
    h += '<section class="tier">' +
           '<div class="tier-head">' +
             '<span class="shape ' + PH_SHAPES[n % 3] + '" aria-hidden="true"></span>' +
             '<h2>' + esc(tier.name) + '</h2>' +
           '</div>' +
           '<div class="tier-grid t-' + esc(tier.size) + '">';
    list.forEach(function (s) {
      h += '<article class="card sp-card">' +
             '<div class="ph">' + (s.logo ? '<img src="' + esc(s.logo) + '" alt="' + esc(s.name) + '">'
               : phShape(n, false)) + '</div>' +
             '<div><h3>' + esc(s.name) + '</h3>' +
             (s.desc ? '<p>' + esc(s.desc) + '</p>' : '') + '</div>' +
           '</article>';
      n++;
    });
    h += '</div></section>';
  });
  box.innerHTML = h;
}

/* ==========================================================================
   J. 議程清單頁（sessions.html）
   ========================================================================== */
var sessionPageState = {
  currentTrack: 'Software Defined Reality'
};

var TRACK_DESCRIPTIONS = {
  'Software Defined Reality': '聚焦軟體如何跨越虛擬邊界，成為驅動實體設備的核心大腦。從無人機的飛控演算法、各類載具濾波調校，到機器人邊緣運算與電腦視覺的即時反應，深入探討「軟體定義載具」（SDV）的底層技術與韌體架構。我們將解析程式碼如何突破物理極限，賦予硬體設備持續進化的靈魂。',
  'Next-Gen Intelligence': '探索人工智慧技術的最前線與發展藍圖。本軌將深入解析 AI 發展與演進、LLM 語言模型現況與 Agentic AI 的自主決策機制，以及從文字生成邁向多模態理解的技術突破。幫助掌握 AI 演算法的底層邏輯與運算效能最佳化趨勢，一窺顛覆未來科技發展的關鍵核心技術。',
  'AI in Action': '讓技術紅利真正落地！本軌專注於 AI 與現代軟體工程在商業場景的實戰經驗。從高併發的 SaaS 架構設計、雲端系統部署，到自動化工作流（Workflows）的無縫導入。講者將分享嚴謹的迭代開發流程與架構規劃，展示如何將 AI 概念轉化為解決真實業務痛點的強大生產力。'
};

function truncateSummary(text, maxChars) {
  if (!text) return { text: '', isLong: false };
  var limit = maxChars || 100;
  var chars = Array.from(text);
  if (chars.length > limit) {
    return { text: chars.slice(0, limit).join(''), isLong: true };
  }
  return { text: text, isLong: false };
}

function renderSessionsPage() {
  var list = document.getElementById('sessionList');
  var tabsBox = document.getElementById('sessionTrackTabs');
  if (!list || !tabsBox || typeof SPEAKERS === 'undefined') return;

  var DEFAULT_TRACK = 'Software Defined Reality';

  /* 收集所有出現過的軌道 */
  var allTracks = [];
  SPEAKERS.forEach(function (s) {
    if (s.track && allTracks.indexOf(s.track) === -1) {
      allTracks.push(s.track);
    }
  });

  /* 確保預設的 Software Defined Reality 排在第一個 */
  if (allTracks.indexOf(DEFAULT_TRACK) !== -1) {
    allTracks = [DEFAULT_TRACK].concat(allTracks.filter(function (t) { return t !== DEFAULT_TRACK; }));
  }

  /* 檢查網址參數是否有指定 track，否則使用預設 track */
  var urlTrack = new URLSearchParams(window.location.search).get('track');
  if (urlTrack && allTracks.indexOf(urlTrack) !== -1) {
    sessionPageState.currentTrack = urlTrack;
  } else {
    sessionPageState.currentTrack = DEFAULT_TRACK;
  }

  function getTrackChipClass(track) {
    var t = String(track).toLowerCase().trim();
    if (t.indexOf('software defined reality') !== -1 || t === 'sdr') return 'chip-sdr';
    if (t.indexOf('next-gen intelligence') !== -1 || t.indexOf('next-gen') !== -1) return 'chip-nextgen';
    if (t.indexOf('ai in action') !== -1) return 'chip-ai-action';
    return '';
  }

  /* 渲染軌道 Tabs */
  function renderTabs() {
    var th = '';
    allTracks.forEach(function (tr, idx) {
      var isSelected = (tr === sessionPageState.currentTrack);
      var chipCls = getTrackChipClass(tr);
      th += '<li>' +
              '<button type="button" role="tab" class="chip ' + chipCls + '" data-track="' + esc(tr) + '"' +
                ' id="tab-' + idx + '"' +
                ' aria-selected="' + (isSelected ? 'true' : 'false') + '"' +
                ' tabindex="' + (isSelected ? '0' : '-1') + '">' +
                '<span class="tag-dot" aria-hidden="true"></span>' +
                esc(tr) +
              '</button>' +
            '</li>';
    });
    tabsBox.innerHTML = th;
  }

  /* 渲染目前軌道的議程清單 */
  function paintSessions() {
    var curTrack = sessionPageState.currentTrack;
    var filtered = SPEAKERS.filter(function (s) {
      return s.track === curTrack;
    });

    /* 更新標題與統計 */
    var headingEl = document.getElementById('sessionBandTitle');
    if (headingEl) headingEl.textContent = curTrack;

    /* 更新軌道專屬說明文字（對應 index.html 三大軌道說明） */
    var descEl = document.getElementById('sessionTrackDesc');
    if (descEl) {
      descEl.textContent = TRACK_DESCRIPTIONS[curTrack] || '聚焦軟體與前沿科技的創新實踐與深入探討。';
    }

    var countEl = document.getElementById('sessionFilterCount');
    if (countEl) countEl.textContent = '共 ' + filtered.length + ' 場議程';

    if (!filtered.length) {
      list.innerHTML = '<li class="card"><p class="tl-empty">該軌道尚無議程資料。</p></li>';
      return;
    }

    var html = '';
    filtered.forEach(function (s) {
      /* 標籤列：難易度、類別 */
      var badges = '';
      if (s.level) badges += levelTagHtml(s.level);
      if (s.class) {
        s.class.split(',').forEach(function (c) {
          var t = c.trim();
          if (t) badges += classTagHtml(t);
        });
      }
      var tagsRow = badges ? '<div class="tag-row session-tags">' + badges + '</div>' : '';

      /* 講者連結：僅列出 name 與 org，點擊時連至 speakers.html 對應講者頁面 */
      var speakerLink = 'speakers.html?id=' + encodeURIComponent(s.id);
      var speakerInfo =
        '<div class="session-speaker-row">' +
          '<span class="session-speaker-label">講者</span>' +
          '<a class="session-speaker-link" href="' + esc(speakerLink) + '" title="檢視講者 ' + esc(s.name) + ' 完整簡介">' +
            '<span class="session-speaker-name">' + esc(s.name) + '</span>' +
            (s.org ? '<span class="session-speaker-org">（' + esc(s.org) + '）</span>' : '') +
            '<span class="session-speaker-arrow" aria-hidden="true">&rarr;</span>' +
          '</a>' +
        '</div>';

      /* 議程摘要：顯示原始資料前 100 個 multi-bytes 字元，超過接上 .. 與 more icon */
      var summaryHtml = '';
      if (s.summary) {
        var truncInfo = truncateSummary(s.summary, 100);
        if (truncInfo.isLong) {
          summaryHtml =
            '<div class="session-summary-box" data-session-id="' + esc(s.id) + '">' +
              '<h4 class="session-summary-heading">議程摘要</h4>' +
              '<div class="session-summary-content session-summary-short">' +
                linkifyText(truncInfo.text) + '<span class="session-summary-dots">..</span>' +
                '<button type="button" class="session-more-btn" aria-expanded="false" title="展開完整摘要">' +
                  '<span class="session-more-text">more</span>' +
                  '<svg class="session-more-icon" viewBox="0 0 20 20" width="14" height="14" fill="currentColor" aria-hidden="true">' +
                    '<path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>' +
                  '</svg>' +
                '</button>' +
              '</div>' +
              '<div class="session-summary-content session-summary-full">' +
                linkifyText(s.summary) +
                '<div class="session-less-wrap">' +
                  '<button type="button" class="session-less-btn" aria-expanded="true" title="收合摘要">' +
                    '<span class="session-more-text">less</span>' +
                    '<svg class="session-more-icon" viewBox="0 0 20 20" width="14" height="14" fill="currentColor" aria-hidden="true">' +
                      '<path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832l-3.71 3.938a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd"/>' +
                    '</svg>' +
                  '</button>' +
                '</div>' +
              '</div>' +
            '</div>';
        } else {
          summaryHtml =
            '<div class="session-summary-box">' +
              '<h4 class="session-summary-heading">議程摘要</h4>' +
              '<div class="session-summary-content session-summary-short">' + linkifyText(truncInfo.text) + '</div>' +
            '</div>';
        }
      }

      html +=
        '<li class="session-card">' +
          '<div class="session-card-header">' +
            tagsRow +
            '<h3 class="session-agenda-title">' + esc(s.agenda || '議程主題陸續公布中') + '</h3>' +
            speakerInfo +
          '</div>' +
          (summaryHtml ? '<hr class="session-divider">' + summaryHtml : '') +
        '</li>';
    });

    list.innerHTML = html;
  }

  /* 摘要展開／收合事件（全頁一次僅展開一個議程） */
  list.addEventListener('click', function (e) {
    var moreBtn = e.target.closest('.session-more-btn');
    if (moreBtn) {
      var targetBox = moreBtn.closest('.session-summary-box');
      if (!targetBox) return;

      /* 收合全頁面上其他已展開的議程摘要 */
      var allExpanded = list.querySelectorAll('.session-summary-box.is-expanded');
      for (var i = 0; i < allExpanded.length; i++) {
        if (allExpanded[i] !== targetBox) {
          allExpanded[i].classList.remove('is-expanded');
          var prevMore = allExpanded[i].querySelector('.session-more-btn');
          if (prevMore) prevMore.setAttribute('aria-expanded', 'false');
        }
      }

      /* 展開目標議程 */
      targetBox.classList.add('is-expanded');
      moreBtn.setAttribute('aria-expanded', 'true');
      return;
    }

    var lessBtn = e.target.closest('.session-less-btn');
    if (lessBtn) {
      var box = lessBtn.closest('.session-summary-box');
      if (!box) return;
      box.classList.remove('is-expanded');
      var moreInBox = box.querySelector('.session-more-btn');
      if (moreInBox) {
        moreInBox.setAttribute('aria-expanded', 'false');
        moreInBox.focus();
      }
      return;
    }
  });

  /* 點擊切換 Tab 事件 */
  tabsBox.addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-track]');
    if (!btn) return;
    var track = btn.getAttribute('data-track');
    if (!track || track === sessionPageState.currentTrack) return;
    sessionPageState.currentTrack = track;

    var allBtns = tabsBox.querySelectorAll('button[data-track]');
    for (var i = 0; i < allBtns.length; i++) {
      var isCur = (allBtns[i] === btn);
      allBtns[i].setAttribute('aria-selected', isCur ? 'true' : 'false');
      allBtns[i].setAttribute('tabindex', isCur ? '0' : '-1');
    }

    try {
      var newUrl = new URL(window.location);
      newUrl.searchParams.set('track', track);
      window.history.replaceState(null, '', newUrl.toString());
    } catch (_) {}

    paintSessions();
  });

  /* 鍵盤無障礙導覽：左右箭頭切換 Tab */
  tabsBox.addEventListener('keydown', function (e) {
    var buttons = Array.from(tabsBox.querySelectorAll('button[data-track]'));
    var currentIndex = buttons.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    var nextIndex = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % buttons.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = buttons.length - 1;
    }

    if (nextIndex !== -1) {
      e.preventDefault();
      buttons[nextIndex].focus();
      buttons[nextIndex].click();
    }
  });

  renderTabs();
  paintSessions();
}

/* ==========================================================================
   I. 啟動
   ========================================================================== */
function boot() {
  buildDesktopNav();
  buildDrawer();
  bindNavEvents();
  bindHeaderShadow();

  /* 到這一行導航列才算「真的生出來了」，這時候才把 <html> 加上 js-ready：
     CSS 會據此把 header 裡那份靜態降級連結收起來、換成完整選單＋漢堡。
     ▲ 順序很重要：這行一定要在 fitNav() 之前（.nav 還是 display:none 就量不到寬度），
       也一定要在 buildDesktopNav() 之後——萬一 NAV 陣列被改壞了，
       這行不會被執行，畫面上就會留著三個降級連結，而不是整條導航列消失。 */
  document.documentElement.classList.add('js-ready');
  fitNav();

  fillCounts();
  renderAgendaPreview();
  renderSpeakers();
  renderSpeakerPage();
  renderSponsorWall();
  renderAgendaPage();
  renderSponsors();
  renderSessionsPage();

  var rt = false;
  window.addEventListener('resize', function () {
    if (rt) return;
    rt = true;
    window.requestAnimationFrame(function () {
      rt = false;
      fitNav();
      if (window.innerWidth >= 768) closeDrawer();
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
