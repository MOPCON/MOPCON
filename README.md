# MOPCON 靜態網站（GitHub Pages 版）

本專案是 MOPCON 歷年活動網站（2012–2025）的「靜態凍結」存檔，部署於 **GitHub Pages**。所有頁面都是預先產生的 HTML/CSS/JS，沒有任何後端。

舊 PHP 入口（`feedback.php`、`app.php`、`bof.php`、`album.php` 等）改用「同名目錄 + `index.html` meta-refresh」實作 redirect；任何遺漏的 `.php` 一律由 GH Pages 預設 404 接住。

## 主分支與部署

- 部署來源分支：**`develop`**
- 觸發機制：`develop` push 後由 `.github/workflows/deploy-pages.yml` 自動 build + 部署
- 也可在 GitHub Actions 頁面手動 `Run workflow`

## GitHub 端設定（一次性）

1. **Settings → Pages**：Source 選 **GitHub Actions**（不要選 Deploy from a branch）。
2. **Settings → Environments → `github-pages`**：允許 `develop` branch 部署。
3. 自訂網域 `mopcon.org`：
   - Repo root 的 `CNAME` 檔案內容單行 `mopcon.org`。
   - DNS：A record 指向 GH Pages IP（`185.199.108.153 / .109.153 / .110.153 / .111.153`），`www` CNAME 到 `<owner>.github.io`。
   - Settings → Pages → Custom domain 填 `mopcon.org`，勾 Enforce HTTPS。

## 本地預覽

純靜態，任何 static server 都行：

```bash
python3 -m http.server 8080
# 或
npx serve .
```

接著開 `http://localhost:8080/`。

> 注意：本地 server 不會幫你做 GH Pages 的「URL 自動補斜線」處理，所以舊 `.php` redirect 路徑要手動加斜線（如 `/feedback.php/`）才能進到 meta-refresh 頁。線上 GH Pages 會自動處理。

## 部署後驗證

```bash
BASE=https://mopcon.org              ./tools/verify-ghpage.sh
BASE=https://<owner>.github.io/MOPCON ./tools/verify-ghpage.sh
```

`verify-ghpage.sh` 對線上發 HTTP 請求並比對：

| 路徑 | 期望 |
|---|---|
| `/2012/` ~ `/2025/` 各年首頁 | 200 |
| `/`、`/album/`、`/err/404.html`、`/404.html` | 200 |
| `/feedback.php/`、`/app.php/`、`/bof.php/`、`/album.php/` 等 | 200，body 含目標 URL |
| `/this-does-not-exist`、`/index.php` | 404 |

任何偏離期望會印 `FAIL` 並讓腳本以 non-zero exit。

## 手動驗收清單

`verify-ghpage.sh` 只看 status code 與 body 有沒有目標關鍵字、不檢查視覺，建議用瀏覽器逐一點過。

### 各年首頁
- [ ] `/2025/` ─ Astro 站，navbar 含「歷年MOPCON」下拉
- [ ] `/2024/` ─ Next.js export
- [ ] `/2023/` ~ `/2019/` ─ 預先建構的靜態站
- [ ] `/2018/` ~ `/2015/` ─ wget 抓的舊站，CSS/JS 應完整載入
- [ ] `/2014/` ~ `/2012/` ─ 最早期，純 HTML

### 內頁導覽
- [ ] 2025 各分頁（`/about`、`/agenda`、`/sponsor`）
- [ ] 2018/2017/2016/2015 內隨手點兩三個 nav 連結，確認都不 404
- [ ] 縮窗到手機寬度，「歷年MOPCON」摺疊能正常展開

### Redirect
- [ ] `/feedback.php` → 自動補斜線 → meta-refresh → Google Form
- [ ] `/app.php`、`/bof.php` → HackMD
- [ ] `/album.php` → `/album/`

