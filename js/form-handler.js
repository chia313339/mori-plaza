$(document).ready(function() {
    // 阻止表單預設提交行為
    $('[data-js="post-form"]').submit(function(e) {
        e.preventDefault();
        submitForm();
    });

    // 當按鈕被點擊時
    $('#btn-sumit').click(function(e) {
        e.preventDefault();
        submitForm();
    });
});

function submitForm() {
    // 取得表單值
    var name = $('#name').val().trim();
    var phone = $('#phone').val().trim();
    var email = $('#email').val().trim();

    // 驗證姓名
    if (name === '') {
        Swal.fire({
            title: '請輸入姓名',
            text: '姓名為必填欄位',
            icon: 'warning',
            confirmButtonText: '繼續填寫',
            confirmButtonColor: "#3E3A39",
        });
        $('#name').focus();
        return false;
    }

    // 驗證電話
    if (phone === '') {
        Swal.fire({
            title: '請輸入電話',
            text: '連絡電話為必填欄位',
            icon: 'warning',
            confirmButtonText: '繼續填寫',
            confirmButtonColor: "#3E3A39",
        });
        $('#phone').focus();
        return false;
    }

    // 驗證電話格式（只允許數字、減號、括號、加號）
    var phoneReg = /^[\d\-\(\)\+\s]+$/;
    if (!phoneReg.test(phone)) {
        Swal.fire({
            title: '電話格式錯誤',
            text: '請輸入正確的電話號碼',
            icon: 'warning',
            confirmButtonText: '繼續填寫',
            confirmButtonColor: "#3E3A39",
        });
        $('#phone').focus();
        return false;
    }

    // 驗證 Email
    if (email === '') {
        Swal.fire({
            title: '請輸入電子信箱',
            text: '電子信箱為必填欄位',
            icon: 'warning',
            confirmButtonText: '繼續填寫',
            confirmButtonColor: "#3E3A39",
        });
        $('#email').focus();
        return false;
    }

    // 驗證 Email 格式
    var emailReg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!emailReg.test(email)) {
        Swal.fire({
            title: '電子信箱格式錯誤',
            text: '請輸入正確的電子信箱格式',
            icon: 'warning',
            confirmButtonText: '繼續填寫',
            confirmButtonColor: "#3E3A39",
        });
        $('#email').focus();
        return false;
    }

    // 顯示載入中
    $('#loading').show();
    $('#btn-sumit').prop('disabled', true).text('送出中...');

    // 準備要送出的資料（使用設定檔中的欄位 ID）
    var formData = {};
    formData[FORM_FIELD_IDS.name] = name;
    formData[FORM_FIELD_IDS.phone] = phone;
    formData[FORM_FIELD_IDS.email] = email;

    // 使用設定檔中的 Google 表單 URL
    var googleFormURL = GOOGLE_FORM_SUBMIT_URL;

    // 使用 AJAX 提交表單
    $.ajax({
        url: googleFormURL,
        type: 'POST',
        data: formData,
        dataType: 'xml',
        statusCode: {
            0: function() {
                // 成功（CORS 會導致狀態碼 0，但資料其實已經送出）
                showSuccessMessage();
            },
            200: function() {
                // 成功
                showSuccessMessage();
            },
            404: function() {
                // 如果 404，可能是 URL 錯誤
                showErrorMessage();
            }
        },
        complete: function() {
            // 無論成功或失敗都會執行
            $('#loading').hide();
            $('#btn-sumit').prop('disabled', false).text('送出');
        },
        error: function(xhr) {
            // CORS 錯誤通常會到這裡，但如果是因為 CORS，資料其實已經送出
            if (xhr.status === 0) {
                // 狀態碼 0 通常表示 CORS 錯誤，但資料可能已經成功送出
                showSuccessMessage();
            } else {
                showErrorMessage();
            }
        }
    });
}

function showSuccessMessage() {
    Swal.fire({
        title: "表單送出成功！",
        text: "我們將由專人盡快與您聯繫",
        icon: "success",
        confirmButtonColor: "#3E3A39",
        confirmButtonText: '關閉',
    }).then((result) => {
        // 清空表單
        $('#name').val('');
        $('#phone').val('');
        $('#email').val('');
    });
}

function showErrorMessage() {
    Swal.fire({
        title: '送出失敗',
        text: '請稍後再試或直接撥打電話聯繫我們',
        icon: 'error',
        confirmButtonText: '關閉',
        confirmButtonColor: "#3E3A39",
    });
}

// 備用方案：使用 iframe 方式提交（避免 CORS 問題）
function submitFormViaIframe() {
    var name = $('#name').val().trim();
    var phone = $('#phone').val().trim();
    var email = $('#email').val().trim();

    // 建立隱藏的 iframe
    var iframeName = 'hidden_iframe_' + Date.now();
    var $iframe = $('<iframe>', {
        name: iframeName,
        id: iframeName,
        style: 'display:none;'
    }).appendTo('body');

    // 建立臨時表單
    var $form = $('<form>', {
        action: GOOGLE_FORM_SUBMIT_URL,
        method: 'POST',
        target: iframeName
    });

    // 加入表單欄位
    $('<input>').attr({
        type: 'hidden',
        name: FORM_FIELD_IDS.name,
        value: name
    }).appendTo($form);

    $('<input>').attr({
        type: 'hidden',
        name: FORM_FIELD_IDS.phone,
        value: phone
    }).appendTo($form);

    $('<input>').attr({
        type: 'hidden',
        name: FORM_FIELD_IDS.email,
        value: email
    }).appendTo($form);

    // 將表單加入 body 並提交
    $form.appendTo('body').submit();

    // 設定 timeout 來顯示成功訊息（因為無法偵測 iframe 的提交結果）
    setTimeout(function() {
        showSuccessMessage();
        // 清理臨時元素
        $form.remove();
        $iframe.remove();
    }, 1000);
}