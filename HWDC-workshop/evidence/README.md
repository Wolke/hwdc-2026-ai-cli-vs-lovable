# 證據說明

- agenda-source.json、agenda-raw.json 與 agenda.graphql 保存 2026-10-13 公開議程來源、快照、轉換方式與校驗值。
- measurements.json 是 **新版 70 筆資料＋短提示＋自由 UI** 的限時比較狀態。未取得使用 null，不當成 0。
- rehearsal-observations.md 是**舊版長提示／12 筆合成資料**的操作彩排觀察，已看過答案且第二輪交錯操作，不適合用於工具排名。
- reference-qa.json 是新版教學參考程式的功能驗證，不能拿來填兩套 AI 工具的效能比較。
- screenshots 是本套參考程式實際畫面，不是 Lovable 或 Codex 操作介面的截圖。
- sources.json / sources.md 記錄公開來源、支持的主張與查核日期。

參考解答與離線版本由 Codex 協助製作。操作與 QA 的具體範圍、未測項目以 reference-qa.json 為準。

- [cost-check-20261013.md](cost-check-20261013.md) / [JSON](cost-check-20261013.json)：舊彩排兩則 Lovable 訊息耗點，以及 Codex 本機 token 時間窗估算、換算公式與限制。cost-check/ 保存兩張訊息耗點截圖。美元為估算／分攤，不代表專案實扣。
