/* ==========================================================================
   MOPCON 2026 假資料檔（arc-teal 樣板）
   --------------------------------------------------------------------------
   這個檔案裡「全部都是假資料」，正式資料來了直接覆蓋字串就好，不用改 HTML／CSS。
     TRACKS         軌道清單（議程頁上面那排篩選按鈕是照這個產生的）
     SESSIONS       議程時段（議程頁、首頁的議程預覽都讀這一份）
     SPEAKERS       講者（首頁的講者陣容讀這一份）
     SPONSOR_TIERS  贊助級別（決定順序與卡片大小）
     SPONSORS       贊助商（贊助頁、首頁的贊助牆讀這一份）
   注意：這個檔要在 site.js 之前載入（三頁的 HTML 已經排好順序了）。
   ========================================================================== */

/* ── 軌道 ─────────────────────────────────────────────────────────────────
   id   ：對應 SESSIONS 裡的 track 欄位，用 A / B / C 這種短代號
          （id 不要亂改：style.css 的軌道顏色是掛在 .tag-A／.chip-A 這些 class 上的，
            要換場地名稱只改下面的 name 就好）
   name ：顯示出來的文字
   要多一軌就多一行，議程頁的篩選按鈕會自己多一顆，不用改 CSS。
   ※ 場地代號沿用大會時刻表：R1 在 1F，R2／R3 在 B1F。 */
var TRACKS = [
  { id: 'A', name: 'R1（1F）' },
  { id: 'B', name: 'R2（B1F-R）' },
  { id: 'C', name: 'R3（B1F-L）' }
];

/* ── 議程 ─────────────────────────────────────────────────────────────────
   ★ 2026 是「單日、三軌」，所以沒有「第幾天」這個欄位，議程頁也只有軌道篩選。
   start  ：開始時間（字串，直接顯示）
   end    ：結束時間（字串，直接顯示）；沒有結束時間（例如「散場」）就留空字串
   type   ：這一列的類型，決定長相
              'talk'    一般議程（有講者與難度標籤）
              'keynote' 專題演講（跨全部軌道的整列，標題較大）
              'reg'     報到    ┐
              'opening' 開幕    │
              'break'   休息    │ 這幾種都是跨全部軌道的整列，
              'tea'     Tea Time│ 只要填 title，不用填 speaker / org / level。
              'lunch'   午餐    │ CSS 是用「不是 talk 也不是 keynote」來認的，
              'closing' 閉幕    │ 所以要多一種列型，直接在這裡寫新的 type 就好，
              'end'     散場    ┘ 不用去改 style.css。
   track  ：'A' / 'B' / 'C'；跨軌道的（Keynote、報到、休息、午餐、閉幕⋯）填 'ALL'，
            這種列在任何篩選條件下都會顯示
   title  ：議程標題（不是議程的列就寫「報到」「休息」「午餐」「閉幕」）
   speaker：講者姓名
   org    ：講者的公司／單位
   level  ：難度標籤，只填 入門 / 進階 / 實作
   要加一場議程就複製一行改內容；陣列順序就是畫面上的順序。

   ★ 同一個時段的三軌一定要填「一模一樣的 start 與 end」——site.js 是用這兩個字串
     把相鄰的列併成同一個時段的，桌機才會把它們橫向排成一列、時間對得整整齊齊。
     差一個字（例如 '9:10' 與 '09:10'）就會被拆成兩個時段，變成上下兩列。

   ※ 目前是 11 個議程時段：Keynote 1 列（在 R1 舉行，但跨全軌顯示）
     ＋ 7 個時段 × 3 軌 = 21 列一般議程，算「場次」是 21 ＋ Keynote 1 = 22 場；
     另有 8 列跨全軌的非議程列（報到／開幕／休息 ×4／Tea Time ×2／午餐／閉幕／散場）。
   ※ Unconf 不是正式議程（場外互動，在各休息與 Tea Time 時段進行），所以不列在這裡，
     議程頁時間軸下面有一行說明。 */
/* ── 議程時刻表（agenda.html、agenda2.html 讀這一份）────────────────────────
   每筆代表一個時段：
     common    全場共同時段（報到、開幕、休息、午餐、閉幕、散場）
     span-talk 跨三軌共同議程（例如 9:10 Keynote）
     talks     各軌分場議程，halls 陣列指定 R1 / R2 / R3 的講者或 tbd: true
*/
var AGENDA_SCHEDULE = [
  { time: '8:30', type: 'common', title: '報到入場時間' },
  { time: '9:00', type: 'common', title: '開幕 Opening' },
  {
    time: '9:10',
    type: 'span-talk',
    speakerName: 'Alias'
  },
  { time: '9:50', type: 'common', title: 'break' },
  {
    time: '10:00',
    type: 'talks',
    halls: [
      { hall: 'R1', speakerName: '蕭漢威' },
      { hall: 'R2', speakerName: '陳葵懋(Ian)' },
      { hall: 'R3', tbd: true }
    ]
  },
  { time: '10:40', type: 'common', title: 'break' },
  {
    time: '11:00',
    type: 'talks',
    halls: [
      { hall: 'R1', speakerName: '鄭聖文' },
      { hall: 'R2', speakerName: 'Stanley' },
      { hall: 'R3', speakerName: 'Voidful' }
    ]
  },
  { time: '11:40', type: 'common', title: 'break' },
  {
    time: '11:50',
    type: 'talks',
    halls: [
      { hall: 'R1', speakerName: 'allen54a0' },
      { hall: 'R2', speakerName: 'Vic Wen' },
      { hall: 'R3', speakerName: 'Caesar Chi' }
    ]
  },
  { time: '12:30', type: 'common', highlight: 'lunch', title: 'Lunch' },
  {
    time: '13:20',
    type: 'talks',
    halls: [
      { hall: 'R1', speakerName: '高見龍' },
      { hall: 'R2', speakerName: 'Rete Lin' },
      { hall: 'R3', speakerName: '張維元' }
    ]
  },
  { time: '14:00', type: 'common', title: 'break' },
  {
    time: '14:10',
    type: 'talks',
    halls: [
      { hall: 'R1', speakerName: 'Cherie Hsieh' },
      { hall: 'R2', speakerName: 'Kuon Ding' },
      { hall: 'R3', speakerName: 'John Forge' }
    ]
  },
  { time: '14:50', type: 'common', highlight: 'tea', title: 'tea time' },
  {
    time: '15:10',
    type: 'talks',
    halls: [
      { hall: 'R1', speakerName: 'zonble' },
      { hall: 'R2', speakerName: 'Abi Chang' },
      { hall: 'R3', speakerName: 'Today' }
    ]
  },
  { time: '15:50', type: 'common', title: 'break' },
  {
    time: '16:00',
    type: 'talks',
    halls: [
      { hall: 'R1', speakerName: '焉德葳' },
      { hall: 'R2', speakerName: 'Chun Shawn' },
      { hall: 'R3', tbd: true }
    ]
  },
  { time: '16:40', type: 'common', title: 'break' },
  { time: '16:50', type: 'common', highlight: 'closing', title: '閉幕 Closing' },
  { time: '17:20', type: 'common', title: '散場' }
];

