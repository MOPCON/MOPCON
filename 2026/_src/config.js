/* ==========================================================================
   MOPCON 2026 — 網站設定檔
   --------------------------------------------------------------------------
   這是整個網站「唯一要改的設定檔」，分兩區：
     SITE   全站共用的值（年份、日期、場地…），在任何 HTML 裡寫 {{key}} 就會被代進去
     PAGES  有哪些頁、每頁的 title / description（SEO 就是看這一份）
   改完存檔，跑 `node tools/build.mjs` 就會重新產生 2026/*.html。
   ========================================================================== */

/* ── 全站共用 ─────────────────────────────────────────────────────────────
   這裡的每一個 key，在 layout / parts / pages 的 HTML 裡都可以寫成 {{key}}。
   例如 venue 改一次，首頁的 hero、會場資訊、地圖佔位、兩頁的 description
   總共 5 個地方會一起換掉。 */
export const SITE = {
  year:    '2026',
  tagline: '南台灣最大行動科技年會',
  email:   'contact@mopcon.org',

  /* TODO: 日期為預訂（2026.10.31），場地未定案，確認後改下面這五行就好。
           全站所有出現日期／場地的地方都是從這裡代進去的，不用再逐頁找。
           ⚠ 改完之後，社群分享圖 assets/img/og.png 也要重新產生一次
             （圖上印著日期與場地，指令見 README「社群分享圖」那一節）。
           date / venue  給人看的字串
           dateISO       給搜尋引擎看的（JSON-LD 用，格式固定 YYYY-MM-DD）
           venueCity     JSON-LD 的城市欄位 */
  date:      '2026.10.31（六）',
  dateISO:   '2026-10-31',
  venue:     '高雄科技大學楠梓校區活動中心',
  venueCity: '高雄市',

  /* 網址設定：canonical、og:url、sitemap 都是從這兩個組出來的。
     origin 不要加結尾斜線，base 前後都要有斜線。 */
  origin: 'https://mopcon.org',
  base:   '/2026/',

  /* 社群分享圖（FB／LINE／Slack 的預覽圖）。
     目前這張是用品牌素材組的暫用版，原始檔在 _src/og.svg，
     設計組做好正式版直接覆蓋 assets/img/og.png 即可（要 1200×630）。 */
  ogImage: 'assets/img/og.png'
};

/* ── 頁面清單 ─────────────────────────────────────────────────────────────
   file    產出的檔名（會寫到 2026/ 底下）
   title   <title>，也是搜尋結果與社群分享的標題
   desc    <meta name="description">，也是搜尋結果與社群分享的說明文字
   h1/lead 只有「用 parts/page-hero.html 當頁首」的頁才需要填（首頁自己有大 hero）
   head    這一頁要額外塞進 </head> 前面的東西，填 _src/ 底下的檔名（可省略）

   要新增一頁：
     1) 在 _src/pages/ 放一個 .html，裡面只寫 <main> 裡面的內容
     2) 在這個陣列加一筆
   要讓某一頁完全自己來（不套 layout）：那一筆加上 layout: null，
   build 就會把 _src/pages/ 那份原封不動複製出去，連 {{…}} 都不會碰。

   canonical、og:url、sitemap.xml 都是 build 自己依 file 算出來的，不用填。 */
export const PAGES = [
  {
    file:  'index.html',
    title: `MOPCON ${SITE.year}｜${SITE.tagline}`,
    desc:  `MOPCON ${SITE.year} — ${SITE.tagline}。${SITE.date}，${SITE.venue}。`,
    /* 大會的結構化資料只放首頁一份，放多份 Google 會當成多個活動 */
    head:  'parts/jsonld-event.html'
  },
  {
    file:  'agenda.html',
    title: `大會議程｜MOPCON ${SITE.year}`,
    desc:  `MOPCON ${SITE.year} 大會議程：單日三軌並行，涵蓋 Software Defined Reality、Next-Gen Intelligence 與 AI in Action 三大主軸。${SITE.date}。`,
    h1:    '大會議程',
    lead:  '單日三軌並行，橫跨今年的三大主軸。可以用下方的軌道篩選，只看某一軌的場次。'
  },
  {
    file:  'speakers.html',
    title: `講者陣容｜MOPCON ${SITE.year}`,
    desc:  `MOPCON ${SITE.year} 講者陣容：來自業界第一線的軟體工程、AI 與載具技術實踐者。名單陸續公布中。`,
    h1:    '講者陣容',
    lead:  '來自業界第一線的實踐者，橫跨軟體定義載具、AI 技術前沿與工程落地實戰。'
  },
  {
    file:  'sponsor.html',
    title: `贊助夥伴｜MOPCON ${SITE.year}`,
    desc:  `MOPCON ${SITE.year} 贊助夥伴：鑽石級／黃金級／白銀級／銅級／友情贊助，以及成為贊助夥伴的聯絡方式 ${SITE.email}。`,
    h1:    '贊助夥伴',
    lead:  'MOPCON 由社群志工籌辦，能在濁水溪以南一路辦到今天，靠的是每一位贊助夥伴的支持。'
  }
];
