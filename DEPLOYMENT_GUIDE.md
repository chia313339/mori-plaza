# GCP Cloud Run 部署指南

本指南將協助您將 Mori Plaza 網站部署到 Google Cloud Platform 的 Cloud Run 服務。

## 📋 前置需求

1. **Google Cloud Platform 帳號**
   - 前往 [Google Cloud Console](https://console.cloud.google.com/) 註冊
   - 建立一個新專案或使用現有專案

2. **安裝必要工具**
   ```bash
   # 安裝 Google Cloud SDK
   # macOS
   brew install google-cloud-sdk

   # 或下載安裝程式
   # https://cloud.google.com/sdk/docs/install
   ```

3. **安裝 Docker**
   - [Docker Desktop for Mac](https://docs.docker.com/desktop/mac/install/)
   - [Docker Desktop for Windows](https://docs.docker.com/desktop/windows/install/)

## 🚀 快速部署

### 方法一：使用自動化腳本（推薦）

1. **修改部署腳本**
   編輯 `deploy.sh`，將 `PROJECT_ID` 改為您的 GCP 專案 ID：
   ```bash
   PROJECT_ID="your-actual-project-id"
   ```

2. **執行部署**
   ```bash
   ./deploy.sh
   ```

### 方法二：手動部署

1. **登入 GCP**
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

2. **構建 Docker 映像**
   ```bash
   docker build -t gcr.io/YOUR_PROJECT_ID/mori-plaza .
   ```

3. **推送映像到 GCR**
   ```bash
   docker push gcr.io/YOUR_PROJECT_ID/mori-plaza
   ```

4. **部署到 Cloud Run**
   ```bash
   gcloud run deploy mori-plaza \
     --image gcr.io/YOUR_PROJECT_ID/mori-plaza \
     --platform managed \
     --region asia-east1 \
     --allow-unauthenticated \
     --port 8080
   ```

### 方法三：使用 Cloud Build（CI/CD）

1. **將程式碼推送到 GitHub**

2. **在 Cloud Console 設定 Cloud Build 觸發器**
   - 前往 Cloud Build > 觸發器
   - 建立觸發器連接到您的 GitHub 儲存庫
   - 選擇 `cloudbuild.yaml` 作為構建配置

3. **每次推送程式碼時會自動部署**

## 📁 檔案說明

- **Dockerfile** - Docker 容器配置
- **nginx.conf** - Nginx 網頁伺服器配置
- **.dockerignore** - Docker 構建時忽略的檔案
- **cloudbuild.yaml** - Cloud Build CI/CD 配置
- **deploy.sh** - 自動化部署腳本

## 🔧 配置調整

### 調整資源限制

在 `deploy.sh` 或 `cloudbuild.yaml` 中修改：
```bash
--memory 512Mi    # 增加記憶體
--cpu 2           # 增加 CPU
--max-instances 100  # 增加最大實例數
```

### 自訂域名

1. 在 Cloud Run 控制台選擇您的服務
2. 點擊「管理自訂網域」
3. 按照指示驗證並設定您的域名

## 💰 成本估算

Cloud Run 採用按使用付費模式：
- **免費額度**：每月前 200 萬次請求免費
- **CPU**：每月前 180,000 vCPU 秒免費
- **記憶體**：每月前 360,000 GB 秒免費
- **網路**：每月 1 GB 免費輸出

對於一般網站，通常可以保持在免費額度內。

## 🔍 監控與日誌

### 查看日誌
```bash
gcloud run services logs mori-plaza --region asia-east1
```

### 查看服務狀態
```bash
gcloud run services describe mori-plaza --region asia-east1
```

### 在 Cloud Console 查看
1. 前往 [Cloud Run 控制台](https://console.cloud.google.com/run)
2. 選擇您的服務查看指標、日誌和設定

## ❓ 常見問題

### 1. 部署失敗
- 檢查 Docker 映像是否正確構建
- 確認 GCP API 已啟用
- 檢查專案配額是否足夠

### 2. 網站無法訪問
- 確認已設定 `--allow-unauthenticated`
- 檢查防火牆規則
- 確認服務已成功部署

### 3. 更新網站內容
只需重新執行部署步驟，Cloud Run 會自動進行滾動更新。

## 📞 需要協助？

- [Cloud Run 官方文檔](https://cloud.google.com/run/docs)
- [GCP 支援中心](https://cloud.google.com/support)
- [Stack Overflow - google-cloud-run 標籤](https://stackoverflow.com/questions/tagged/google-cloud-run)

## 🎉 恭喜！

您的網站現在已經部署在 Google Cloud Run 上，享有：
- ✅ 自動擴展（從 0 到數千個實例）
- ✅ HTTPS 加密
- ✅ 全球 CDN
- ✅ 高可用性
- ✅ 按使用付費