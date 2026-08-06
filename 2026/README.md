# MOPCON 2026 網站

純靜態網站，部署在 GitHub Pages。沒有框架、沒有 npm、沒有 `node_modules`。

---

## 先看這裡：看不懂下面任何東西的話

**直接改 `2026/` 底下那幾個 `.html` 就好，網站不會壞。**

它們是完整的、可以直接用瀏覽器打開的 HTML。改完 push 上去就會生效。

唯一要記得的是：它們是由 `_src/` 產生的，所以下次有人跑產生指令時你的修改會被蓋掉。
所以改完之後，順手把 `_src/pages/` 底下的同名檔案也改一樣。

真的覺得這套產生機制礙事，也可以直接廢掉它，只要五分鐘：

1. 跑一次 `node 2026/tools/build.mjs`
2. 把 `.gitignore` 裡 `/2026/*.html` 與 `/2026/sitemap.xml` 兩行刪掉，再 `git add 2026/`
3. 刪掉 `2026/_src/`、`2026/tools/`，以及 `.github/workflows/deploy-pages.yml` 裡的 `Build 2026` 那一步

之後就跟 2012～2025 那些年份一樣，是一堆單純的靜態檔。**這是刻意留的退路，不是壞事。**

---

## 這個 repo 的全貌

repo 根目錄就是 `mopcon.org` 的網站根目錄（`CNAME` 指定），一個年份一個資料夾：

```
MOPCON/                        ← 這裡就是 https://mopcon.org/
├── index.html                     轉址到「當年度」的那一年
├── CNAME / robots.txt / sitemap.xml / 404.html
├── .github/workflows/deploy-pages.yml   push 到 develop 就部署
├── tools/verify-ghpage.sh              部署後的煙霧測試
├── 2012/ … 2025/                  歷年網站，已凍結成純靜態檔，不要動
├── 2026/                          ← 今年，這份 README 講的就是它
└── *.php/ 等舊路徑                 早年 PHP 入口，現在是 meta-refresh 轉址頁
```

要點：

- **2026 是唯一有「產生步驟」的年份。** 其他年份都是現成的靜態檔，產生器不會碰到它們。
- 部署方式是 GitHub Actions 把**整個 repo** 當成靜態檔上傳（不是 Jekyll），
  所以任何路徑放什麼檔案，網站上就長什麼樣。
- 跨年份連結一律寫**絕對網址**（`https://mopcon.org/2025/`）。
  不要寫相對路徑——正式站是 `mopcon.org/2026/`，但也可能被部署在
  `<user>.github.io/MOPCON/2026/`，兩者的相對層級不一樣，相對路徑會有一邊壞掉。

---

## 為什麼 2026 有 `_src/`

導覽列、頁尾、手機選單、整個 `<head>` 這些東西每一頁都一樣，共約 130 行。
頁數一多，改一個頁尾連結就要開好幾個檔案改好幾次，遲早會有一頁漏改。

`_src/` 就是把這些「每頁都一樣的部分」抽出來放一份，加上一份設定檔管 SEO。
樣板語法只有兩種，沒有第三種。

---

## 資料夾長怎樣

```
2026/
├── _src/                    ← 原始檔，套版相關的東西都在這裡
│   ├── config.js                設定檔：全站共用值 ＋ 頁面清單（SEO 看這一份）
│   ├── layout.html              整頁骨架（<head>、<body> 外框），只有這一份
│   ├── parts/                   跨頁共用的區塊
│   │   ├── header.html              導覽列外框
│   │   ├── drawer.html              手機漢堡選單外框
│   │   ├── footer.html              頁尾
│   │   ├── page-hero.html           內頁的小標題區（首頁以外的頁共用）
│   │   └── jsonld-event.html        給搜尋引擎看的大會資料（只有首頁掛）
│   ├── pages/                   每一頁自己的內容（只寫 <main> 裡面的部分）
│   │   ├── index.html
│   │   ├── agenda.html
│   │   ├── speakers.html
│   │   └── sponsor.html
│   └── og.svg                   社群分享圖的原始檔
│
├── tools/build.mjs          ← 產生器（純 Node 內建功能，無相依套件）
│
├── assets/                  ← 這些不經過產生器，是什麼就是什麼
│   ├── css/style.css            全站樣式
│   ├── js/data.js               議程／講者／贊助的資料
│   ├── js/site.js               導覽列、篩選、各種卡片渲染
│   └── img/                     logo、紋理、favicon、og.png
│
└── *.html / sitemap.xml     ← 產生出來的成品（開發期間不進版控）
```

