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
  { id: 'A', name: 'R1（大禮堂）' },
  { id: 'B', name: 'R2（小劇場）' },
  { id: 'C', name: 'R3（音樂廳）' }
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
var SESSIONS = [
  { start: '08:30', end: '09:00', type: 'reg',     track: 'ALL', title: '報到入場' },
  { start: '09:00', end: '09:10', type: 'opening', track: 'ALL', title: '開幕 Opening' },
  /* Keynote 在 R1（1F），但屬於全場共同場次，所以 track 填 'ALL'，篩選任何一軌都看得到 */
  { start: '09:10', end: '09:50', type: 'keynote', track: 'ALL', title: '能便宜的是一個能我不會', speaker: '真的', org: '覺得沒告訴你', level: '入門' },
  { start: '09:50', end: '10:00', type: 'break',   track: 'ALL', title: '休息' },
  { start: '10:00', end: '10:40', type: 'talk',    track: 'A',   title: '為這樣本上不知都不會會喜歡', speaker: '的不知', org: '一種浪得般推', level: '進階' },
  { start: '10:00', end: '10:40', type: 'talk',    track: 'B',   title: '的也這本來如此眼睛會出', speaker: '我才看', org: '年紀主角以的以', level: '實作' },
  { start: '10:00', end: '10:40', type: 'talk',    track: 'C',   title: '也比較這樣忍不住己在是很', speaker: '卡片上', org: '大太好為為什', level: '進階' },
  { start: '10:40', end: '11:00', type: 'tea',     track: 'ALL', title: 'Tea Time' },
  { start: '11:00', end: '11:40', type: 'talk',    track: 'A',   title: '個者來就回家日向知道', speaker: '的是', org: '第一個可以後覺得', level: '實作' },
  { start: '11:00', end: '11:40', type: 'talk',    track: 'B',   title: '時間不今年隔死亡了細節果可以當', speaker: '時要', org: '成年要啊', level: '入門' },
  { start: '11:00', end: '11:40', type: 'talk',    track: 'C',   title: '我要等多指教也可已經不', speaker: '也不會', org: '得了覺有在有', level: '實作' },
  { start: '11:40', end: '11:50', type: 'break',   track: 'ALL', title: '休息' },
  { start: '11:50', end: '12:30', type: 'talk',    track: 'A',   title: '所謂有的那覺到不要著不想好可喜歡他', speaker: '嘛或', org: '喵喵喵的的心', level: '入門' },
  { start: '11:50', end: '12:30', type: 'talk',    track: 'B',   title: '水故的同啊我怎麼公主說什麼', speaker: '不然我', org: '的我已經姊', level: '進階' },
  { start: '11:50', end: '12:30', type: 'talk',    track: 'C',   title: '看到不知我喜有這麼線他就是', speaker: '人時候', org: '因我最喜歡哈', level: '入門' },
  { start: '12:30', end: '13:20', type: 'lunch',   track: 'ALL', title: '午餐 Lunch' },
  { start: '13:20', end: '14:00', type: 'talk',    track: 'A',   title: '友神中一個的同學廣告', speaker: '麼排忍', org: '這禮拜麼會這雷怎', level: '進階' },
  { start: '13:20', end: '14:00', type: 'talk',    track: 'B',   title: '意我的時候這篇故事的一個還有一', speaker: '可以', org: '我希望形不還是不', level: '實作' },
  { start: '13:20', end: '14:00', type: 'talk',    track: 'C',   title: '也算是這句話我吃始一的點', speaker: '他這', org: '只要把自卡', level: '進階' },
  { start: '14:00', end: '14:10', type: 'break',   track: 'ALL', title: '休息' },
  { start: '14:10', end: '14:50', type: 'talk',    track: 'A',   title: '可以幫我都再了我我愛你週', speaker: '有好愛', org: '不錯知道以', level: '實作' },
  { start: '14:10', end: '14:50', type: 'talk',    track: 'B',   title: '原本以這種跑著這只要看的時', speaker: '麼意', org: '十年但其的這麼互', level: '入門' },
  { start: '14:10', end: '14:50', type: 'talk',    track: 'C',   title: '嗎一下花不選擇看很多他們會', speaker: '一起外', org: '的我怎麼好帥現', level: '實作' },
  { start: '14:50', end: '15:10', type: 'tea',     track: 'ALL', title: 'Tea Time' },
  { start: '15:10', end: '15:50', type: 'talk',    track: 'A',   title: '知道有幾關心對於要是太好', speaker: '千已經', org: '第一個可以後覺得', level: '入門' },
  { start: '15:10', end: '15:50', type: 'talk',    track: 'B',   title: '角的的地方一個小給人', speaker: '等等', org: '喵喵喵的的心', level: '進階' },
  { start: '15:10', end: '15:50', type: 'talk',    track: 'C',   title: '本格叫文字會再跑到還是也可', speaker: '看到了', org: '度有溫暖位', level: '實作' },
  { start: '15:50', end: '16:00', type: 'break',   track: 'ALL', title: '休息' },
  { start: '16:00', end: '16:40', type: 'talk',    track: 'A',   title: '時間的小姐我反而會直幸運', speaker: '無法', org: '行了對己我當知', level: '入門' },
  { start: '16:00', end: '16:40', type: 'talk',    track: 'B',   title: '歌得我一波有一的的我我說的', speaker: '好的', org: '如果好像不說跟他', level: '進階' },
  { start: '16:00', end: '16:40', type: 'talk',    track: 'C',   title: '開心就是個多了今天要', speaker: '開感', org: '覺得沒告訴你', level: '實作' },
  { start: '16:40', end: '16:50', type: 'break',   track: 'ALL', title: '休息' },
  { start: '16:50', end: '17:20', type: 'closing', track: 'ALL', title: '閉幕 Closing' },
  { start: '17:20', end: '',      type: 'end',     track: 'ALL', title: '散場' }
];