var SESSIONS = [
  { start: '08:30', end: '09:00', type: 'reg', track: 'ALL', title: '報到入場時間' },
  { start: '09:00', end: '09:10', type: 'opening', track: 'ALL', title: '開幕 Opening' },
  /* Keynote 在 R1（1F），但屬於全場共同場次，所以 track 填 'ALL'，篩選任何一軌都看得到 */
  { start: '09:10', end: '09:50', type: 'keynote', track: 'ALL', title: '當 AI 翼展天際：無人機的創新、應用與未來', speaker: 'Alias', org: '臺灣希望創新股份有限公司', level: 'Normal - 需相關基礎知識' },
  { start: '09:50', end: '10:00', type: 'break', track: 'ALL', title: 'break' },
  { start: '10:00', end: '10:40', type: 'talk', track: 'A', title: '無人飛船：長期滯空載具的基礎原理與自主飛控實務經驗', speaker: '蕭漢威', org: '國立高雄大學資訊管理學系', level: 'Basic - 基礎入門' },
  { start: '10:00', end: '10:40', type: 'talk', track: 'B', title: 'Code 是 AI 寫的，就真的有一支開發團隊嗎？', speaker: '陳葵懋(Ian)', org: '一等一科技', level: 'Normal - 需相關基礎知識' },
  { start: '10:00', end: '10:40', type: 'talk', track: 'C', title: '敬請期待', speaker: 'TBD', org: '', level: '入門' },
  { start: '10:40', end: '11:00', type: 'tea', track: 'ALL', title: 'break' },
  { start: '11:00', end: '11:40', type: 'talk', track: 'A', title: 'Learning to Fly in Simulation: Quadrotor Reinforcement Learning from First Principles', speaker: '鄭聖文', org: '不公開', level: 'Basic - 基礎入門' },
  { start: '11:00', end: '11:40', type: 'talk', track: 'B', title: '當工程師不再打字寫 code,他在做什麼?——一個人、12 週、17 萬行的 AI Native 開發模式', speaker: 'Stanley', org: 'ViewSonic', level: 'Normal - 需相關基礎知識' },
  { start: '11:00', end: '11:40', type: 'talk', track: 'C', title: '模型愈來愈大，我們該往哪裡走？2026 本土 AI 的訓練與突圍', speaker: 'Voidful', org: 'OpenFormosa', level: 'Expert - 建議聽眾具備相關經驗' },
  { start: '11:40', end: '11:50', type: 'break', track: 'ALL', title: 'break' },
  { start: '11:50', end: '12:30', type: 'talk', track: 'A', title: '用AI打造大氣探測無人機', speaker: 'allen54a0', org: 'UAV 無人機任務規劃與安全討論群', level: 'Normal - 需相關基礎知識' },
  { start: '11:50', end: '12:30', type: 'talk', track: 'B', title: 'Beyond the Agent：當模型越來越強，我們該刪掉什麼、留下什麼？', speaker: 'Vic Wen', org: 'Microsoft', level: 'Normal - 需相關基礎知識' },
  { start: '11:50', end: '12:30', type: 'talk', track: 'C', title: '一句需求到產品實現：如何讓 AI 真正參與製造？', speaker: 'Caesar Chi', org: '正美科技', level: 'Basic - 基礎入門' },
  { start: '12:30', end: '13:20', type: 'lunch', track: 'ALL', title: 'Lunch' },
  { start: '13:20', end: '14:00', type: 'talk', track: 'A', title: 'SDD 工作迴圈設計拆解', speaker: '高見龍', org: '五倍學院', level: 'Normal - 需相關基礎知識' },
  { start: '13:20', end: '14:00', type: 'talk', track: 'B', title: '無人機PX4的架構介紹與實作', speaker: 'Rete Lin', org: '品翔航太', level: 'Normal - 需相關基礎知識' },
  { start: '13:20', end: '14:00', type: 'talk', track: 'C', title: '從 Prompt 到 Production：用 Harness 打造可持續交付的 AI Agent 開發工作流', speaker: '張維元', org: '資料科學家的工作日常', level: 'Normal - 需相關基礎知識' },
  { start: '14:00', end: '14:10', type: 'break', track: 'ALL', title: 'break' },
  { start: '14:10', end: '14:50', type: 'talk', track: 'A', title: '當專案 100% 都由 AI coding，身為工程師和管理職的價值在哪裡？', speaker: 'Cherie Hsieh', org: '台灣積體電路製造股份有限公司', level: 'Normal - 需相關基礎知識' },
  { start: '14:10', end: '14:50', type: 'talk', track: 'B', title: '自主飛行的決策系統 - 從態勢感知到語意理解', speaker: 'Kuon Ding', org: 'Funny Systems', level: 'Expert - 建議聽眾具備相關經驗' },
  { start: '14:10', end: '14:50', type: 'talk', track: 'C', title: '使用 Unsloth 強化學習微調小模型，建構飲食教練 Agent', speaker: 'John Lu', org: '一線大廠', level: 'Expert - 建議聽眾具備相關經驗' },
  { start: '14:50', end: '15:10', type: 'tea', track: 'ALL', title: 'tea time' },
  { start: '15:10', end: '15:50', type: 'talk', track: 'A', title: '跟著AI 做一套AI 時代的台灣式編輯器', speaker: 'zonble', org: 'Noetiq Inc', level: 'Basic - 基礎入門' },
  { start: '15:10', end: '15:50', type: 'talk', track: 'B', title: '從存檔到內容富翁：讓個人知識庫自己長出內容', speaker: 'Abi Chang', org: 'Open to Work', level: 'Basic - 基礎入門' },
  { start: '15:10', end: '15:50', type: 'talk', track: 'C', title: '從評測到落地：打造 LLM 去偏見與輸出治理工作流', speaker: 'Today', org: '財團法人資訊工業策進會', level: 'Basic - 基礎入門' },
  { start: '15:50', end: '16:00', type: 'break', track: 'ALL', title: 'break' },
  { start: '16:00', end: '16:40', type: 'talk', track: 'A', title: '0c靈犀 - Transformer 神經網路注音輸入法', speaker: '焉德葳', org: 'BigGo', level: 'Normal - 需相關基礎知識' },
  { start: '16:00', end: '16:40', type: 'talk', track: 'B', title: 'Meta.ai 出現前，我怎麼開發 Threads 問答機器人？', speaker: 'Chun Shawn', org: '海外加密貨幣交易所', level: 'Normal - 需相關基礎知識' },
  { start: '16:00', end: '16:40', type: 'talk', track: 'C', title: '敬請期待', speaker: 'TBD', org: '', level: '入門' },
  { start: '16:40', end: '16:50', type: 'break', track: 'ALL', title: 'break' },
  { start: '16:50', end: '17:20', type: 'closing', track: 'ALL', title: '閉幕 Closing' },
  { start: '17:20', end: '', type: 'end', track: 'ALL', title: '散場' }
];