**`_src/` 管版型，`assets/` 管內容與行為，兩者互不相干。**
改顏色改 `style.css`、改議程資料改 `data.js`、改導覽列項目改 `site.js` 的 `NAV` 陣列，
這三件事都不用碰 `_src/`，也不需要重新產生（重新整理瀏覽器就好）。

---

## 本地預覽

### 方法一：開預覽伺服器（推薦）

```bash
node 2026/tools/build.mjs --serve
```

打開 <http://localhost:8080/2026/>。改 `_src/` 底下任何檔案存檔後，
會自動重新產生並且自動重整瀏覽器，不用手動 F5。

換 port：`node 2026/tools/build.mjs --serve --port=3000`

伺服器開在 repo 根目錄，所以路徑跟正式站完全一致，跨年份的頁面也連得過去。

> 改 `assets/` 底下的檔案不會觸發重新產生（也不需要），直接重新整理瀏覽器即可。

### 方法二：不開伺服器

```bash
node 2026/tools/build.mjs
```

然後直接用瀏覽器打開 `2026/index.html`。用 `file://` 開也能正常運作
（`site.js` 判斷「目前在哪一頁」時有特別處理過）。改完再跑一次就好。

### 方法三：完全不裝 Node

直接改 `2026/*.html`，用瀏覽器打開看。細節見最上面那段。

> Windows／macOS／Linux 指令完全一樣。Node 只要是近幾年的版本都可以，
> 不需要 `npm install`，這個 repo 裡沒有 `package.json`。

---

## 樣板語法

只有兩種。

### `<!--#include 檔名 -->`

把 `_src/` 底下的另一個檔案原封不動貼進來。

```html
<!--#include parts/header.html -->
```

- 路徑相對於 `_src/`
- **指令請寫在行首**，被貼進來的檔案自己帶縮排

### `{{名字}}`

代入設定值。可以用的名字有三類：

| 來源 | 名字 |
|---|---|
| `config.js` 的 `SITE` | `year`、`tagline`、`email`、`date`、`dateISO`、`venue`、`venueCity`、`origin`、`base` |
| `config.js` 的 `PAGES`（該頁自己的） | `title`、`desc`、`h1`、`lead`，以及你自己加的任何欄位 |
| build 自動算出來的 | `url`（這一頁的正式網址）、`ogImage`（分享圖的絕對網址） |

另外 `layout.html` 有兩個「坑」由 build 填：`{{content}}`（該頁 `<main>` 的內容）
與 `{{head}}`（該頁額外的 `<head>` 內容）。

打錯字的話產生器會直接報錯並停下來，不會讓 `{{tilte}}` 這種東西上線。

> ⚠ `{{名字}}` 是原封不動貼進去，不會做 HTML 逸出。
> 所以 `config.js` 的 `title`／`desc` 裡**不要用半形雙引號 `"`**（中文引號沒問題）。

---

## 三支 assets 檔在做什麼

### `assets/js/data.js` — 所有內容資料

五個陣列，全部是「改陣列就好，不用改 HTML／CSS」：

| 陣列 | 欄位 |
|---|---|
| `TRACKS` | `id`（A／B／C）、`name`（顯示用的場地名，例如 `R1（1F）`） |
| `SESSIONS` | `start`、`end`、`type`、`track`、`title`、`speaker`、`org`、`level` |
| `SPEAKERS` | `name`、`role`、`org`、`track`（可省略）、`keynote`（可省略）、`bio`（可省略） |
| `SPONSOR_TIERS` | `id`、`name`、`size`（`xl`→`xs`，決定卡片大小） |
| `SPONSORS` | `tier`、`name`、`desc`、`logo`（可省略） |

`SESSIONS.type` 決定那一列長什麼樣：`talk`（一般議程）、`keynote`（專題演講），
其餘一律畫成跨全軌的細長膠囊——目前用到 `reg`／`opening`／`break`／`tea`／`lunch`／`closing`／`end`。
膠囊那一組的 CSS 是用「不是 `talk` 也不是 `keynote`」認的，所以**要多一種列型直接寫新的 `type` 就好，不用改 `style.css`**。
跨全軌的列 `track` 要填 `'ALL'`，這種列在任何篩選條件下都會顯示。
`end` 沒有結束時間，`end` 欄位填空字串，畫面上就只印開始時間。

