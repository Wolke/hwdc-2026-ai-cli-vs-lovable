# 課後延伸：將收藏匯出為行事曆

這是第二版之後的選做練習，不計入課程的 15／5 分鐘比較。

## 提示

```text
請在議程收藏器加入「匯出行事曆」按鈕，輸出全部收藏為 UTF-8 的 .ics，不受目前搜尋或篩選影響。
每場使用一個 VEVENT，包含穩定 UID、DTSTAMP、DTSTART、DTEND、SUMMARY、LOCATION。
將時間轉為 UTC，以 Z 結尾。文字中的反斜線、分號、逗號及換行需要正確跳脫。
用 CRLF 分行，長行以 UTF-8 位元組數折行，不切斷中文字元。沒有收藏時停用下載並清楚說明。
下載檔名為 my-hwdc-demo-schedule.ics，並保留既有搜尋、收藏、儲存與衝堂功能。
請驗證 S01 的 09:00 台北時間在檔案中為 01:00 UTC。
```

## 參考實作

`extension-ics.mjs` 提供 `createCalendar(sessions, favoriteIds)` 與 `downloadCalendar(calendar)`。可改成 TypeScript 後整合到自己的專案。沒有收藏時前者回傳 `null`，供 UI 停用按鈕。

`example-schedule.ics` 使用 S01、S03 合成資料，不是真實活動邀請。

## 驗收

1. 收藏 S01、S03，檔案有兩個 VEVENT，沒有重複。
2. 開始時間分別為 `20261014T010000Z`、`20261014T014000Z`。
3. 同一場再次匯出的 UID 相同，DTSTAMP 反映產生時間。
4. 中文名稱、逗號、分號、反斜線及換行不破壞欄位格式。
5. CRLF 折行後每行不超過 75 位元組，接續行以空白開頭。
6. 沒有收藏時不下載空檔，原有功能全部正常。
7. 在你實際使用的行事曆軟體中檢查匯入內容。自動檢查格式不代表每個行事曆的匯入行為都相同。

來源：[RFC 5545](https://www.rfc-editor.org/rfc/rfc5545)，查核 2026-10-13。
