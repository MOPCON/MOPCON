# MOPCON 靜態網站本地測試指南

本專案是 MOPCON 歷年活動網站（2012–2025）的「靜態凍結」存檔。所有頁面都是預先產生的 HTML/CSS/JS，沒有任何後端；行為靠根目錄的 `.htaccess` 接住：

- 舊 `.php` 入口（`feedback.php`、`app.php`、`bof.php`、`album.php` 等）301 → 對應的 Google Form / HackMD / 靜態頁
- 任何遺漏的 `.php` 一律回 410 Gone
- 統一 `ErrorDocument` 導到 `/err/404.html`

因為這些是 Apache `mod_rewrite` 的規則，**本機測試必須使用 Apache**。`python -m http.server`、`live-server`、各家 IDE 內建 server 都不會讀 `.htaccess`，redirect / 410 / 404 行為會跟正式機不同，無法真正驗證。

## 快速開始

需求：[Docker](https://www.docker.com/)（任何近期版本都可）。

```bash
# 1. 啟動本機 Apache（已預先啟用 mod_rewrite + AllowOverride All）
./tools/test-server.sh

# 2. 另開一個 terminal，跑自動煙霧測試
BASE=http://localhost:8080 ./tools/verify-freeze.sh

# 3. 用瀏覽器手動點頁面確認
open http://localhost:8080/
```

`Ctrl+C` 即可停止 server。

可以指定 port：

```bash
PORT=9000 ./tools/test-server.sh
BASE=http://localhost:9000 ./tools/verify-freeze.sh
```

## `tools/test-server.sh` 做什麼

啟動官方 `httpd:2.4` Docker image，把整個 repo 掛到 `/usr/local/apache2/htdocs`，並在啟動前 patch `httpd.conf`：

- 開啟 `mod_rewrite`（官方 image 預設關閉）
- 把 `AllowOverride None` 改成 `AllowOverride All`，讓 `.htaccess` 生效

完全不在 host 留任何檔案，container 結束就乾淨。

## `tools/verify-freeze.sh` 檢查項目

對本機 server 發 HTTP 請求並比對 status code：

| 路徑 | 期望狀態 |
|---|---|
| `/2012/` ~ `/2025/` 各年首頁 | 200 |
| `/`、`/album/`、`/err/404.html` | 200 |
| `/feedback.php`、`/warmup-feedback.php`、`/2018/feedback.php`… | 301 |
| `/app.php`、`/bof.php`、`/album.php`、`/2018/app.php` | 301 |
| `/index.php` | 410 |

任何偏離期望的會印 `FAIL` 並讓腳本以 non-zero exit。

## 手動驗收清單

`verify-freeze.sh` 只看 status code、不檢查內容，下面這幾項建議用瀏覽器逐一點過。

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

### 404 / Redirect
- [ ] `/this-does-not-exist` → 看到自訂 404 頁
- [ ] `/feedback.php` → 跳到 Google Form
- [ ] `/index.php` → 410 Gone

### DevTools
- [ ] Network tab 沒有意料外的 4xx / 5xx
- [ ] Console 沒有 mixed content 或 CORS 錯誤

## 已知限制

- **2015–2018 雙語切換**：原本 `?lang=zh` / `?lang=en` 兩版被合併成同一份（wget 當年只抓到一語），lang switcher 點下去不會切換語言。是來源資料就缺，無法還原。
- **2015–2018 個別 speaker / session 詳情頁**：類似原因，所有 `schedule.php?speaker=…` 全部 fallback 到 `schedule.php.html`。
- **Cloudflare email-decode 腳本**（`../cdn-cgi/scripts/.../email-decode.min.js`）在多個年份會 404，純粹影響原本的 email 混淆，不影響版面。
- **2014 字型**、**2021 Nuxt JS bundle** 內仍有 `%3F` cache-buster，是資源內部資料、不影響頁面行為。

## 部署到 staging 後的驗證

把 `BASE` 換成 staging URL 跑同一支腳本就好，不需要在 staging 跑 Docker：

```bash
BASE=https://staging.mopcon.org ./tools/verify-freeze.sh
```

## 專案結構

```
.
├── 2012/ ~ 2025/         各年完整靜態站（HTML/CSS/JS/圖）
├── album/                歷年照片牆
├── err/404.html          自訂 404 頁
├── tools/
│   ├── test-server.sh       Docker Apache 一鍵啟動
│   └── verify-freeze.sh     自動煙霧測試
├── .htaccess             全站 redirect / 410 / ErrorDocument 規則
├── index.html            根目錄入口
├── history.html          歷年沿革
├── sitemap.xml
└── robots.txt
```

## 疑難排解

**啟動時看到 `Cannot start service ... Bind for 0.0.0.0:8080 failed: port is already allocated`**

8080 port 被佔用，換一個：

```bash
PORT=9000 ./tools/test-server.sh
```

**所有頁面 200 但樣式全空**

通常是 `.htaccess` 沒生效或 `mod_rewrite` 沒開。確認你是用 `tools/test-server.sh` 啟動，不是直接 `docker run httpd:2.4`。

**`docker: command not found`**

請先安裝 Docker Desktop（macOS / Windows）或在 Linux 安裝 docker engine。

**Apple Silicon 看到 `WARNING: The requested image's platform (linux/amd64) does not match...`**

警告可以忽略，httpd:2.4 image 在 arm64 下能正常執行。