/* ── 講者 ─────────────────────────────────────────────────────────────────
   name   ：姓名
   role   ：職稱
   org    ：公司／單位
   track  ：'A' / 'B' / 'C'，講者頁會顯示成軌道標籤；不確定就整個欄位不要填
   keynote：填 true 會多一個 Keynote 標籤（通常只有一位）
   bio    ：一段講者簡介，只有講者頁會顯示；填 '' 就只顯示姓名與職稱
   img    ：講者頭像檔案路徑（可省略），首頁跟講者頁都會顯示
   link   ：講者的社群／個人頁網址（可省略）；若有多個請用逗號（,）分隔，彈出視窗會依序顯示對應圖標
   linkText：那個連結顯示的文字（可省略）；若有多個請用逗號（,）對應 link，沒填就自動判斷服務或網域

   首頁的講者陣容區塊只取前 8 位（且只用 name / role / org），
   講者頁 speakers.html 會列出全部並且加上 track 與 bio。
   要加人就多一行，兩邊的版面都會自己排，不用改 HTML／CSS。

   目前頭像是 CSS 畫的幾何佔位塊（圓環／六邊形／方形輪流），
   有真實照片時請看 README 第 5 點。

   ★ 這一段已經是正式資料：來自「MOPCON 2026 講者與議程資訊徵詢」表單的公開欄位
     （姓名或慣用 ID／公司／職稱／個人介紹／社交媒體連結），陣列順序是人工排的。
     track / keynote 要等議程時段與場地定案後再補；
     演講主題、摘要、難易度、標籤屬於議程資料，之後填進上面的 SESSIONS。 */
