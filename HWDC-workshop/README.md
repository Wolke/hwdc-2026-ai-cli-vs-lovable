# HWDC 2026 工作坊教材

解壓完整教材包後，先開啟根目錄的「開始這裡.html」。學員閱讀 materials/student-handout.html，講師另讀 materials/instructor-guide.html。

- starter：空白工具鏈，供通用 AI 實作使用。
- materials：需求、70 筆公開資料、提示、驗收、講義與講師手冊。
- reference-v1 / reference-v2：Codex 製作的教學解答。先完成自己的實驗再看。
- offline：單檔 HTML，無網路也能開啟及操作。
- evidence：來源與資料狀態。程式 QA 與工具比較分開。
- screenshots：參考程式的實際畫面。

開始前安裝 Node.js 24，解壓後進入任一專案，執行 npm ci，再 npm run dev。首次安裝需要網路。詳見各資料夾 README。

新版短提示與真實資料的獨立比較尚未取得。簡報第 25 頁呈現舊條件彩排，限制與完整說明見 evidence/rehearsal-observations.md；新版待測欄位在 evidence/measurements.json。

可編輯 PPTX 採 Heiti TC／Menlo 字體。若電腦沒有這些字體，PowerPoint 可能替換字體；請投影前檢視，或使用 slides/index.html 的固定版面預覽。

講師私下提供 Lovable 額度用完者的群組加入方式；講師介紹依本人 Medium 自介與著作頁更新。新版簡報為根目錄 HWDC-2026-workshop-v6.pptx。

本次 v3：真實兩日議程以 JSON 附件提供，初版／修改 prompt 改為簡短人話，驗收 UX 邏輯，UI 由個人或 Agent 自由設計。資料來源見 materials/agenda-data.md，舊彩排結果見 evidence/rehearsal-observations.md。

本次 v4：投影片直接列出初版、修改、除錯與延伸 prompt；第 12 頁列出官方來源及 JSON 附件完整網址。瀏覽器投影片另提供可選取複製的提示文字。GitHub 附件目前需要私人 repo 存取權，現場可直接使用教材包內的 JSON。

本次 v5：90 分鐘只比較 Lovable 與通用 AI 工具，各完成初版、需求修改與驗收。流程頁、比較表、講師手冊與實測紀錄皆以這兩條路徑為準。

本次 v6：第 27 頁補上舊彩排費用。Lovable 實耗 5.10 credits，正常月費分攤約 US$2.50；Codex Standard 情境估算約 US$1.39，速度模式與實扣未取得。完整 [token 明細、證據與換算假設](evidence/cost-check-20261013.md)。
