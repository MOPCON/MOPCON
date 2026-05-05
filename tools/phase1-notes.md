## SectionHero/ 引用調查 (2026-05-05)

於 repo 全域搜尋 `SectionHero` / `section[-_]hero`，排除 `.git`、`node_modules`、`vendor`、`dist`、`out`，並過濾掉 `/SectionHero/` 自身路徑後，共得 12 筆原始 match：

```
2019-dev/pages/home/index.vue:        <SectionHero id="sectionHero" />
2019-dev/pages/home/index.vue:import SectionHero from './SectionHero';
2019-dev/pages/home/index.vue:        SectionHero,
2019-dev/pages/event/index.vue:        <SectionHero @onPopupOpen="onPopupOpen" />
2019-dev/pages/event/index.vue:import SectionHero from './SectionHero';
2019-dev/pages/event/index.vue:        SectionHero,
2022-dev/pages/schedule/_schedule_id.vue:    <SectionHero />
2022-dev/pages/schedule/_schedule_id.vue:import SectionHero from '~/components/Schedule/SectionHero'
2022-dev/pages/schedule/_schedule_id.vue:    SectionHero,
2021-dev/pages/mosume/index.vue:    <SectionHeroimg />
2021-dev/pages/mosume/index.vue:import SectionHeroimg from './SectionHeroimg'
2021-dev/pages/mosume/index.vue:    SectionHeroimg,
```

### 分類

所有 12 筆 match 全部都是 **year-scoped 區域的 import / 元件使用**，且 import 路徑都解析到 **同年內的 sibling 子目錄**，與 repo 根的 `SectionHero/` 無關：

| 引用檔案 | import 路徑 | 解析到的目錄 | 是否頂層 `/SectionHero/`? |
|---|---|---|---|
| `2019-dev/pages/home/index.vue` | `./SectionHero` | `2019-dev/pages/home/SectionHero/` | 否 |
| `2019-dev/pages/event/index.vue` | `./SectionHero` | `2019-dev/pages/event/SectionHero/` | 否 |
| `2022-dev/pages/schedule/_schedule_id.vue` | `~/components/Schedule/SectionHero` | `2022-dev/components/Schedule/SectionHero/` | 否 |
| `2021-dev/pages/mosume/index.vue` | `./SectionHeroimg` | `2021-dev/pages/mosume/SectionHeroimg/` | 否（且名稱不同） |

均已逐一 `ls` 驗證 sibling 目錄存在，import 不會 fall-through 到根目錄。

### 結論

**頂層 `/SectionHero/` 完全沒有被任何檔案引用，Phase 2 可安全砍除。**

12 筆 grep match 全為各年自有的同名 sibling 元件（2019-dev × 2、2022-dev × 1、2021-dev 為 `SectionHeroimg` 變體 × 1），與根目錄 `/SectionHero/` 無依賴關係，亦不需在 Phase 1 build 任一年時特別處理。

---

## api/ 後端啟動結果 (2026-05-05)

**未實際嘗試啟動。** Controller 在 dispatch 此任務前已完成靜態檢查並做出決策：

- 本機 PHP 版本: **8.5.5** (Homebrew)
- `api/composer.json` 要求:
  - `laravel/lumen-framework: 5.8.*` (Lumen 5.8 已 EOL，最高測試到 PHP 7.4)
  - `illuminate/redis: 5.8.*`
  - dev: `phpunit ^7.0` (不支援 PHP 8+)
- 預期 `composer install` 會因版本約束失敗；即便繞過也會踩 Lumen 5.8 在 PHP 8 上的 runtime 不相容。

**決策：放棄 api/ 復活，直接走 wget fallback。**

理由:
1. api/ 在 Phase 2 將整個砍除 (使用者已確認舊 App 停用)
2. 投入時間讓 EOL 軟體在現代 PHP 上跑只為單次 build，ROI 過低
3. Production (main branch on `mopcon.org`) 是 ground truth，wget 直接抓比 build 更接近真實上線版

**Tasks 5–8 路徑：** 全部走 wget mirror (路徑代號 5B / 6B / 7B / 8B)。

---

## Phase 1 全量驗證 (2026-05-05)

### 各年 artifact 統計

| 年 | 來源 | 檔案數 | 大小 | Commit |
|---|---|---|---|---|
| 2019 | wget mirror (prod) | 98 | 22M | 99c6964c |
| 2020 | wget mirror + 31 sponsor 圖補抓 | 110 | 18M | 0f1a7250 |
| 2021 | wget mirror | 218 | 21M | 1bfe763c |
| 2022 | wget mirror + 29 speaker 圖補抓 | 116 | 37M | efa4c75f |
| 2024 | next build → 2024-static-tmp/ | 275 | 20M | 82c80b5f |
| 2025 | astro build → 2025-static-tmp/ | 132 | 66M | 7ab67c41 |
| album | curl prod | 1 | 28K | e2d9b2ef |

### 驗證結果

#### Step 1 — `tools/verify-freeze.sh` against worktree root (httpd container, repo root mounted)

```
OK   200  /2012/
OK   200  /2013/
OK   200  /2014/
OK   200  /2015/
OK   200  /2016/
OK   200  /2017/
OK   200  /2018/
OK   200  /2019/
OK   200  /2020/
OK   200  /2021/
OK   200  /2022/
OK   200  /2023/
OK   200  /2024/
OK   200  /2025/
exit 0
```

Note: `/2024/` 與 `/2025/` 在此模式下回 200 是因為 Apache 對 source 目錄出 directory listing（httpd image 預設 `AllowOverride None`，`.htaccess` 的 `Options -Indexes` 不生效）。實際 build artifact 由 Step 2 個別掛載驗證。

#### Step 2 — Artifact 個別掛載驗證

```
# -v $PWD/2024-static-tmp:/usr/local/apache2/htdocs/2024
/2024/ 200
/2024/schedule/ 200
/2024/speaker/ 200

# -v $PWD/2025-static-tmp:/usr/local/apache2/htdocs/2025
/2025/ 200
/2025/agenda/ 200
/2025/sponsor/ 200
```

#### Step 3 — Spot-check 新 freeze 年份 + album

```
/2019/ 200
/2020/ 200
/2021/ 200
/2022/ 200
/2019/speaker.html 200
/2020/sponsor.html 200
/2022/schedule.html 200
/album/ 200
```

全部回 200，Phase 1 freeze 驗證通過。

### 已知遺留問題 (Phase 2/3 接手)

- `2024/`, `2025/` 仍是 source（Phase 3 Task 20 才會 swap 成 artifact）
- `api/`, PHP 入口、root composer 殘留仍在（Phase 2 Task 17 砍）
- `_nuxt/*.js` bundles 含 `/api/2020/` 等 dead URLs，但 SSR-rendered HTML 已 inline 內容，runtime hydration silent fallback
- 2022 `<div class="btn">` ticket buttons 沒有 hyperlink（production 是用 Vue handler + Lumen POST，已停用）
- httpd container 預設 `AllowOverride None` 使 `.htaccess` 的 `Options -Indexes` 失效；正式 production Apache 需確認 `AllowOverride All`（Phase 2 Task 16 改寫 .htaccess 時一併確認）
