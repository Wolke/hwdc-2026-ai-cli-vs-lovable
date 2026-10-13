# 選講補充：費用、開發場景與 Lovable 平台

第 39–43 頁供時間充裕時選講，完整約 10–11 分鐘。第 44 頁是課後系列訂閱，約 1 分鐘。原本 90 分鐘的核心實作與 Q&A 不變；若無餘裕，第 32 頁 Q&A 後直接跳到第 44 頁。瀏覽器投影片提供「補充內容」與「訂閱 QR」快捷鍵。

## 第 39 頁：這次的費用估算代表什麼

| 工具 | 取得的用量 | 美元換算口徑 |
|---|---|---|
| Lovable | 初版 2 + 修改 3.10 = 5.10 credits | 正常 Business 月費 588／1,200 credits 分攤，約 US$2.50 |
| Codex | 754,275 tokens，含 730,150 cached input | GPT-6 Astra Standard 額度率，再以 US$0.04／credit 面額換算，約 US$1.39 |

在這組假設下，Codex 估值較低。Lovable 的正常訂閱分攤與 Codex 的額度面額估算都不等於已核實的專案扣款。Codex 實際速度模式未取得，若以加購額度 Fast 2 倍或 Ultrafast 6 倍試算，約為 US$2.77／US$8.32。不能從 Standard 情境推論所有模式都較便宜。

此資料屬 2026-10-13 的舊版 12 筆資料、長提示彩排，新版 70 筆真實議程＋短提示尚未獨立限時重測。比較時還要看通過項目、返工與人的投入，且不可將不同平台的 credits 視為相同單位。完整公式、帳單狀態與證據見 [用量與費用紀錄](../evidence/cost-check-20261013.md)。

## 第 40 頁：Roblox 原投稿題目與換場景重測

以下為講師於 2026-10-14 提供的投稿經驗：原先想以 Roblox Studio AI 與通用 AI 比較。當時預計使用的流程需要參與者提供自己的 API key 與用量預算，主辦單位曾洽詢贊助，但未取得，最後改成 Lovable。此敘述限於當時規劃的操作方式，不代表所有 Roblox AI 功能都必須提供自備 key。

這次網站開發屬通用 coding agent 的常見任務。講師想提醒的是：換到需要掌握編輯器狀態、場景物件與資產的任務，結果可能不同。可以用 Roblox 的 Luau 腳本、場景操作與 Playtest 當下一個課題，但本堂沒有 Roblox 效能或費用實測結果。

課後比較仍沿用本堂框架：

1. 先定共同需求、起始資料與可觀察的完成條件。
2. 各自限時建置，保存所有追加提示及失敗紀錄。
3. 提出相同修改，再檢查新功能與原有行為。
4. 同時比較完成度、經過時間、主動工時及等待。
5. 取得用量或帳單，分開寫訂閱分攤、額外費用與估算假設。

## 第 41 頁：發布與網域

Lovable 可直接發布到預設的 `project-name.lovable.app` 網址，由平台提供網站託管。投影片中的網址是格式示意。程式編輯與正式站更新有各自步驟，修改完成後需再次發布。付費方案可連接自己購買的網域。

延伸閱讀：[系列第 17 篇](https://ithelp.ithome.com.tw/articles/10406635)、[官方 Publishing](https://docs.lovable.dev/features/publish)。

## 第 42 頁：整合在平台裡的工具

Lovable 將需求討論、Agent 實作、後端資源、測試與發布放在同一套流程：

- Plan／Build：先討論規劃，再讓 Agent 實作。
- Lovable Cloud：資料庫、登入、檔案儲存與後端函式。
- 測試與安全檢查：提供工具協助檢查，發布前仍需親自驗收。
- GitHub 與發布：同步程式碼、查看預覽、發布正式站。

評估平台價值時，也要記錄省下多少設定與整合工時。建置 credits、Cloud／AI 使用與第三方服務可能各有計費口徑，依實際方案核對，不假設全部包含或無上限。

延伸閱讀：[系列第 1 篇](https://ithelp.ithome.com.tw/articles/10406618)、[官方 Cloud](https://docs.lovable.dev/features/cloud)。

## 第 43 頁：第三方服務與 connectors

常見例子包含 Notion、Google Workspace、Slack 與 Resend。Connector 減少串接工作，但仍需授權帳號、設定權限，並核對第三方費用。依 2026-10-14 官方說明，區分如下：

| 類型 | 帳號與使用方式 |
|---|---|
| App + chat connector | 共用連線，可供成品 App 執行時和建置對話使用 |
| Chat connector（MCP） | 個人的建置上下文，不隨成品部署 |
| App user connector | 由每位 App 使用者登入自己的帳號與授權 |

不同服務支援的類型不同，不可看到同一個品牌名稱就假設帳號、權限及執行方式完全一樣。例如以 Notion 文件作為建置參考，與成品 App 寫入 Notion 是兩個不同需求。

延伸閱讀：[系列第 11 篇](https://ithelp.ithome.com.tw/articles/10406629)、[官方 Integrations](https://docs.lovable.dev/integrations/introduction)。

## 第 44 頁：兩個系列訂閱

投影片已直接放入兩張 QR Code。掃碼開啟系列，登入 iT 邦幫忙後點「訂閱系列文」。

- [Roblox Studio AI 協作開發大全](https://ithelp.ithome.com.tw/users/20046160/ironman/9450)
- [Lovable：地球上最強的 AI 生成全端網站 Agentic 開發實戰](https://ithelp.ithome.com.tw/users/20046160/ironman/9449)

可另開 [QR 展示頁](series-subscriptions/index.html)，或取用同目錄的 PNG／SVG 圖檔。