**同一時段的三軌，`start` 與 `end` 要填一模一樣的字串。**
`site.js` 是靠這兩個字串把相鄰的列併成同一個時段的：併起來之後時間只印一次，
桌機（≥1024px）會把那個時段的各軌卡片橫向並排，同一個時間就對齊在同一條水平線上；
窄螢幕則直向堆疊，靠卡片上的軌道標籤區分是哪一廳。
差一個字（`9:10` vs `09:10`）就會被拆成上下兩個時段。

**Unconf 不在 `SESSIONS` 裡。** 它不是正式議程（場外自由交流，在各休息與 Tea Time 時段進行），
議程頁時間軸下面用一行寫死的 `.tl-note` 說明，要改就改 `_src/pages/agenda.html` 那一行。

**今年是單日三軌，所以 `SESSIONS` 沒有「第幾天」欄位**，議程頁也只有軌道篩選、沒有 Day 切換。
要改回多天：每筆加回 `day` 欄位，並在 `site.js` 的議程頁那一段加一組分頁按鈕。

### `assets/js/site.js` — 資料怎麼變成畫面

分成 A～I 九段，開頭的註解有目錄。**要增減導覽列項目只改最上面的 `NAV` 陣列**
（有 `children` 就自動變下拉選單；桌機寬度不夠時右邊的項目會自動收進「更多 ▾」）。
`NAV_CTA` 設成 `null` 就不顯示 header 的購票按鈕。

HTML 只放空的掛載點，內容全由這裡填：

| 掛載點（HTML 的 id） | 在哪一頁 | 資料來源 | 函式 |
|---|---|---|---|
| `#navList`、`#drawerNav` | 全部 | `NAV` | `buildDesktopNav` / `buildDrawer` |
| `#headerCta`、`#drawerCta` | 全部 | `NAV_CTA` | 同上 |
| `[data-count]` | 首頁 | 自動計算 | `fillCounts` |
| `#agendaPreview` | 首頁 | `SESSIONS` | `renderAgendaPreview` |
| `#speakerGrid` | 首頁 | `SPEAKERS`（前 8 位） | `renderSpeakers` |
| `#sponsorWall` | 首頁 | `SPONSORS` | `renderSponsorWall` |
| `#trackChips`、`#agendaList`、`#filterCount` | 議程頁 | `TRACKS` + `SESSIONS` | `renderAgendaPage` |
| `#speakerList`、`#speakerCount` | 講者頁 | `SPEAKERS`（全部） | `renderSpeakerPage` |
| `#sponsorTiers` | 贊助頁 | `SPONSORS` + `SPONSOR_TIERS` | `renderSponsors` |

兩個講者渲染函式的差別：`renderSpeakers` 是首頁那塊深青底、只有姓名職稱的精簡版；
`renderSpeakerPage` 是講者頁的白底卡片，多了軌道標籤與 `bio`。兩邊讀同一份 `SPEAKERS`。

軌道標籤在議程頁與講者頁共用同一個 `tagsHtml()`，所以 Track 的顏色永遠一致。

有兩個刻意的防呆，**不要「順手整理掉」**：

- header 裡那份靜態的降級選單（`.ns-nav`）故意寫成一般 HTML 而不是 `<noscript>`。
  這樣不只「JS 被關掉」，連「`site.js` 出錯」都還留得住幾個基本連結。
  `site.js` 成功跑完會在 `<html>` 加上 `js-ready`，CSS 據此把它收起來。
- `boot()` 裡加 `js-ready` 那一行的位置是刻意的：一定要在建好導覽列之後、
  量寬度之前。

### `assets/css/style.css` — 樣式

單一檔案，分 11 章，開頭的註解有目錄：
設計 token → 基礎 → 導航列 → 圓弧色帶 → 元件 → 首頁 → 議程頁 → 講者頁 → 贊助頁 → 頁尾 → 響應式。

**改顏色只改第 1 章的設計 token**，其他地方一律用 `var(--…)` 取值。

視覺骨架是「用大半徑圓弧切開色帶」：`.band` 是一條區塊，
`.arc-bot` / `.arc-bot-l` / `.arc-bot-r` 會在下緣長出同色圓弧壓進下一區塊，
`.arc-rim` 再墊一道 mint 細鑲邊。hero 則是 `.hero-shell`（mint）包住 `.hero`（深青）疊出雙層弧。

---

## 常見的修改

### 改日期或場地

只改 `_src/config.js` 的 `SITE`。全站所有出現日期／場地的地方都是從那裡代進去的，
包括 hero、會場資訊、各頁的 description 與搜尋引擎結構化資料，不用逐頁找。

改完**記得重新產生社群分享圖**（見下面），因為圖上印著日期與場地。

### 改某一頁的標題或搜尋結果說明文字

