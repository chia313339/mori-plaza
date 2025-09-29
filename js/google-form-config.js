// ========================================
// Google 表單設定檔
// 請在此處設定您的 Google 表單資訊
// ========================================

// 您的 Google 表單 ID
// 請將 YOUR_FORM_ID_HERE 替換成您的實際表單 ID
// 例如: '1FAIpQLSfDGJkJsmdkwYwr-wlNlNf6wbN6k-yHUyE8AlMZU1i3IoY7pg'
var GOOGLE_FORM_ID = '1FAIpQLSdtkFLtNOCqdidbmT_sXip5o7HkV6g1GdCFemVnmUQ3dWvP4A';

// Google 表單欄位對應
// 如果您的欄位 ID 不同，請在此修改
var FORM_FIELD_IDS = {
    name: 'entry.145812638',    // 姓名欄位的 entry ID
    phone: 'entry.919985848',   // 電話欄位的 entry ID
    email: 'entry.652160700'    // Email欄位的 entry ID
};

// 組合完整的提交網址
var GOOGLE_FORM_SUBMIT_URL = 'https://docs.google.com/forms/d/e/' + GOOGLE_FORM_ID + '/formResponse';

// ========================================
// 以下為測試用的表單 ID（範例）
// 如果您還沒有建立 Google 表單，可以暫時使用這個測試
// ========================================
// var GOOGLE_FORM_ID = '1FAIpQLSfDGJkJsmdkwYwr-wlNlNf6wbN6k-yHUyE8AlMZU1i3IoY7pg';