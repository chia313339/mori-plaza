#!/bin/bash

# 部署腳本 - 將網站部署到 GCP Cloud Run
# 使用前請確保已安裝並設定好 gcloud CLI

set -e  # 遇到錯誤時停止執行

# 設定變數
PROJECT_ID="your-project-id"  # 請替換成您的 GCP 專案 ID
SERVICE_NAME="mori-plaza"
REGION="asia-east1"  # 台灣區域
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

echo "==========================================
🚀 開始部署 Mori Plaza 到 Cloud Run
=========================================="

# 1. 檢查是否已登入 gcloud
echo "
📋 步驟 1: 檢查 GCP 設定..."
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo "❌ 請先登入 Google Cloud"
    echo "執行: gcloud auth login"
    exit 1
fi

# 2. 設定專案
echo "
📋 步驟 2: 設定 GCP 專案..."
gcloud config set project ${PROJECT_ID}

# 3. 啟用必要的 API
echo "
📋 步驟 3: 啟用必要的 GCP API..."
gcloud services enable \
    cloudbuild.googleapis.com \
    run.googleapis.com \
    containerregistry.googleapis.com

# 4. 構建 Docker 映像
echo "
📋 步驟 4: 構建 Docker 映像..."
docker build -t ${IMAGE_NAME} .

# 5. 推送映像到 Google Container Registry
echo "
📋 步驟 5: 推送映像到 GCR..."
docker push ${IMAGE_NAME}

# 6. 部署到 Cloud Run
echo "
📋 步驟 6: 部署到 Cloud Run..."
gcloud run deploy ${SERVICE_NAME} \
    --image ${IMAGE_NAME} \
    --platform managed \
    --region ${REGION} \
    --allow-unauthenticated \
    --port 8080 \
    --memory 256Mi \
    --cpu 1 \
    --max-instances 10 \
    --min-instances 0

# 7. 獲取服務 URL
echo "
📋 步驟 7: 獲取服務 URL..."
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} \
    --platform managed \
    --region ${REGION} \
    --format 'value(status.url)')

echo "
==========================================
✅ 部署成功！
==========================================
🌐 您的網站已部署至: ${SERVICE_URL}
📍 區域: ${REGION}
🏷️ 服務名稱: ${SERVICE_NAME}

提示:
- 如需更新，只需重新執行此腳本
- 如需查看日誌: gcloud run services logs ${SERVICE_NAME} --region ${REGION}
- 如需刪除服務: gcloud run services delete ${SERVICE_NAME} --region ${REGION}
"