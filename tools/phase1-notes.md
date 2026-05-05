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