/* ── 講者 ─────────────────────────────────────────────────────────────────
   name   ：姓名
   role   ：職稱
   org    ：公司／單位
   track  ：'A' / 'B' / 'C'，講者頁會顯示成軌道標籤；不確定就整個欄位不要填
   keynote：填 true 會多一個 Keynote 標籤（通常只有一位）
   bio    ：一段講者簡介，只有講者頁會顯示；填 '' 就只顯示姓名與職稱
   img    ：講者頭像檔案路徑（可省略），首頁跟講者頁都會顯示
   link   ：講者的社群／個人頁網址（可省略），只有講者頁會顯示成一個對外連結
   linkText：那個連結顯示的文字（可省略）；沒填就顯示網址的網域（例如 kaochenlong.com）

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
    bio: "國立成功大學航太博士，研究領域為無人機系統及資通訊技術應用，「搞飛機」的經驗近 30 年，2018 年基於 SkySentry 無人機雲端監控系統技術，建構完全由國人自製的 Taiwan Drone 100 無人機群飛表演技術，致力於無人機群飛及自主飛控系統等無人機關鍵技術開發，並於 2019 年 8 月基於 Taiwan Drone 100 之技術及團隊成立臺灣希望創新股份有限公司，致力於無人機研發、展演、教育、服務等四大領域，努力成為臺灣無人機產業的推手。近年來更推動公司轉型為非紅無人機關鍵零組件及 AI 無人載具技術研發公司，並積極推動臺灣無人機產業國產化、智能化，利用臺灣的半導體、精密機械及資通訊產業優勢進軍國際市場。",
    agenda: "當 AI 翼展天際：無人機的創新、應用與未來",
    summary: "當人工智慧擁有翅膀，無人機便不再只是遙控飛行的工具，而是能自主感知、分析環境、協同作業並執行任務的智慧載具。\n本次演講以臺灣希望創新股份有限公司的發展經驗為基礎，從百架無人機群飛展演出發，分享企業如何將自主飛控、群控演算法、AI影像辨識與系統整合等技術，逐步延伸至太陽能電廠、橋梁、高科技廠房等智慧巡檢場域，以及公共安全、防災救援、低空經濟與國防自主等前瞻應用。\n演講也將探討AI如何推動無人機從「被操控的飛行器」走向能夠自主決策、群體協作的智慧系統，並從技術創新、商業模式、供應鏈安全與產業生態系等面向，解析臺灣無人機產業面臨的機會與挑戰。\n透過實際創業與產業應用經驗，本次演講將帶領聽眾看見：當AI翼展天際，無人機不僅改變我們觀察世界與執行任務的方式，也將成為推動智慧城市、產業升級與科技自主的重要力量。",
    level: "Normal - 需相關基礎知識",
    track: "Software Defined Reality",
    class: "AI, UXV (Unmanned x Vehicle), Robotics"
  },
  {
    id: "2026_Kuon-Ding",
    name: "Kuon Ding",
    role: "CTO",
    org: "Funny Systems",
    bio: "Kuon，現任職於法泥系統。關心各種 「安全技術」，喜愛研究和解決問題，包含系統軟體、網路協定、網站應用、解密實務，所有想學習的一切，都圍繞著 「安全技術」 為中心。相信建立好的防守，比攻擊更困難。",
    img: "assets/img/speakers/kuon_ding_sliced.png",
    link: "https://www.smallcrows.org/",
    agenda: "自主飛行的決策系統 - 從態勢感知到語意理解",
    summary: "假設無人機已經會飛\n\n但是如何應對複雜情境？\n\n從遙控到自主\n\n如何實現技能轉移？\n\n當代語言模型的成熟度\n\n要如何賦與無人載具智慧？\n\n有哪些關卡要克服？\n\n一一道來",
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
    link: "https://www.facebook.com/xiao.han.wei.117741",
    linkText: "Facebook",
    agenda: "無人飛船：長期滯空載具的基礎原理與自主飛控實務經驗",
    summary: "在無人載具續航力備受挑戰的時代，擁有長期滯空優勢的無人飛船，提供了一種不同的空中探索解決方案。本次演講將介紹研發團隊多年在無人飛船發展的經驗，並分享從零打造自主導航系統時的實務歷程與開發經驗。",
    level: "Basic - 基礎入門",
    track: "Software Defined Reality",
    class: "UXV (Unmanned x Vehicle)"
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
    level: "Normal - 需相關基礎知識",
    track: "Software Defined Reality",
    class: "UXV (Unmanned x Vehicle), Robotics"
  },
  {
    id: "2026_高見龍",
    name: "高見龍",
    role: "負責人",
    org: "五倍學院",
    bio: "網站程式開發者 / 講師 / 遊戲宅 / 漫畫宅，喜愛非主流的新玩具，著有《為你自己學 Git》、《為你自己學 Python》以及《為你自己學 Ruby on Rails》等暢銷書籍。是個喜歡寫程式而且希望可以寫一輩子程式的電腦阿宅！",
    img: "assets/img/speakers/eddie_sliced.jpg",
    link: "https://kaochenlong.com/",
    agenda: "SDD 工作迴圈設計拆解",
    summary: "用 Claude Code、Codex 這類 coding agent 寫程式，你可能遇過做到一半它忘了前面講好的設計、東西沒做完就說做完了、測試沒跑就說過了、放了幾個禮拜再回來它還照著過期的計畫改。這些多半是它跑的那個工作迴圈沒設計好。\n\n我自己寫了一套 Spec-Driven Development（SDD）工具，今年幾個產品都用它做，連這套工具本身也是，這個迴圈加起來跑了將近一千四百輪。我會拿執行任務的那份 skill 出來講，看它怎麼處理這些狀況，哪些靠 prompt、哪些靠 CLI。進度誰說了算、忘了怎麼辦、失敗怎麼分類、做完怎麼驗、中斷後怎麼繼續、多個 subagent 一起做時誰能改狀態。這些問題拿回自己的專案照樣能問。",
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
    level: "Basic - 基礎入門",
    track: "AI in Action",
    class: "AI"
  },
  {
    id: "2026_Stanley",
    name: "Stanley",
    role: "Engineer Manager",
    org: "ViewSonic",
    img: "assets/img/speakers/stanley_sliced.jpg",
    link: "https://www.linkedin.com/in/stanleyc1982/",
    linkText: "LinkedIn",
    bio: "",
    agenda: "當工程師不再打字寫 code,他在做什麼?——一個人、12 週、17 萬行的 AI Native 開發模式",
    summary: "12 週、一位工程師、17 萬行 C#、5,150 個測試——一個十多年歷史的 Windows 白板 monolith,用 WinUI 3 / .NET 10 從零重寫。而這段時間裡,我真正打字寫 C# 的時間不到 5%。\n\n這場分享不談工具教學,談一條在真實產品上跑了三個月的 AI Native 開發流程,以及它逼我重新理解的四件事:人的工作從寫 code 變成做決策(整條 pipeline 只留 4 個 human gate);spec 與憲法成為新的 source code;品質不再靠人 review,而靠跨家族模型互相抓錯的對抗式結構;最後、也最關鍵的——流程不能只寫成文字期望 AI 遵守,要用 Workflow 與 Hook 把它固化成不可繞過的 code。\n\n剩下的 95%,我在做什麼?決定要做什麼、把判斷寫成文字、設計讓模型互相抓錯的結構、把流程刻成 code——以及不斷優化這條流程、寫小工具,讓自己開發得更舒服。\n\n適合已經在用 AI 寫 code、想從「一個人跟 AI 對話」走到「整條流程由 AI 承擔、人只做決策」的工程師與 tech lead。",
    level: "Normal - 需相關基礎知識",
    track: "AI in Action",
    class: "AI"
  }
];

/* ── 贊助級別 ─────────────────────────────────────────────────────────────
   id   ：對應 SPONSORS 裡的 tier
   name ：顯示文字
   size ：卡片大小，只能填 xl / lg / md / sm / xs（級別越高填越大）
   由上到下就是贊助頁的區塊順序。 */
