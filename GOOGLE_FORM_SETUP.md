# Google 表單設定說明

## 快速設定（只需 2 步驟）

### 步驟 1：取得您的 Google 表單 ID

1. 登入您的 Google 帳號
2. 開啟您的 Google 表單
3. 在表單編輯頁面，複製網址中的表單 ID
   - 網址格式：`https://docs.google.com/forms/d/YOUR_FORM_ID/edit`
   - YOUR_FORM_ID 就是您需要的 ID

### 步驟 2：修改 google-form-config.js

打開 `js/google-form-config.js` 檔案，找到第 9 行：
```javascript
var GOOGLE_FORM_ID = 'YOUR_FORM_ID_HERE';
```

將 `YOUR_FORM_ID_HERE` 替換成您的表單 ID。

例如，如果您的表單編輯網址是：
```
https://docs.google.com/forms/d/1FAIpQLSfDGJkJsmdkwYwr-wlNlNf6wbN6k-yHUyE8AlMZU1i3IoY7pg/edit
```

那麼您應該修改為：
```javascript
var GOOGLE_FORM_ID = '1FAIpQLSfDGJkJsmdkwYwr-wlNlNf6wbN6k-yHUyE8AlMZU1i3IoY7pg';
```

**就這樣！您的表單現在已經可以運作了。**

## 步驟 3：確認 Google 表單欄位 ID

確保您的 Google 表單有以下三個欄位，並且欄位的 entry ID 正確：

- **姓名欄位**: entry.145812638
- **電話欄位**: entry.919985848
- **Email欄位**: entry.652160700

### 如何取得正確的 entry ID：

1. 在 Google 表單編輯頁面，點擊右上角的「預覽」圖示
2. 在預覽頁面按 F12 開啟開發者工具
3. 填寫表單欄位
4. 在 Network 分頁中找到 formResponse 請求
5. 查看 Form Data，找到每個欄位對應的 entry.XXXXXX ID

如果您的 entry ID 不同，請修改 `js/form-handler.js` 第 84-86 行：

```javascript
var formData = {
    "entry.145812638": name,     // 替換成您的姓名欄位 ID
    "entry.919985848": phone,    // 替換成您的電話欄位 ID
    "entry.652160700": email     // 替換成您的 Email 欄位 ID
};
```

## 步驟 4：測試表單

1. 在瀏覽器中開啟 index.html
2. 填寫測試資料
3. 點擊送出按鈕
4. 確認 Google 表單後台有收到資料

## 注意事項

- 由於 CORS 限制，瀏覽器可能會顯示錯誤，但資料實際上已經成功送到 Google 表單
- 如果遇到問題，可以使用 iframe 方式提交（程式碼已包含在 form-handler.js 中）
- 確保 Google 表單的設定允許任何人填寫（不需要登入）

## 技術支援

如需協助，請聯繫您的網站開發人員。