### 404
- [ ] `/this-does-not-exist` → 看到自訂 404 頁（小女孩）
- [ ] `/index.php` → 同上自訂 404 頁

### DevTools
- [ ] Network tab 沒有意料外的 4xx / 5xx
- [ ] Console 沒有 mixed content 或 CORS 錯誤

## 已知限制

### 內容面（與 Apache 版相同）
- **2015–2018 雙語切換**：原本 `?lang=zh` / `?lang=en` 兩版被合併成同一份（wget 當年只抓到一語），lang switcher 點下去不會切換語言。是來源資料就缺，無法還原。
- **2015–2018 個別 speaker / session 詳情頁**：類似原因，所有 `schedule.php?speaker=…` 全部 fallback 到 `schedule.php.html`。
- **Cloudflare email-decode 腳本**（`../cdn-cgi/scripts/.../email-decode.min.js`）在多個年份會 404，純粹影響原本的 email 混淆，不影響版面。
- **2014 字型**、**2021 Nuxt JS bundle** 內仍有 `%3F` cache-buster，是資源內部資料、不影響頁面行為。

### 平台面（GH Pages 相對 Apache 的妥協）
- **舊 `.php` URL 的 redirect 不再是 HTTP 301**：改用「同名目錄 + meta-refresh」，多一跳；爬蟲 / API client 拿到的不是乾淨 301 → 目標 URL，SEO 訊號弱化；瀏覽器使用者體驗一致。
- **`/index.php` 與其他未列舉的 `.php` URL 從 410 Gone 變成 404 Not Found**：搜尋引擎看不到「永久消失」訊號，舊 PHP URL 從索引中淘汰會慢一些。
- **只有 404 有自訂錯誤頁**：原 `.htaccess` 把 400/401/403/500 都導到 `/err/404.html`，GH Pages 只支援自訂 404；其他狀態碼用 GH Pages 預設頁。實務上純靜態幾乎只會出 404。
- **沒有 access log**：GH Pages 不開放存取 log，只能靠前端分析（GA 等）追流量。
- **部署延遲**：Actions build → CDN 推送有 30 秒到數分鐘的 cache，不會即時看到改動。

## 專案結構

```
.
├── 2012/ ~ 2025/         各年完整靜態站（HTML/CSS/JS/圖）
├── album/                歷年照片牆
├── err/404.html          原始 404 頁（保留作為內部資源來源）
├── 404.html              GH Pages 預設 404 頁（內容同 err/404.html）
├── *.php/index.html      meta-refresh 重導頁（feedback.php、app.php、bof.php、album.php、warmup-feedback.php、warnup-feedback.php、2018/feedback.php、2018/app.php、2018/warnup-feedback.php）
├── tools/
│   └── verify-ghpage.sh    部署後煙霧測試
├── .nojekyll             關閉 GH Pages 的 Jekyll 處理
├── .github/workflows/
│   └── deploy-pages.yml    Actions 自動部署
├── CNAME                 自訂網域（如使用 mopcon.org）
├── index.html            根目錄入口（meta-refresh 到 /2025/）
├── history.html          歷年沿革
├── sitemap.xml
└── robots.txt
```

## 疑難排解

**`develop` push 後沒部署**

到 GitHub Actions 看 `Deploy to GitHub Pages` workflow 是否被觸發。沒被觸發通常是：
- Settings → Pages 的 Source 沒設成「GitHub Actions」
- Settings → Environments → `github-pages` 沒允許 `develop` branch

**部署成功但網站還是舊內容**

GH Pages 的 CDN cache 通常 30 秒到幾分鐘會 invalidate。瀏覽器端可以強制重新整理（Cmd/Ctrl + Shift + R）排除 local cache。

**自訂網域 `mopcon.org` 顯示憑證錯誤或 404**

第一次設定 custom domain 後憑證簽發要等幾分鐘到一小時。期間先用 `<owner>.github.io/<repo>/` URL 驗證部署本身正常。
