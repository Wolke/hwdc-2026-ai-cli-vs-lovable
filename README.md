# HWDC 2026：通用 AI CLI vs. 場景專用 AI

**以 Lovable Web 開發為例的效能實測**

使用同一份短提示與 70 筆 HWDC 公開議程附件，在 Lovable 與自選通用 AI 工具各做一版「研討會議程收藏器」，再加入收藏衝堂提示。比較時同時記錄完成度、時間、用量及修改成本。**UX 邏輯一致，UI 由學員或 Agent 自由發揮**，不要求配色、版型或像素相同。

- 講師：林建宏（Wolke Lin），[Medium](https://medium.com/@wolkesau)
- 時間：2026/10/14 13:30–15:00，13:00–13:30 環境準備
- [HWDC 官方議程](https://hwdc.ithome.com.tw/2026/lab/4996)
- 講師示範使用 Codex 桌面 App，CLI 對應操作收錄於簡報附錄

## 先從這裡開始

在 GitHub 選 **Code > Download ZIP** 並解壓縮，或使用：

```sh
git clone https://github.com/Wolke/hwdc-2026-ai-cli-vs-lovable.git
cd hwdc-2026-ai-cli-vs-lovable
```

使用瀏覽器開啟根目錄的 **[開始這裡.html](開始這裡.html)**。教材首頁包含講義、提示詞、15／5 分鐘計時器、投影片預覽與可離線操作的參考版本。HTML 需下載到本機後開啟，GitHub 檔案頁不會直接執行教材。

| 要做什麼 | 入口 |
|---|---|
| 取得兩日議程附件 | [70 筆公開議程 JSON](HWDC-workshop/materials/hwdc-agenda-2026.json) |
| 閱讀學員步驟、提示與驗收 | [學員講義](HWDC-workshop/materials/student-handout.md) |
| 準備講課、示範與備援 | [講師手冊](HWDC-workshop/materials/instructor-guide.md) |
| 編輯投影片 | [38 頁 PPTX，含逐頁講者備註](HWDC-2026-workshop-v3.pptx) |
| 閱讀逐頁講稿 | [講者備註](HWDC-workshop/materials/speaker-notes.md) |
| 先做不使用 AI 的限時開發 | [手工實測起始包](HWDC-manual-baseline-starter.zip) |
| 記錄工具條件與結果 | [實測紀錄表](HWDC-workshop/materials/measurement-template.md) |

講義同時提供 Markdown 與可列印 HTML。投影片的固定版面預覽位於 `HWDC-workshop/slides/index.html`。PPTX 使用 Heiti TC／Menlo 字體，投影前請確認本機字體及版面。

## 課前準備

1. 準備筆電、瀏覽器、網路，登入 Lovable 與自己的通用 AI 工具。
2. 安裝 Node.js 24，確認 `node --version` 與 `npm --version` 可執行。
3. 先安裝起始專案的套件並確認空白頁可啟動。首次安裝需要網路。
4. 查看 Lovable 可用額度。**若今天的 5 點已用完，現場由講師私下提供群組加入方式。** 加入後確認能繼續實作；仍無法建置時使用離線參考版本驗收。

講師介紹依本人 Medium 公開資料整理：Google Developer Expert、LINE Expert、技術書作者，持續分享 AI 人機協作、提示工程與程式開發教學。[自介與來源](HWDC-workshop/evidence/sources.md)

## 啟動本機實作

先複製 `HWDC-workshop/starter` 作為自己的實驗目錄，保留一份空白起點。在該目錄開啟終端機：

```sh
npm ci
npm run dev
```

開啟終端機顯示的網址，看到「環境已就緒」即可。起始專案採 React、TypeScript、Vite，只提供空白頁、工具鏈與真實議程快照。

兩套工具使用相同的需求正文，僅調整環境指示：

- [Lovable 初版提示](HWDC-workshop/materials/prompt-lovable-v1.txt)，資料另以上傳 [JSON 附件](HWDC-workshop/materials/hwdc-agenda-2026.json) 提供
- [Codex 初版提示](HWDC-workshop/materials/prompt-codex-v1.txt)，指定相同資料的本機檔案
- [第二輪修改提示](HWDC-workshop/materials/prompt-revision-v2.txt)
- [除錯提示範本](HWDC-workshop/materials/prompt-debug.txt)

不要把第一套工具產生的程式直接帶入第二套工具。手工實測請先完成限時開發，再查看參考解答。

初版短提示只說明想做的事、必要使用行為和預覽需求。詳細欄位放附件、驗收條件放講義，操作後發現問題再用人話補充。

## 實作目標

第一版包含議程清單、名稱或講者搜尋、日期與主題篩選、加入與取消收藏、我的議程，以及重新整理後保留收藏。繁體中文介面需在桌面與約 390px 的手機寬度完成核心操作。[第一版需求](HWDC-workshop/materials/requirements-v1.md) · [A1–A6 驗收](HWDC-workshop/materials/acceptance-v1.md)

第二版比較全部收藏，提示時間重疊的議程，保留使用者的收藏決定。部分重疊、完全包含、相同時段都算衝堂，首尾相接不算；不同日期的相同鐘點也不算。取消收藏後立即更新，搜尋與篩選不影響衝堂判斷。[第二版需求與 B1–B6 驗收](HWDC-workshop/materials/requirements-v2.md)

```ts
a.start < b.end && b.start < a.end
```

時間需先轉成可比較的值。資料採含 `+08:00` 的 ISO 格式，畫面以台北時間顯示。參考解答以議程 ID 陣列存入 localStorage，兩版鍵名一致。學員作品可自行設計儲存方式，修改後必須保留原有收藏。

## 90 分鐘流程

| 時間 | 內容 |
|---|---|
| 13:30–13:45 | 成品、共同需求、驗收與實測規則 |
| 13:45–14:05 | Lovable 示範、初版實作與驗收 |
| 14:05–14:25 | 通用 AI 工具示範、初版實作與驗收 |
| 14:25–14:40 | 兩套工具各修改一次，檢查衝堂與回歸 |
| 14:40–14:55 | 討論完成度、工時、用量、維護觀察與選型 |
| 14:55–15:00 | Q&A |

每條路徑的初版最多 **15 分鐘**，修改最多 **5 分鐘**，均包含驗收。帳號登入、套件安裝與環境設定另計。截止仍未完成時保存當下成果與通過項目。

## 參考答案與離線備援

| 目錄 | 內容 |
|---|---|
| [reference-v1](HWDC-workshop/reference-v1/) | 搜尋、篩選、收藏與本機儲存 |
| [reference-v2](HWDC-workshop/reference-v2/) | 第一版功能，加上收藏衝堂提示 |
| [offline](HWDC-workshop/offline/) | 已包含程式與樣式的單檔 HTML，下載後可離線操作 |
| [screenshots](HWDC-workshop/screenshots/) | 參考程式的實際操作畫面 |
| [materials](HWDC-workshop/materials/) | 資料、規格、提示、講義、驗收與紀錄表 |
| [evidence](HWDC-workshop/evidence/) | 功能驗證、版本資訊、來源及實測資料狀態 |

在任一參考專案目錄執行：

```sh
npm ci
npm run dev
```

停止開發伺服器後，或另開終端機執行檢查：

```sh
npm test
npm run build
```

先完成自己的實驗，再閱讀參考答案。兩版均保留相同的 localStorage 鍵名；驗證跨版本收藏保存時，需依序使用同一瀏覽器、相同網址與埠號。直接開啟 HTML 檔案時，localStorage 支援依瀏覽器而異。

若啟動問題超過 2 分鐘，保存錯誤並切換離線版本，繼續驗收及下一個教學步驟。使用講師提供群組或參考版本時，在紀錄中註明來源。

## 實測資料狀態

目前 **70 筆真實議程＋短提示＋自由 UI 的新版比較尚未獨立重測**。[measurements.json](HWDC-workshop/evidence/measurements.json) 缺值保留 `null`。簡報第 25 頁呈現 [上次舊條件彩排觀察](HWDC-workshop/evidence/rehearsal-observations.md)：兩套最後都能完成，Codex 初版 1 分 55 秒、修改 1 分 3 秒；Lovable 初版 4 分 22 秒、修改核心驗收 3 分 33 秒，精確手機尺寸於截止後補測。這輪用長提示與 12 筆合成資料，操作者看過解答且第二輪交錯操作，不能當成新版結果或工具排名。

參考解答由 Codex 協助製作，新版功能 QA 已涵蓋搜尋與篩選、收藏保存、跨版本保存、衝堂邊界與 390px 手機操作；兩個專案測試與建置通過。離線 HTML 已重新產生，這次未重跑斷網瀏覽器驗證。[功能驗證紀錄](HWDC-workshop/evidence/reference-qa.json) 不能代替三方效能實測。課堂上不同學員的結果也不直接合成工具排名。

講師可依共同規則完成實測後，更新紀錄與可編輯比較表。群組總用量不能直接當成個人消耗；無法取得的數值填「未取得」。

## 課後延伸與來源

進階練習為 [將收藏匯出為 `.ics` 行事曆](HWDC-workshop/materials/extension-ics.md)，教材包含提示、參考實作與範例檔，不占正式課程必做時間。

[官方文件、講師資料與查核日期](HWDC-workshop/evidence/sources.md) · [工具鏈版本](HWDC-workshop/evidence/versions.json)

議程附件擷取自 [HWDC 官方議程](https://hwdc.ithome.com.tw/2026/agenda)，2026-10-13 快照共 70 筆，10/14、10/15 各 35 筆。保留官方 ID、完整主題、日期時間、會議室、講者與來源連結。[資料說明與原始來源](HWDC-workshop/materials/agenda-data.md)。
