# reference-v1 教學參考解答

這是 Codex 製作的參考解答，非獨立效能實測。請先完成自己的實驗再閱讀。

`npm ci` 安裝相依套件。`npm run dev` 啟動本機頁面。`npm run build` 做型別檢查與建置。Node.js 24 下執行 `npm test` 驗證邏輯。

資料是 12 筆合成議程。收藏鍵名在兩個版本都使用 hwdc-lab-favorites-v1。要驗證跨版本保留，請在同一個本機網址與埠號依序執行第一版、第二版。

版本範圍：第一版六項功能，不含衝堂提示。

無網路時，直接開啟 ../offline/ 下的 HTML 參考版本。file URL 的 localStorage 支援依瀏覽器而異，頁面會在無法寫入時提示。
