# 使用輕量級且較安全的 nginx alpine 映像檔
# 指定特定版本以避免安全漏洞
FROM nginx:1.25-alpine

# 設定工作目錄
WORKDIR /usr/share/nginx/html

# 刪除預設的 nginx 網頁檔案
RUN rm -rf ./*

# 複製網站檔案到容器中
COPY index.html ./
COPY css ./css
COPY js ./js
COPY images ./images

# 複製自定義的 nginx 配置（如果需要）
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露 8080 端口（Cloud Run 預設使用 8080）
EXPOSE 8080

# 啟動 nginx（在前景執行）
CMD ["nginx", "-g", "daemon off;"]