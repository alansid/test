# SBOM 管理系統

這是一個完整的 SBOM (Software Bill of Materials) 管理系統，使用 Java 17 + Spring Boot 3 + Angular 18 + Oracle DB 開發。

## 系統架構

```
sbom-system/
├── backend/          # Spring Boot 後端 API
│   ├── src/
│   │   └── main/
│   │       ├── java/com/sbom/
│   │       │   ├── entity/        # 數據模型
│   │       │   ├── repository/    # 數據存取層
│   │       │   ├── service/       # 業務邏輯層
│   │       │   ├── controller/    # REST API 控制器
│   │       │   ├── dto/          # 數據傳輸對象
│   │       │   └── config/       # 配置類
│   │       └── resources/
│   │           ├── application.yml
│   │           └── data.sql      # 示例數據
│   └── pom.xml
└── frontend/         # Angular 18 前端
    └── sbom-frontend/
        └── src/
            └── app/
                ├── components/   # UI 組件
                ├── services/     # API 服務
                ├── models/       # TypeScript 模型
                └── shared/       # 共享組件
```

## 功能特點

### ✅ 已完成功能

1. **專案管理**
   - 查看所有 SBOM 專案列表
   - 專案詳細信息查看
   - 按專案名稱搜尋
   - 分頁顯示支持

2. **組件管理**
   - 查看專案中的軟件組件
   - 組件詳細信息
   - 漏洞統計

3. **漏洞管理**
   - CVE 漏洞追蹤
   - 風險等級分類 (CRITICAL, HIGH, MEDIUM, LOW)
   - CVSS 評分支持

4. **用戶界面**
   - 響應式設計
   - 左側導航選單
   - 現代化 UI/UX

### 🔄 規劃中功能

1. **套件搜尋** - 通過套件名稱查找使用該套件的專案
2. **統計儀表板** - 詳細的統計圖表和分析
3. **數據導入/導出** - 支持標準 SBOM 格式 (SPDX, CycloneDX)

## 技術棧

### 後端
- **Java 17** - 程式語言
- **Spring Boot 3.2.0** - 應用框架
- **Spring Data JPA** - 數據存取
- **Oracle Database** - 數據庫
- **Maven** - 依賴管理

### 前端
- **Angular 18** - 前端框架
- **TypeScript** - 程式語言
- **SCSS** - 樣式設計
- **Font Awesome** - 圖標庫

## 快速開始

### 先決條件

1. **Java 17** 或更高版本
2. **Node.js 18** 或更高版本
3. **Oracle Database** (可用 Oracle XE 或 Docker)
4. **Maven 3.6** 或更高版本

### 數據庫設置

1. 安裝 Oracle Database
2. 創建數據庫用戶：
```sql
CREATE USER sbom_user IDENTIFIED BY sbom_password;
GRANT CONNECT, RESOURCE, CREATE VIEW TO sbom_user;
GRANT UNLIMITED TABLESPACE TO sbom_user;
```

3. 創建必要的序列：
```sql
CREATE SEQUENCE SBOM_PROJECT_SEQ START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE SBOM_COMPONENT_SEQ START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE SBOM_VULNERABILITY_SEQ START WITH 1 INCREMENT BY 1;
```

### 後端啟動

1. 進入後端目錄：
```bash
cd sbom-system/backend
```

2. 配置數據庫連接 (修改 `src/main/resources/application.yml`)：
```yaml
spring:
  datasource:
    url: jdbc:oracle:thin:@localhost:1521:xe
    username: sbom_user
    password: sbom_password
```

3. 編譯並運行：
```bash
mvn clean install
mvn spring-boot:run
```

後端將在 http://localhost:8080 啟動

### 前端啟動

1. 進入前端目錄：
```bash
cd sbom-system/frontend/sbom-frontend
```

2. 安裝依賴：
```bash
npm install
```

3. 啟動開發服務器：
```bash
ng serve
```

前端將在 http://localhost:4200 啟動

## API 端點

### 專案 API
- `GET /api/projects` - 獲取所有專案 (支持分頁)
- `GET /api/projects/search?projectName={name}` - 搜尋專案
- `GET /api/projects/{id}` - 獲取專案詳情
- `GET /api/projects/by-component?componentName={name}` - 按組件查找專案

### 組件 API
- `GET /api/components/project/{projectId}` - 獲取專案組件
- `GET /api/components/search?componentName={name}` - 搜尋組件
- `GET /api/components/{id}` - 獲取組件詳情
- `GET /api/components/names` - 獲取所有組件名稱
- `GET /api/components/package-managers` - 獲取套件管理器列表

## 數據模型

### SBOM 標準支持

系統支持主流 SBOM 標準：
- **SPDX 2.3** - Software Package Data Exchange
- **CycloneDX 1.4** - OWASP CycloneDX

### 核心實體

1. **Project (專案)**
   - 專案基本信息
   - 掃描元數據
   - 統計信息

2. **Component (組件)**
   - 軟件組件信息
   - 套件管理器信息
   - 許可證信息

3. **Vulnerability (漏洞)**
   - CVE 信息
   - CVSS 評分
   - 修復建議

## 開發指南

### 添加新功能

1. **後端**：
   - 在 `entity` 包中定義數據模型
   - 在 `repository` 包中創建數據存取接口
   - 在 `service` 包中實現業務邏輯
   - 在 `controller` 包中創建 REST API

2. **前端**：
   - 在 `models` 目錄中定義 TypeScript 接口
   - 在 `services` 目錄中創建 API 服務
   - 在 `components` 目錄中實現 UI 組件

### 代碼風格

- 後端遵循 Spring Boot 最佳實踐
- 前端遵循 Angular 風格指南
- 使用有意義的變量和方法名稱

## 部署

### Docker 部署 (建議)

1. 創建 Docker Compose 文件
2. 配置 Oracle 數據庫容器
3. 構建並部署應用

### 傳統部署

1. 打包後端應用：`mvn clean package`
2. 構建前端應用：`ng build --prod`
3. 部署到 Web 服務器

## 故障排除

### 常見問題

1. **數據庫連接失敗**
   - 檢查 Oracle 服務是否啟動
   - 驗證連接字符串和憑據

2. **CORS 錯誤**
   - 確保後端 CORS 配置正確
   - 檢查前端 API 基礎 URL

3. **編譯錯誤**
   - 確保 Java 和 Node.js 版本正確
   - 清理並重新安裝依賴

## 貢獻

1. Fork 此專案
2. 創建功能分支
3. 提交更改
4. 發起 Pull Request

## 許可證

此專案使用 MIT 許可證 - 詳見 [LICENSE](LICENSE) 文件

## 聯繫方式

如有問題或建議，請創建 GitHub Issue 或聯繫開發團隊。