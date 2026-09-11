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
  // { text: '主辦單位',    href: '#' },
  // { text: '議程介紹',    href: 'agenda.html' },
  // { text: '講者陣容',    href: 'speakers.html' },
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
function tagsHtml(s) {
  var h = '<div class="tag-row">';
  if (s.type === 'keynote') h += '<span class="tag tag-key">Keynote</span>';
  if (s.track && s.track !== 'ALL') {
    h += '<span class="tag tag-' + esc(s.track) + '"><span class="tag-dot" aria-hidden="true"></span>' +
         esc(trackName(s.track)) + '</span>';
  }
  if (s.level) h += '<span class="tag tag-level">' + esc(s.level) + '</span>';
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
/* 講者的社群／個人頁連結：data.js 有填 link 才會出現。
   顯示文字優先用 linkText，沒填就拿網址的網域來顯示（去掉 www.）。
   一律另開新分頁，rel 加 noopener 避免對方頁面拿到 window.opener。 */
function speakerLinkHtml(p) {
  if (!p.link) return '';
  var text = p.linkText;
  if (!text) {
    text = String(p.link).replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '');
  }
  return '<a class="spk-link" href="' + esc(p.link) + '" target="_blank" rel="noopener">' +
           esc(text) + '<span class="sr-only">（另開新視窗）</span></a>';
}

function renderSpeakerPage() {
  var box = document.getElementById('speakerList');
  if (!box || typeof SPEAKERS === 'undefined') return;
  var h = '';
  SPEAKERS.forEach(function (p, i) {
    /* 標籤沿用議程那一套（tagsHtml 吃的是議程列的欄位名，這裡湊一個一樣形狀的物件給它，
       這樣講者頁的軌道色點跟議程頁永遠是同一個顏色，不會有兩套規則） */
    var tags = (p.track || p.keynote)
      ? tagsHtml({ type: p.keynote ? 'keynote' : 'talk', track: p.track })
      : '';
    let avatar = p.img ? '<img loading="lazy" decoding="async" src="' + esc(p.img) + '" alt="' + esc(p.name) + '">' : phShape(i, true);
    h += '<li class="card spk-card">' +
           '<div class="ph ph-round avatar">' + avatar + '</div>' +
           '<div class="spk-body">' +
             '<h3>' + esc(p.name) + '</h3>' +
             '<p class="spk-role">' + esc(p.role) + '｜' + esc(p.org) + '</p>' +
             tags +
             (p.bio ? '<p class="spk-bio">' + esc(p.bio) + '</p>' : '') +
             speakerLinkHtml(p) +
           '</div>' +
         '</li>';
  });
  box.innerHTML = h;

  /* 「共 N 位講者」；跟議程頁的篩選統計一樣，不寫成分數，維護的人才不會誤會 */
  var count = document.getElementById('speakerCount');
  if (count) count.textContent = '共 ' + SPEAKERS.length + ' 位講者';
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
