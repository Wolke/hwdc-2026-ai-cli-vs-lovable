# 手工／通用 AI 起始專案

這是空白工具鏈，不含任何待評測功能。HWDC 真實議程資料位於 src/sessions.json。

## 準備（不計入建置時間）
1. 安裝 Node.js 24，或相容的 Node.js 22.12 以上版本。
2. 在本目錄開啟終端機，執行 `npm ci`。首次需要網路。
3. 執行 `npm run dev`，開啟終端機顯示的本機網址。
4. 確認空白頁可開啟後停止 dev，複製本目錄作為獨立實驗。不要複製其他路徑的參考答案。

## 手工實測
先讀 requirements-v1.md 與 acceptance-v1.md，關閉 AI 補全。第一版限時 15 分鐘，允許官方文件查詢。測完第一版才讀第二版需求。請在講師手冊中的紀錄表留下結果。

## Codex App
在 App 選擇 Codex，開啟本目錄，使用教材的短提示，指定 src/sessions.json。完整需求與驗收表供自己檢查，缺漏時再具體補充。查看程式差異並在瀏覽器驗收。

`npm run build` 檢查 TypeScript 並產生可部署檔案。