var SPEAKERS = [
  {
    id: "2026_Alias",
    name: "Alias",
    role: "執行長",
    org: "臺灣希望創新股份有限公司",
    img: "assets/img/speakers/alias_sliced.jpg",
    link: "",
    bio: "國立成功大學航太博士，研究領域為無人機系統及資通訊技術應用，「搞飛機」的經驗近 30 年，2018 年基於 SkySentry 無人機雲端監控系統技術，建構完全由國人自製的 Taiwan Drone 100 無人機群飛表演技術，致力於無人機群飛及自主飛控系統等無人機關鍵技術開發，並於 2019 年 8 月基於 Taiwan Drone 100 之技術及團隊成立臺灣希望創新股份有限公司，致力於無人機研發、展演、教育、服務等四大領域，努力成為臺灣無人機產業的推手。近年來更推動公司轉型為非紅無人機關鍵零組件及 AI 無人載具技術研發公司，並積極推動臺灣無人機產業國產化、智能化，利用臺灣的半導體、精密機械及資通訊產業優勢進軍國際市場。",
    agenda: "當 AI 翼展天際：無人機的創新、應用與未來",
    summary: "當人工智慧擁有翅膀，無人機便不再只是遙控飛行的工具，而是能自主感知、分析環境、協同作業並執行任務的智慧載具。\n本次演講以臺灣希望創新股份有限公司的發展經驗為基礎，從百架無人機群飛展演出發，分享企業如何將自主飛控、群控演算法、AI影像辨識與系統整合等技術，逐步延伸至太陽能電廠、橋梁、高科技廠房等智慧巡檢場域，以及公共安全、防災救援、低空經濟與國防自主等前瞻應用。\n演講也將探討AI如何推動無人機從「被操控的飛行器」走向能夠自主決策、群體協作的智慧系統，並從技術創新、商業模式、供應鏈安全與產業生態系等面向，解析臺灣無人機產業面臨的機會與挑戰。\n透過實際創業與產業應用經驗，本次演講將帶領聽眾看見：當AI翼展天際，無人機不僅改變我們觀察世界與執行任務的方式，也將成為推動智慧城市、產業升級與科技自主的重要力量。",
    intro: "以臺灣希望創新的無人機群飛與研發經驗為基礎，分享自主飛控、群控演算法與 AI 影像整合技術，探討無人機如何從操控飛行邁向自主決策智慧系統，並解析產業機會與關鍵挑戰。",
    level: "Normal - 需相關基礎知識",
    track: "Software Defined Reality",
    class: "AI, UXV (Unmanned x Vehicle), Robotics"
  },
  {
    id: "2026_Kuon-Ding",
    name: "Kuon Ding",
    role: "CTO",
    org: "Funny Systems",
    bio: "Kuon，現任職於法泥系統。\n\n關心各種 「安全技術」，喜愛研究和解決問題，包含系統軟體、網路協定、網站應用、解密實務，所有想學習的一切，都圍繞著 「安全技術」 為中心。\n\n相信建立好的防守，比攻擊更困難。",
    img: "assets/img/speakers/kuon_ding_sliced.png",
    link: "https://www.smallcrows.org/",
    agenda: "自主飛行的決策系統 - 從態勢感知到語意理解",
    summary: "假設無人機已經會飛\n\n但是如何應對複雜情境？\n\n從遙控到自主\n\n如何實現技能轉移？\n\n當代語言模型的成熟度\n\n要如何賦與無人載具智慧？\n\n有哪些關卡要克服？\n\n一一道來",
    intro: "探討無人機面對複雜情境時，如何從傳統遙控跨越至自主飛行決策。結合現代大型語言模型與語意理解技術，解析賦予無人載具智慧決策能力的技能轉移途徑與關鍵克服難題。",
    level: "Expert - 建議聽眾具備相關經驗",
    track: "Software Defined Reality",
    class: "AI, UXV (Unmanned x Vehicle)"
  },
  {
    id: "2026_蕭漢威",
    name: "蕭漢威",
    role: "副教授",
    org: "國立高雄大學資訊管理學系",
    bio: "從事網路安全與管理、無人載具開發、物聯網應用、無人機偵測技術等多方面技術研究，並曾經協助國內災害救助，包括利用自組無人載具快速探勘高雄氣爆事件，近年來發展高空氦氣飛船載具自主飛行技術，將學術技術轉化為實質防災能量",
    img: "assets/img/speakers/hanwei_sliced.jpg",
    link: "https://www.facebook.com/xiao.han.wei.117741,https://im.nuk.edu.tw/p/404-1038-99300.php?Lang=zh-tw",
    linkText: "Facebook,Website",
    agenda: "無人飛船：長期滯空載具的基礎原理與自主飛控實務經驗",
    summary: "在無人載具續航力備受挑戰的時代，擁有長期滯空優勢的無人飛船，提供了一種不同的空中探索解決方案。本次演講將介紹研發團隊多年在無人飛船發展的經驗，並分享從零打造自主導航系統時的實務歷程與開發經驗。",
    intro: "針對無人載具續航力瓶頸，介紹具備長期滯空優勢的無人飛船基礎原理。分享研發團隊多年深耕經驗，解析從零打造自主導航與飛控系統的實務歷程，展現空中探索的新型解決方案。",
    level: "Basic - 基礎入門",
    track: "Software Defined Reality",
    class: "UXV (Unmanned x Vehicle)"
  },
  {
    id: "2026_Cherie-Hsieh",
    name: "Cherie Hsieh",
    role: "副理",
    org: "台灣積體電路製造股份有限公司",
    bio: "跨領域轉職人，目前擔任軟體開發管理職，除了是 Gopher 之外，也喜歡研究電腦架構與效能改善等議題。",
    img: "assets/img/speakers/Cherie-Hsieh.jpg",
    link: "",
    agenda: "當專案 100% 都由 AI coding，身為工程師和管理職的價值在哪裡？",
    summary: "回顧 2026 年團隊導入 AI 開發的實戰歷程，透過真實案例剖析過往最佳實踐為何反成效率瓶頸及應對之道。同時從工程師與管理者雙視角，探討當寫 Code 不再是瓶頸時，開發者的重心轉移，與管理職的招募、派工及品管新策略。",
    intro: "本次分享將回顧 2026 年初至年底，團隊在實際專案中導入 AI 開發的歷程。我們將透過真實案例，探討為什麼某些過去被視為最佳實踐的流程，反而隨著 AI 能力演進成為效率瓶頸，以及團隊如何持續調整工作方式。\n\n另外，我們將從工程師與管理者的雙重視角，探討 AI 導入後的角色轉變。當程式碼的產出不再是主要瓶頸，工程師應該將注意力轉向何處？管理者又該如何重新思考人才招募方向、工作分配、品質控管與團隊能力的培養？",
    level: "Normal - 需相關基礎知識",
    track: "AI in Action",
    class: "AI, DevOps, Management"
  },
  {
    id: "2026_高見龍",
    name: "高見龍",
    role: "負責人",
    org: "五倍學院",
    bio: "網站程式開發者 / 講師 / 遊戲宅 / 漫畫宅，喜愛非主流的新玩具，著有《為你自己學 Git》、《為你自己學 Python》以及《為你自己學 Ruby on Rails》等暢銷書籍。\n\n是個喜歡寫程式而且希望可以寫一輩子程式的電腦阿宅！",
    img: "assets/img/speakers/eddie_sliced.jpg",
    link: "https://kaochenlong.com/",
    agenda: "SDD 工作迴圈設計拆解",
    summary: "用 Claude Code、Codex 這類 coding agent 寫程式，你可能遇過做到一半它忘了前面講好的設計、東西沒做完就說做完了、測試沒跑就說過了、放了幾個禮拜再回來它還照著過期的計畫改。這些多半是它跑的那個工作迴圈沒設計好。\n\n我自己寫了一套 Spec-Driven Development（SDD）工具，今年幾個產品都用它做，連這套工具本身也是，這個迴圈加起來跑了將近一千四百輪。我會拿執行任務的那份 skill 出來講，看它怎麼處理這些狀況，哪些靠 prompt、哪些靠 CLI。進度誰說了算、忘了怎麼辦、失敗怎麼分類、做完怎麼驗、中斷後怎麼繼續、多個 subagent 一起做時誰能改狀態。這些問題拿回自己的專案照樣能問。",
    intro: "剖析 Coding Agent 在實務開發中常見的失控與遺忘問題，拆解歷經上千輪運作的規格驅動開發（SDD）工作迴圈。探討如何透過 Prompt、CLI 與流程固化，確保 Agent 交付精確成果。",
    level: "Normal - 需相關基礎知識",
    track: "Next-Gen Intelligence",
    class: "AI"
  },
  {
    id: "2026_zonble",
    name: "zonble",
    role: "軟體工程師",
    org: "Noetiq Inc",
    bio: "軟體工程師",
    img: "assets/img/speakers/zonble.jpg",
    link: "https://x.com/zonble",
    linkText: "X @zonble",
    agenda: "跟著AI 做一套AI 時代的台灣式編輯器",
    summary: "文字 prompt 仍然是我們與 AI 互動的主要方式，但文字 prompt 並不是一個單向的過程，我們往往需要將 AI 產生的內容，經過修改之後回饋給 AI，來來回回之後，才完成最後的作品。AI 產生文字內容的方式與人類不同，不受到人類慣用的編輯器的限制，經常大量產生流行的編輯器難以編輯的文字圖，我們使用 AI 是為了追求效率，但為了文字圖類型的 prompt，我們反而在不順手的編輯器上進行低效的編輯。\n\n我做了一套強調 2D 文字繪圖的跨平台終端機編輯器，當中包含一套直譯式語言的直譯器。在這段過程中，我從 AI 學到做出一套編輯器會遇到的挑戰，Swift 語言在 Windows/Linux/WASM 平台上開發應用程式的現狀，AI 擅長什麼與不擅長什麼。",
    intro: "分享打造一套強調 2D 文字繪圖的跨平台終端機編輯器與直譯器的歷程，探討人機協作應對非結構化文字輸入的挑戰，並解析 Swift 跨平台開發架構與 AI 輔助開發的優勢與邊界。",
    level: "Basic - 基礎入門",
    track: "AI in Action",
    class: "AI"
  },
  {
    id: "2026_鄭聖文",
    name: "鄭聖文",
    role: "軟體工程師",
    org: "不公開",
    img: "assets/img/speakers/Sheng-Wen_Cheng.jpg",
    link: "https://www.linkedin.com/in/shengwen-tw,https://shengwen-tw.github.io/",
    linkText: "LinkedIn,Github",
    bio: "鄭聖文是一名軟體工程師，現任職於美商科技公司，長期投入底層軟體開發與系統研究，專注領域橫跨機器人系統、控制演算法與即時系統。\n\n他長期研究無人機底層系統與相關演算法，並持續參與開放原始碼社群及專案貢獻。其研究所期間設計的無人機飛控成果，曾透過指導教授主持的產學合作計畫授權予國家太空中心；此外，他亦曾於 Linux Foundation 主辦的 Open Source Summit 發表開源相關技術成果。",
    agenda: "Learning to Fly in Simulation: Quadrotor Reinforcement Learning from First Principles",
    summary: "This talk explores quadrotor reinforcement learning from first principles, with a focus on how reinforcement learning algorithms interact with a flight simulator.\n\nWe will begin by formulating quadrotor flight as a reinforcement learning problem, looking at how observations, actions, and rewards define the interaction between an agent and the simulated vehicle. From there, we will introduce core concepts such as value functions, Q-values, and policy optimization, and connect them to modern policy-gradient methods for continuous-control problems.\n\nThe talk will also examine the systems side of reinforcement learning. We will discuss how parallel rollouts allow many simulated quadrotors to collect experience simultaneously, how rigid-body dynamics can be expressed as batched tensor operations in PyTorch, and how GPU acceleration changes the simulation and training workflow compared with traditional single-environment simulation.\n\nThe examples are based on RotorBench, an open-source Python-based quadrotor simulation and control benchmarking framework featuring GPU-accelerated batched rollouts:\n\nhttps://github.com/shengwen-tw/rotor-bench",
    intro: "以第一原理探討四旋翼無人機強化學習與飛行模擬器的整合互動，剖析連續控制任務的策略優化方法。同時解析 GPU 加速批次運算架構與開源 RotorBench 框架的實作經驗。",
    level: "Basic - 基礎入門",
    track: "Software Defined Reality",
    class: "AI, UXV (Unmanned x Vehicle), Robotics"
  },
  {
    id: "2026_allen54a0",
    name: "allen54a0",
    role: "站長",
    org: "UAV 無人機任務規劃與安全討論群",
    img: "assets/img/speakers/Allen_TRANS-Allen-Lin.png",
    bio: "各位朋友大家好，我是有20年以上無人機開發、測試、運用經驗的阿仁，很高興可以跟大家分享無人機開發過程中遇到的問題跟我們曾經嘗試過的方法",
    link: "https://www.facebook.com/groups/1215514938555547",
    linkText: "Facebook",
    agenda: "用AI打造大氣探測無人機",
    summary: "本次分享將介紹一項結合無人機與氣象氣球的大氣探勘任務，全程以AI貫穿任務規劃與落地執行。\n\n內容涵蓋三個關鍵環節：\n\n- 上升段大氣剖面預測\n- 無人機控制Lua腳本撰寫\n- SITL模擬測試驗證\n\n從任務需求出發，到方案設計、模擬驗證，再到實際落地測試，完整呈現AI如何賦能大氣科學領域的無人機應用。",
    intro: "介紹結合無人機與氣象氣球的大氣探勘任務，全程由 AI 貫穿規劃與落地執行。涵蓋大氣剖面預測、Lua 控制腳本編寫與 SITL 模擬驗證，展現 AI 賦能大氣科學探測的完整工程實踐。",
    level: "Normal - 需相關基礎知識",
    track: "Software Defined Reality",
    class: "AI, UXV (Unmanned x Vehicle)"
  },
  {
    id: "2026_Rete-Lin",
    name: "Rete Lin",
    role: "系統工程師",
    org: "品翔航太",
    bio: "在 無人機、嵌入式系統、系統整合 裡載浮載沉的工程師，最大的興趣是看機器跑起來(然後不小心一頭撞上牆..)",
    img: "assets/img/speakers/rete_sliced.jpg",
    link: "https://x.com/Rete_Lin",
    linkText: "X @Rete_Lin",
    agenda: "無人機PX4的架構介紹與實作",
    summary: "帶大家從系統與程式架構面，看看無人機的另一個大家族-PX4，並且實做一個\"樂於分享愛的無人機\"吧!",
    intro: "從系統與程式架構層面深入解析開源無人機飛控體系 PX4 的核心設計，並結合軟硬體整合實作經驗，帶領大家動手實現具備互動特性的無人機應用，掌握無人機底層開發要領。",
    level: "Normal - 需相關基礎知識",
    track: "Software Defined Reality",
    class: "UXV (Unmanned x Vehicle), Robotics"
  },
  {
    id: "2026_Stanley",
    name: "Stanley",
    role: "Engineer Manager",
    org: "ViewSonic",
    img: "assets/img/speakers/stanley_sliced.jpg",
    link: "https://www.linkedin.com/in/stanleyc1982/",
    linkText: "LinkedIn",
    bio: "https://www.linkedin.com/in/stanleyc1982/",
    agenda: "當工程師不再打字寫 code,他在做什麼?——一個人、12 週、17 萬行的 AI Native 開發模式",
    summary: "12 週、一位工程師、17 萬行 C#、5,150 個測試——一個十多年歷史的 Windows 白板 monolith,用 WinUI 3 / .NET 10 從零重寫。而這段時間裡,我真正打字寫 C# 的時間不到 5%。\n\n這場分享不談工具教學,談一條在真實產品上跑了三個月的 AI Native 開發流程,以及它逼我重新理解的四件事:人的工作從寫 code 變成做決策(整條 pipeline 只留 4 個 human gate);spec 與憲法成為新的 source code;品質不再靠人 review,而靠跨家族模型互相抓錯的對抗式結構;最後、也最關鍵的——流程不能只寫成文字期望 AI 遵守,要用 Workflow 與 Hook 把它固化成不可繞過的 code。\n\n剩下的 95%,我在做什麼?決定要做什麼、把判斷寫成文字、設計讓模型互相抓錯的結構、把流程刻成 code——以及不斷優化這條流程、寫小工具,讓自己開發得更舒服。\n\n適合已經在用 AI 寫 code、想從「一個人跟 AI 對話」走到「整條流程由 AI 承擔、人只做決策」的工程師與 tech lead。",
    intro: "分享一人在 12 週內重構 17 萬行大型專案的 AI Native 開發實戰，深入探討工程師轉型為決策者的流程架構，包含規格即源碼、跨模型對抗驗證，以及用工作流固化品質的關鍵實踐。",
    level: "Normal - 需相關基礎知識",
    track: "AI in Action",
    class: "AI"
  },
  {
    id: "2026_Voidful",
    name: "Voidful",
    role: "博士生",
    org: "OpenFormosa",
    bio: "目前是台大博士生，主要研究本土化的語言語言模型",
    img: "assets/img/speakers/Eric-Lam.jpg",
    link: "https://github.com/voidful",
    linkText: "Github",
    agenda: "模型愈來愈大，我們該往哪裡走？2026 本土 AI 的訓練與突圍",
    summary: "2026 年想自己訓練模型，遇到的第一個問題可能不是「模型要多大」，而是「為什麼還要自己訓練？」\n\n新的模型幾乎每個月出現，能力與榜單持續往前推。大型公司有更多 GPU、更多資料，也有更完整的模型與 Agent 生態。如果本土團隊只是跟著同一套 benchmark、同一種模型規模往前追，通常很難靠算力追上。\n\n但實際做模型之後，我們發現仍然有不少問題不能直接交給通用模型解決。台灣華語與台語、在地資料、長文本、語音，以及模型如何使用工具完成真實任務，都可能需要重新處理資料、訓練方法與模型架構。\n\n這場分享會從實際訓練模型踩過的坑出發，談 2026 年我們怎麼重新思考 Pre-training、Post-training、Long Context、Agent、Tool Use 與語音模型。也會談哪些東西現在已經沒有必要從頭訓練，哪些能力反而值得小團隊集中資源自己做。\n\n如果沒有數萬張 GPU，我們需要的可能不是另一個縮小版的大公司模型，而是先回答一個更實際的問題：有哪些問題，大公司沒有理由替我們做好，但我們自己非做不可？",
    intro: "立足在地語言與真實應用場景，探討本土團隊在算力差距下如何找到突圍方向。分享預訓練、後訓練、長文本與工具呼叫的實務經驗，解析資源受限時應專注解決的關鍵本土 AI 課題。",
    level: "Expert - 建議聽眾具備相關經驗",
    track: "Next-Gen Intelligence",
    class: "AI"
  },
  {
    id: "2026_Vic-Wen",
    name: "Vic Wen",
    role: "RD intern",
    org: "Microsoft",
    bio: "Vic Wen 熱衷於探索 AI 與開源技術。現為微軟 RD intern 和 Apache Mahout Committer。除了投入 AI infra 與分散式系統的研究及開發，也活躍於國際開源社群與技術舞台，期望讓技術不只停留在研究與程式碼中，更能透過開放協作創造實際影響力。",
    img: "assets/img/speakers/viiccwen.jpg",
    link: "https://www.linkedin.com/in/viiccwen",
    linkText: "LinkedIn",
    agenda: "Beyond the Agent：當模型越來越強，我們該刪掉什麼、留下什麼？",
    summary: "隨著大型語言模型的能力快速提升，AI Agent 已經能自主規劃任務、呼叫工具，甚至完成複雜的工作流程。然而，當模型越來越聰明，我們真的還需要替 Agent 建立層層堆疊的 Planning、Reflection、Multi-Agent Orchestration 與各種 Harness 機制嗎？哪些設計曾經不可或缺，如今卻可能成為不必要的複雜度？\n\n近年來，Agent Engineering 正在經歷一場轉變：開發者開始重新檢視複雜的 Harness 設計，將更多決策交還給模型。但當 Agent 真正進入 Production，OAuth、權限隔離、API Rate Limiting、Idempotency、Failure Recovery 與 Observability 等問題，並不會隨著模型變得更聰明而自動消失。\n\n本場演講將從各大廠的工程實踐出發，探討模型能力演進如何改變 Agent Harness 的設計取捨，並透過真實的系統失敗情境，解析 Agent 從 Demo 走向 Production 時必須面對的工程挑戰。接著，我們將重新思考 Agent Runtime、MCP 與 Integration Layer 之間的責任邊界，探討如何以更精簡的 Harness，打造安全、可靠且可觀測的 AI Agent 系統。\n\n當模型越來越強，我們需要的或許不是更複雜的 Agent Framework，而是更清楚的系統邊界，以及真正可靠的 Infrastructure。",
    intro: "從大廠實務剖析模型能力演進對 Agent Harness 設計的取捨衝擊，並透過真實失敗情境解析走向 Production 必經的工程挑戰。重新梳理 Runtime、MCP 與整合層邊界，探討如何以精簡架構打造可靠的 AI Agent 系統。",
    level: "Normal - 需相關基礎知識",
    track: "AI in Action",
    class: "AI"
  },
  {
    id: "2026_Abi-Chang",
    name: "Abi Chang",
    role: "AI 應用工程師 / 資深後端工程師",
    org: "Open to Work",
    bio: "寫程式十幾年，主攻 Java 後端，近年專注 AI 應用落地。\n能坐就不站，能躺就不坐，集懶惰美德於一身。\n\n2025 年起在 JCConf、GDG Taichung、國泰高雄 CDC 等場合演講與帶工作坊，主題從 Spring Boot Test、Refactoring 一路到 Text-to-SQL 與 AI Agent。\n\n被兩隻貓咪領養的貓奴，偶爾也會玩玩 AI 影片工作流。\n目前正在尋找全職機會，也歡迎專案合作。",
    img: "assets/img/speakers/AbiChang_.jpg",
    link: "https://abi.tw",
    linkText: "Website",
    agenda: "從存檔到內容富翁：讓個人知識庫自己長出內容",
    summary: "很多人以為知識庫存得越多越好用，我從今年五、六月開始累積自己的知識庫，中間也曾打掉重練，一路累積到現在。\n曾經想用它發想文章，但出來的結果總覺得不對，後來才發現，Input 跟 Output 是二回事。\n這場將分享我現在怎麼用個人知識庫寫出像我自己寫的文章、幫我客製履歷，還有接住一路冒出來的新題目。",
    intro: "打破「知識庫存越多越好用」的迷思，分享建構與重構個人知識庫的實務心得。解析 Input 與 Output 的關鍵差異，探討如何善用知識庫自動發想個人風格文章、客製履歷並接住源源不絕的靈感題目。",
    level: "Basic - 基礎入門",
    track: "AI in Action",
    class: "AI, Knowledge Management"
  },
  {
    id: "2026_陳葵懋(Ian)",
    name: "陳葵懋(Ian)",
    role: "研發部主任工程師",
    org: "一等一科技",
    bio: "任職於一等一科技，同時也是微軟 AI 人工智慧最有價值專家（MVP）與微軟認證講師（MCT）。專注於Azure雲端解決方案、AI、軟體架構與設計，受邀担任公務機關與大學院校AI培訓課程講師、跨國企業AI課程講師，經常於iThome AI & Cloud、Microsoft、Mopcon等研討會分享實務經驗。自2023年起陸續出版多本關於生成式AI與AI Agent的開發書籍，最新一本著作為：AI Agent 奇幻旅程：MCP 通往異世界金鑰。",
    img: "assets/img/speakers/IanChen.jpg",
    link: "https://www.facebook.com/ian.no18",
    linkText: "Facebook",
    agenda: "Code 是 AI 寫的，就真的有一支開發團隊嗎？",
    summary: "AI 已經能幫我們寫 Code、修 Bug、跑測試，但當我們把多個 AI Coding Agent 放在一起，就真的能稱得上一支軟體開發團隊嗎？\n\n從最初使用 VS Code 搭配 GitHub Copilot 輔助開發，到現在轉向 Herdr，嘗試打造一支能夠自主分工、協作與執行開發任務的 AI Agent Team，我逐漸發現，真正的挑戰是如何讓這群 AI Agent 像一支開發團隊一樣有效運作。\n\n這場議程將分享我組建 AI 開發團隊的實戰經驗，包含如何設計 Agent 的角色與職責、建立開發規範與協作流程，讓 Coding、Code Review、資安預檢與測試驗證各司其職。同時，也將實際介紹如何運用 Herdr 指揮多個 AI Agent，進行任務分派、協作與開發管理。一起探索當 AI 從寫程式的助手，變成可以被指揮的開發團隊，我們的軟體開發方式將如何改變? 我們能不能真的躺平了",
    intro: "分享從單兵 Copilot 輔助轉向組建自主協作 AI Agent 開發團隊的實戰經驗。解析角色職責劃分、開發規範與協作流程設計，並透過 Herdr 示範多 Agent 任務分派與管理，探索人機協作的新型軟體開發模式。",
    level: "Normal - 需相關基礎知識",
    track: "AI in Action",
    class: "AI, Web Development, IoT, DevOps"
  },
  {
    id: "2026_工常張-Shawn",
    name: "工常張 Shawn",
    role: "前端工程師",
    org: "海外加密貨幣交易所",
    bio: "工常張 Shawn（張君祥）現任跨國 crypto 交易所的前端工程師，專注於高流量金融產品、前端架構與工程效率。過去亦參與供應鏈 ERP、社群平台與律師事務所 AI 工具開發。工作之外持續打造個人專案，包括累積 6 萬+ 使用者的 Threads 社群分析工具 Threadseeker、3.8 萬+ 使用者的大學科系查詢 LINE Bot。",
    img: "assets/img/speakers/jcshawn19_.jpg",
    link: "https://jcshawn.com",
    linkText: "Website",
    agenda: "Meta.ai 出現前，我怎麼開發 Threads 問答機器人？",
    summary: "2026 年，Meta 開始在 Threads 測試透過 @meta.ai 直接向 AI 提問的功能。但早在 2025 年 4 月，我就自製了一個能在同樣功能的 AI 問答機器人：WenThreads（問脆）。\n\n這個受到 X 平台 Grok 啟發的個人專案，背後為了讓 AI 真正融入社群討論，我透過迭代多次的爬蟲與事件驅動技術，讓機器人以不到一千塊的成本，自動回應了超過 600+ 則網友提問。\n\n這場分享，您將能透過我從零開發 WenThreads 的心路歷程，瞭解如何透過系統設計實現一個類似 X 的 Grok 或 meta.ai 的社群問答 bot，來結合您欲應用 AI 參與社群互動的使用場景中。",
    intro: "分享從零打造 Threads 社群 AI 問答機器人 WenThreads 的實戰心路歷程，解析如何透過爬蟲與事件驅動系統設計，以極低成本讓 AI 深入社群互動，實現自主問答與高流量應用場景。",
    level: "Normal - 需相關基礎知識",
    track: "AI in Action",
    class: "AI, Web Development, ChatBot"
  },
  {
    id: "2026_維元",
    name: "維元",
    role: "社群主理人",
    org: "資料科學家的工作日常",
    bio: "目前是一名擅長網站開發與資料科學的雙棲工程師，熟悉 Python 跟 JavaScript。業餘經營知識性社群「資料科學家的工作日常」，擁有多次大型技術會議講者經驗，持續發表對 #資料科學、 #人工智慧 或 #軟體職涯 議題。",
    img: "assets/img/speakers/v123582_.jpg",
    link: "https://www.facebook.com/v123582",
    linkText: "Facebook",
    agenda: "從 Prompt 到 Production：用 Harness 打造可持續交付的 AI Agent 開發工作流",
    summary: "AI Coding Agent 已經很會寫 Code，但真正的挑戰，是如何讓它穩定參與完整的軟體交付流程。這場分享將從實際案例出發，介紹如何透過 Spec、Evaluator、Human Gate 與 Harness，串起需求、多 Agent 分工、Review、CI/CD 與部署，打造一套模型可替換、流程可持續累積的 AI 開發工作流。",
    intro: "立足實際交付案例，探討如何讓 AI Agent 穩定參與軟體交付全流程。解析透過 Spec、Evaluator、Human Gate 與 Harness 串連需求、多 Agent 分工與 CI/CD 部署，打造可持續累積的 AI 開發工作流。",
    level: "Normal - 需相關基礎知識",
    track: "Next-Gen Intelligence",
    class: "AI, Web Development"
  },
  {
    id: "2026_Caesar",
    name: "Caesar",
    role: "經理",
    org: "正美科技",
    bio: "JavaScript 生態系的長期建設者，從社群、開源、顧問服務一路走進產業現場。為個人化品牌零售打造 AI 製造與供應鏈基礎設施的營運者。目前主要將打造品牌想像與製造現場之間的 AI 營運層。\n\n是一位 AI × 製造營運者，專注打造連接品牌想像、供應鏈協作與工廠現場執行的基礎設施。",
    img: "assets/img/speakers/CaesarChi.jpg",
    link: "https://blog.caesarchi.com/",
    linkText: "Blog",
    agenda: "一句需求到產品實現：如何讓 AI 真正參與製造？",
    summary: "從客戶需求出發，透過問題拆解、規格定義與製程整合，建立清晰的工程邏輯，讓 AI 協助推進開發與製造，將市場需求轉化為可交付的產品。",
    intro: "從客戶端需求出發，探討如何透過問題拆解、規格定義與製程整合建立清晰工程邏輯，讓 AI 協助推進開發與製造現場，將市場需求轉化為高品質的實體交付產品。",
    level: "Basic - 基礎入門",
    track: "Software Defined Reality",
    class: "AI, Web Development, IoT, UI / UX"
  },
  {
    id: "2026_John-Lu",
    name: "John Lu",
    role: "Senior Machine Learning Engineer",
    org: "一線大廠",
    bio: "John 是一線大廠的 Senior Machine Learning Engineer，實務經驗涵蓋大型語言模型 (LLM) 與視覺語言模型 (VLM) 的訓練，以及 RAG 與 AI Agent 的建構。他喜歡拆解事物的底層邏輯，再重組成可執行的程式，應用到真實問題上。曾在 PyCon APAC 與 COSCUP 擔任講者，分享機器學習應用與 On-Device ML，講題包括「TasteGram：以 TensorFlow 與 Python 進行影像美學評分」與「Kimoji：以 On-Device LLM 打造心情日記的智慧撰稿系統」。",
    img: "assets/img/speakers/John-Forge.jpeg",
    link: "https://bit.ly/GrowthMTM",
    linkText: "YouTube",
    agenda: "使用 Unsloth 強化學習微調小模型，建構飲食教練 Agent",
    summary: "隨手拍一張午餐照片，App 就幫你記下「雞腿便當，約 320 大卡、蛋白質 34 公克」。最直覺的做法，是使用一個多模態模大型進行處理，但整天開著跑，又慢又燒錢。\n我們以 Gemma 4 把這位營養教練做成一個多模態 Agent，接著處理真正的難題：怎麼讓它變便宜。做法是依部署的機器選擇模型的大小，用 Unsloth 在免費的 Colab 與 Kaggle GPU 上做後訓練（先 SFT，再用 GRPO 做強化學習），最後用 vLLM 上線提供推論服務。\n過程中，我們會用這個應用走完整個 LLM 生命週期：如何在 Gemma 4 的各種模型大小之間選擇；LLM 的強化學習如何從 PPO、DPO 一路演進到 GRPO，以及為什麼規則式獎勵（rule-based reward）可以取代另外訓練的獎勵模型；還有 vLLM 為什麼快 (PagedAttention、prefix caching、continuous batching 與 speculative decoding)。\n聽完你會知道 SFT 與 RL 的分界在哪：SFT 決定下限，RL 拉高上限。演講示範的所有 Demo，都能在家自己跑！",
    intro: "以 Gemma 4 多模態模型建構飲食教練 Agent，解析如何透過 Unsloth 結合 SFT 與 GRPO 強化學習進行後訓練，並運用 vLLM 達成高性價比推論服務，完整走過開源 LLM 的微調與落地週期。",
    level: "Expert - 建議聽眾具備相關經驗",
    track: "Next-Gen Intelligence",
    class: "AI"
  },
  {
    id: "2026_焉德葳",
    name: "焉德葳",
    role: "CEO",
    org: "BigGo",
    bio: "https://funmula.com/",
    img: "assets/img/speakers/BigGo_Kevin-Yen.jpg",
    link: "https://funmula.com/",
    linkText: "Website",
    agenda: "0c靈犀 - Transformer 神經網路注音輸入法",
    summary: "我們研究可在本機執行的小型 Transformer，處理繁體中文注音輸入法的兩項任務：利用已確認的上下文重新排序同音候選，以及在文字送出時還原標點。我們以包含新聞與財經討論文字、共 12.45 億個漢字的語料，從隨機初始化開始預訓練專用因果模型。在固定模型規模下，將抽樣訓練曝光量從約 900 萬個輸出單位增加至 11.6 億個，使先前已使用過的困難短詞開發集上，僅使用神經模型的正確率從 62.6–63.2% 提升至 76.8–77.1%；統計引擎的正確率為 65.7%。經排序微調與校準後，1,980 萬參數模型在 6,000 例封存測試上的正確率增加 4.92–4.97 個百分點，同時比早期神經基準減少錯誤覆寫。",
    intro: "分享自主研發可在本機執行的小型 Transformer 注音輸入法「0c靈犀」，透過 12.45 億字繁中語料從頭預訓練專用因果模型，解析同音詞重排、標點還原及小模型極致優化實踐。",
    level: "Normal - 需相關基礎知識",
    track: "Next-Gen Intelligence",
    class: "AI"
  },
  {
    id: "2026_Today",
    name: "Today",
    role: "工程師",
    org: "財團法人資訊工業策進會",
    bio: "現任法人機構資深工程師，專長為資料分析與機器學習，長期使用 Python 開發 AI 應用，參與過智慧製造、影像辨識、交通最佳化等專案。近年投入 LLM 應用與 LLMOps 工具開發，關注如何讓 AI 從實驗走進實際工作流程。目前探索 AI Agent 的偏見偵測與自動化測試。喜歡從實際問題出發，將研究想法轉化為工程師用得上的方法與工具。",
    img: "assets/img/speakers/today.jpg",
    link: "https://github.com/stoday",
    linkText: "Github",
    agenda: "從評測到落地：打造 LLM 去偏見與輸出治理工作流",
    summary: "偏見檢測與落差挑戰： 當生成式 AI 走入實際業務與終端應用時，刻板印象與偏見輸出對系統穩定性與信任度帶來的現實衝擊。這裡將分享討論：\n(1) 如何量化評估 LLM 輸出偏差，並進行歸因分析。\n(2) 結合 Prompt 改寫、動態檢測模組與治理防護層（Guardrails），將去偏見機制整合進現有 AI 應用的實戰經驗與開源工具探索。\n(3)  探討在實際工程場景中，如何在模型性能、延遲成本與公平性治理之間取得平衡。",
    intro: "聚焦生成式 AI 落地實務，分享如何量化評估 LLM 輸出偏差並進行歸因分析，解析結合 Prompt 改寫、動態檢測模組與治理防護層（Guardrails）將去偏見機制整合進 AI 應用的實戰經驗與開源工具探索。",
    level: "Basic - 基礎入門",
    track: "Next-Gen Intelligence",
    class: "AI, DevOps"
  }
];