改 `_src/config.js` 的 `PAGES`。`canonical`、`og:url`、`sitemap.xml` 都是自動算的，不用填。

### 改某一頁的內容

改 `_src/pages/` 底下的同名檔案。裡面只要寫 `<main>` 裡面的東西，
其他（`<head>`、導覽列、頁尾）都是 `layout.html` 自動包上去的。

**這些檔案裡想寫什麼 HTML 都可以**，沒有任何限制，也不一定要用 `parts/` 裡的東西。

### 新增一頁

1. 在 `_src/pages/` 放一個 `.html`，寫 `<main>` 裡面的內容
2. 在 `_src/config.js` 的 `PAGES` 加一筆（`file` / `title` / `desc`；
   要用 `parts/page-hero.html` 當頁首的話再加 `h1` / `lead`）
3. 想在導覽列與頁尾出現的話：改 `site.js` 的 `NAV` 陣列，以及 `_src/parts/footer.html`

`sitemap.xml` 會自己跟著長。

### 某一頁想要完全自己來，不要套版

在 `PAGES` 那一筆加上 `layout: null`：

```js
{ file: 'special.html', layout: null }
```

產生器就只會把 `_src/pages/special.html` 原封不動複製出去，連 `{{…}}` 都不會碰。

### 某一頁想加自己的 `<head>` 內容

在 `PAGES` 那一筆加 `head: 'parts/你的檔案.html'`，內容會被放到 `</head>` 前面。
首頁的 schema.org 結構化資料就是這樣掛的。

> 結構化資料只掛首頁一份。掛多份 Google 會當成好幾個不同的活動。

---

## SEO：哪些東西不能用 JavaScript 產生

這條是硬規則，踩到就會出事：

| 東西 | 能不能用 JS 產生 | 為什麼 |
|---|---|---|
| `<title>`、`description`、`canonical`、**OG／Twitter card** | **不行** | Facebook、LINE、Slack、Discord、X 的預覽爬蟲**完全不執行 JavaScript**。用 JS 產生的話，分享出去就是一片空白 |
| `<h1>` 與正文 | 不行 | Google 雖然會執行 JS，但要排隊，可能延遲數小時到數天 |
| 導覽列、頁尾、手機選單 | 可以 | 不是搜尋內容 |
| 議程／講者／贊助卡片 | 可以 | 目前就是 `site.js` 渲染的。搜尋引擎另外靠首頁的 schema.org 結構化資料認得這場活動 |

所以 `layout.html` 的 `<head>` 那一段，**不要改成用 JS 塞**。

---

## 社群分享圖

`assets/img/og.png`（1200×630），分享到 LINE、Facebook、Slack 時顯示的預覽圖。
原始檔是 `_src/og.svg`。**日期或場地改了之後要重新產生一次**（圖上印著這些資訊）：

```bash
rsvg-convert -w 1200 -h 630 2026/_src/og.svg -o 2026/assets/img/og.png
```

（`brew install librsvg`；用 ImageMagick、Figma、Illustrator 匯出也行，只要是 1200×630 的 PNG。）

設計組做好正式版的話，直接覆蓋 `assets/img/og.png` 就好，不用改任何程式。

---

## 部署

push 到 `develop` 就會自動部署（`.github/workflows/deploy-pages.yml`）。
流程是：checkout → `node 2026/tools/build.mjs` → 上傳整個 repo → GitHub Pages。

runner 內建 Node，這一步不需要 `npm install`。
產出的 `2026/*.html` 沒有進版控，所以每次部署都會重新產生一次。

### 正式對外公開前要接的線

這些是「機制上還沒接起來」的部分，跟內容進度無關：

- [ ] 根目錄 `robots.txt` 加一行 `Sitemap: https://mopcon.org/2026/sitemap.xml`
      （目前 2026 的 sitemap 有產生，但沒有被任何地方引用，所以爬蟲不會主動找到）
- [ ] 根目錄 `sitemap.xml` 加上 `https://mopcon.org/2026/`
- [ ] 根目錄 `index.html` 的轉址改成 `/2026/`，
      根目錄 `sitemap.xml` 把前一年的 priority 降下來
- [ ] `site.js` 的 `NAV_CTA` 接上購票連結（目前是 `null`，header 按鈕不顯示）
- [ ] `NAV`、`_src/parts/footer.html`、各頁 CTA 按鈕裡還是 `#` 的連結都接上
- [ ] `assets/img/og.png` 依最終的日期與場地重新產生

