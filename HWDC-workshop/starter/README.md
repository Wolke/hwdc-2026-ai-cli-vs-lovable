# 通用 AI 起始專案

這是空白工具鏈，不含任何待評測功能。HWDC 真實議程資料位於 src/sessions.json。

## 準備（不計入建置時間）
1. 安裝 Node.js 24，或相容的 Node.js 22.12 以上版本。
2. 在本目錄開啟終端機，執行 `npm ci`。首次需要網路。
3. 執行 `npm run dev`，開啟終端機顯示的本機網址。
4. 確認空白頁可開啟後停止 dev，複製本目錄作為獨立實驗。不要複製其他路徑的參考答案。

## Codex App
在 App 選擇 Codex，開啟本目錄，使用教材的短提示，指定 src/sessions.json。完整需求與驗收表供自己檢查，缺漏時再具體補充。查看程式差異並在瀏覽器驗收。

第一版實作與驗收合計最多 15 分鐘，再依第二版提示修改與驗收最多 5 分鐘。使用 materials/measurement-template.md 留下完成項目、耗時與追加提示。課堂可沿用其他通用 AI 工具，請記錄實際工具與設定。

`npm run build` 檢查 TypeScript 並產生可部署檔案。