/* ── 贊助級別 ─────────────────────────────────────────────────────────────
   id   ：對應 SPONSORS 裡的 tier
   name ：顯示文字
   size ：卡片大小，只能填 xl / lg / md / sm / xs（級別越高填越大）
   由上到下就是贊助頁的區塊順序。 */
var SPONSOR_TIERS = [
  { id: 'matrix', name: '矩陣級', size: 'lg' },
  { id: 'cloudnative', name: '雲原生級', size: 'md' },
  { id: 'gateway', name: '閘道級', size: 'sm' },
  { id: 'node', name: '節點級', size: 'xs' }
];

/* ── 贊助商 ───────────────────────────────────────────────────────────────
   tier ：級別 id（要對得上 SPONSOR_TIERS 的 id）
   name ：公司名稱
   desc ：一段介紹；填 '' 就只顯示名稱（友情贊助就是這樣）
   logo ：圖檔路徑，例如 'assets/img/sponsors/xxx.png'
   link ：官方網站連結 */
var SPONSORS = [
  {
    tier: 'matrix',
    name: '台灣積體電路製造',
    desc: '',
    logo: 'assets/img/sponsors/png_TSMC-Logo.png',
    link: 'https://www.tsmc.com/chinese'
  },
  {
    tier: 'matrix',
    name: '日月光半導體',
    desc: '',
    logo: 'assets/img/sponsors/ASE_Logotype_2026.png',
    link: 'https://ase.aseglobal.com/ch/about-ase/'
  },
  {
    tier: 'cloudnative',
    name: '國家高速網路與計算中心',
    desc: '',
    logo: 'assets/img/sponsors/NCHC_2025_Logo.png',
    link: 'https://www.nchc.org.tw/'
  },
  {
    tier: 'gateway',
    name: 'KKTIX',
    desc: '',
    logo: 'assets/img/sponsors/KKTIX-logo_green_21_new.svg',
    link: 'https://kktix.com/'
  },
  {
    tier: 'gateway',
    name: '祐生研究基金會',
    desc: '',
    logo: 'assets/img/sponsors/archilife_LOGO_2022.png',
    link: 'https://www.archilife.org/'
  },
  {
    tier: 'node',
    name: '六角學院',
    desc: '',
    logo: 'assets/img/sponsors/hexschool_logo.png',
    link: 'https://www.hexschool.com/'
  },
  {
    tier: 'node',
    name: '易發票',
    desc: '',
    logo: 'assets/img/sponsors/ezreceipt_logo_preview.png',
    link: 'https://www.ezreceipt.cc/'
  }
];

/* ── 主辦單位 ─────────────────────────────────────────────────────────────
   指導單位、主辦法人、主辦社群
*/
var ORGANIZERS = [
  {
    category: '指導單位',
    items: [
      { name: '經濟部產業園區管理局', logo: 'assets/img/gov-bip-logo.png' }
    ]
  },
  {
    category: '主辦法人',
    items: [
      { name: '臺灣產學策進會', logo: 'https://mopcon.org/2024/assets/community/taic.webp' },
      { name: 'KSDA', logo: 'https://mopcon.org/2024/assets/community/ksda.webp' }
    ]
  },
  {
    category: '主辦社群',
    items: [
      { name: 'MOPCON 社群', logo: 'assets/img/logo-stack-ink.svg' },
      { name: 'JSDC 社群', logo: 'assets/img/JSDC.svg' }
    ]
  }
];