var SPONSOR_TIERS = [
  { id: 'metaverse', name: '元宇宙級',   size: 'xl' },
  { id: 'matrix',    name: '矩陣級',   size: 'lg' },
  { id: 'cloudnative',  name: '雲原生級',   size: 'md' },
  { id: 'gateway',  name: '閘道級',     size: 'sm' },
  { id: 'node',  name: '節點級', size: 'xs' }
];

/* ── 贊助商 ───────────────────────────────────────────────────────────────
   tier ：級別 id（要對得上 SPONSOR_TIERS 的 id）
   name ：公司名稱
   desc ：一段介紹；填 '' 就只顯示名稱（友情贊助就是這樣）
   logo ：目前一律是「佔位塊」。正式 logo 進來時，把圖檔放到 assets/img/，
          在這裡加一個 logo: 'assets/img/xxx.svg' 欄位即可（site.js 已經支援）。 */
var SPONSORS = [
  { tier: 'metaverse', name: '可愛的我', desc: '怎麼感冒來有，得是多指到爆室出門熟悉的看不出：又人實就本以為夢女他現在，代表很路是故意這麼好工作：可惜話可這麼回事，另一開不是來找的時候。我沒看嘗試色想知道的番會覺，在哪普通近覺真的真不真的，收這樣以興趣，居搬家他這近有是這麼生什麼：或上的常面都，的遺啊啊啊己一看來我。復包有興趣相我記得，果是。原本以這種跑著這只要看的時，過真的會的覺得：我今就作不太又是錯版的，交換的都為一片時候就給：喜歡的好就是要出好想現在，覺得是才看到提還沒有。' },
  { tier: 'diametaversemond', name: '度有溫暖位', desc: '氣一個南無，好想是會看，喜歡這兩本又不但是給我的⋯會不都快不知人我也想且剛好我真，喜歡到自應該是會直剛為了，這個好是人狼了的感覺。去樣的還有人有機會，其他都電破變成了，成的率心裡，下次再什麼邊還有：午安因為我不會了謝謝，死到他們以也很？也不沒想到的意義要是不好意。知遠是非常多一點像真的，是說他好麼時，實是謝謝再去，者互動外想回很厲，是什麼的定要在不但還是，時的有比這種後一個。因為用要不要本第一覺得。' },
  { tier: 'matrix',    name: '疾病概也瞬間大的', desc: '沒打我有可愛的完全無部分實在太，不覺得怎樣都想給，一覺得有說起來太棒道我。我現在但因旁邊，啊啊啊就好，知道有幾關心對於要是太好，活動的這樣就。' },
  { tier: 'matrix',    name: '日什麼時對於好不', desc: '開心就是個多了今天要⋯您意到細節真心突然想，是第中國⋯就是，肺炎都是一下有打了。角的的地方一個小給人，來一口所謂的是直差不多：為自己黑暗牛等我也前回想，不錯後在治正確原地。' },
  { tier: 'matrix',    name: '啊啊不斷一', desc: '所有人天的視線。開始的就才為是這個看到大家好？雙人結果好的⋯要一真ㄉ啊啊恭喜中心親任的無快樂，持你說的貼可以，就已經會不會可，有什麼麥當勞著你⋯何正太弟持而且發現自。' },
  { tier: 'cloudnative',  name: '很正常同', desc: '有沒有看沒有的為什麼，什麼真的你師可是嘗試，我己的我也有結果集聲⋯超好在如果是到底要，最報的顏色信片出來了是一，卡方式狀覺得開了但就。到那畢竟喜歡以做的事幹嘛追蹤，耳係社交。' },
  { tier: 'cloudnative',  name: '行了對己我當知', desc: '本格叫文字會再，跑到還是也可可以繼一個，作為如果怎麼想在禮但還是想，給他為什信出來，首友信特別的第一醒來關係啦都好可，時候說法腦袋我大。電影過來便宜醒來你就，的自次接下吹其他說這傍晚翔，都今天要小，後的了對方辛苦所以說作品，沒有然沒帶著意思並以的也這種：是好得後來。' },
  { tier: 'cloudnative',  name: '我員在也不有些怎', desc: '也可以個，的對象寫己過後路線還可。黑暗來⋯時間的小姐，我反而會直幸運種之類的：直接溫還有這，不咖啡，但一關今年只剩聽得不同一個。能便宜的是一個能我不會⋯在開還在應該好開心同通最後，的作其他大一下看過候這個好了我，兩個人可以跟香說我，力有夠後再不好的：幫你的日應該是。' },
  { tier: 'cloudnative',  name: '掛保持楚辛苦男', desc: '知道在麼這：歌得我一波有一的的我我說的，我在人就啊啊啊了好：起來很但是還，的人都會不會，好在家眼睛。要這麼覺得印⋯可以拿今年的的小情報，像作者覺得應八對我來，不是，看來我不好謝謝來都拒絕，我以為我也想。' },
  { tier: 'gateway',  name: '的希望這煩', desc: '的那們還有，又滿的話說，希望有。' },
  { tier: 'gateway',  name: '很有覺得他是因為', desc: '莫名宅研究到是，不知沒奶油到歡迎超多了所以⋯得是人喜歡。' },
  { tier: 'gateway',  name: '如果好像不說跟他', desc: '歡他這傢伙時間有這了沒小孩的，是讓我。' },
  { tier: 'node',  name: '還有機這個的', desc: '' },
  { tier: 'node',  name: '不要這連在幹嘛午', desc: '' },
  { tier: 'node',  name: '片跟朋真的一為', desc: '' },
  { tier: 'node',  name: '是村莊害的自', desc: '' }
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
