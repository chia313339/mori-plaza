# Firebase Hosting 部署說明 (moriplaza)

本站部署於 Firebase Hosting，使用**多站台 (multi-site) + hosting target** 設定，
確保部署時**只更新 `moriplaza`**，不會影響同一個 Firebase 專案下的其他站台。

## 基本資訊

| 項目 | 值 |
|------|-----|
| Firebase 專案 ID | `dwtlung` |
| 本站 Site ID | `moriplaza` |
| 線上網址 | https://moriplaza.web.app |
| 登入帳號 | chia313339@gmail.com |
| 部署型態 | 純靜態網站 (root = public 目錄) |

### 同專案下其他站台（**請勿覆蓋**）
- `dwtlung` → https://dwtlung.web.app
- `foreverone` → https://foreverone.web.app

## 設定檔

- `firebase.json` — `hosting.target` 設為 `moriplaza`，`public` 為專案根目錄 `.`，
  並 ignore 掉非網站檔案（md、Dockerfile、nginx.conf 等）。
- `.firebaserc` — `default` 專案為 `dwtlung`；`targets.dwtlung.hosting.moriplaza`
  對應到 site `moriplaza`。

## 日常部署指令

設定檔已建立好，之後每次更新只需：

```bash
firebase deploy --only hosting:moriplaza --project dwtlung
```

> **重要**：一定要加 `--only hosting:moriplaza`。
> 若只打 `firebase deploy`，搭配 target 設定仍只會部署 moriplaza，
> 但加上 `--only` 最保險，避免誤觸其他站台。

## 首次設定（已完成，僅供記錄 / 換機重建用）

```bash
# 1. 登入
firebase login

# 2. 建立新站台（只需做一次）
firebase hosting:sites:create moriplaza --project dwtlung

# 3. 綁定 target（已寫入 .firebaserc，換機時需重跑）
firebase target:apply hosting moriplaza moriplaza --project dwtlung

# 4. 部署
firebase deploy --only hosting:moriplaza --project dwtlung
```

## 驗證

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://moriplaza.web.app   # 應為 200
firebase hosting:sites:list --project dwtlung                        # 應列出三個站台
```