> 在還不想被搜尋引擎收錄之前，可以在 `_src/layout.html` 的 `<head>` 加一行
> `<meta name="robots" content="noindex">`，正式公開時再拿掉。
> 注意：站台只要部署上去就是公開可存取的，noindex 只擋收錄、不擋人直接開網址。

---

## 活動結束後：封存成靜態檔

結束後把最後的成品 commit 進 repo，之後就零維護、也不再依賴產生器：

1. `node 2026/tools/build.mjs`
2. `.gitignore` 刪掉 `/2026/*.html` 和 `/2026/sitemap.xml` 兩行
3. `git add 2026/`
4. `.github/workflows/deploy-pages.yml` 刪掉 `Build 2026` 那一步
5. `_src/` 留著給下一年當範本（或一起刪掉也可以，成品是完整的 HTML）

做完之後 `2026/` 就跟 2012～2025 一模一樣了。

---

## 設計與素材規則

這幾條是 `style.css` 與 `site.js` 的註解會引用到的，改東西前先看一下。

1. **顏色只改 `style.css` 開頭「1 設計 token」那一段**，其他地方一律用 `var(--…)` 取值。
2. **圓弧是 SVG `<path>` 與 CSS `border-radius` 畫的**，要調弧度就改座標，不要換成點陣圖。
3. **紋理（DNA／六邊形）只放邊角、透明度 8–16%，中央永遠淨空**，不可以壓到文字。
   手機版整組隱藏。
4. **無障礙對比是實際量過的，不是估的。** 改顏色請重新量：
   白底上的文字用 `--c-teal-deep`（7.36:1）；深青底配白字時，首頁講者區用的是深一階的
   `--c-teal-ink`，因為白色六邊形紋理會把底色提亮，用 `--c-teal-deep` 只剩 4.12:1（不到 AA 的 4.5）。
   Track C 的 lime 色點對白底只有 1.40:1，所以加了 1px 深墨描邊——新增軌道時太淺的顏色也要照做。
   鍵盤焦點框不要換成 amber（對白底只有 1.86:1，而且會畫在 amber 按鈕上）。
   hero 上那層壓暗的 `.hero-scrim` 也是為了對比才存在的，不要拿掉。
5. **佔位塊換成正式素材**：贊助 logo 與講者頭像預設都是 CSS 畫的幾何圖形（圓環／六邊形／方形輪流）。
   - 贊助 logo：圖檔放 `assets/img/`，在 `data.js` 的那一筆加 `logo: 'assets/img/xxx.svg'`，
     `site.js` 已經支援，會自動改用圖片。優先用 SVG，PNG 的話請去背並留白邊。
   - 講者頭像：`SPEAKERS` 目前沒有頭像欄位，要加真人照片時需要同步改
     `site.js` 的 `renderSpeakers()`（首頁）與 `renderSpeakerPage()`（講者頁）**兩個地方**。
     照片建議正方形、至少 200×200。
6. **字型與 logo 尺寸**：
   - 標題字 Alternity 是第三方 CDN（fonts.cdnfonts.com）而且**沒有中文字符**，
     所以 `.display` 只能掛在純英數的短字串上。中文掛上去會 fallback 成另一種字型，同一行變兩種字。
   - **會變動的資訊（時間、統計數字）一律用內文字型**，不要用 `.display`。
     Alternity 下載中的那 1–3 秒整串會看不見。
   - 橫式 logo 比例是 408:75，導覽列用 `height:30px`（≈ 寬 163px），
     剛好過風格書的最小尺寸（橫式寬 ≥ 160px）。要再縮小請先確認風格書。

---

## 遇到問題

- **產生器報錯**：訊息會直接說是哪一頁、哪個變數或哪個檔案有問題，照著改就好。
  預覽伺服器不會因為產生失敗而中斷，修好存檔就會自動恢復。
- **改了 `_src/` 但畫面沒變**：確認有跑 `node 2026/tools/build.mjs`，
  或是用 `--serve` 模式（會自動重跑）。
- **改了 `assets/` 但畫面沒變**：那是瀏覽器快取，強制重新整理即可（`assets/` 不經過產生器）。
- **`2026/*.html` 在 git 裡看不到**：正常，開發期間它們不進版控（見 `.gitignore`）。
- **`2026/*.html` 一直出現在 `git status` 裡**：表示它們曾經被 commit 過而成為「已追蹤」狀態，
  而 `.gitignore` 對已追蹤的檔案沒有作用。跑一次下面這行把它們移出版控就好
  （檔案不會被刪掉，只是不再進版控）：

  ```bash
  git rm --cached 2026/*.html 2026/sitemap.xml
  ```
