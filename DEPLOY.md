# 🚀 部署指南

## 本地測試

### 方法 1: 直接打開文件

```bash
# 在瀏覽器中直接打開 index.html 文件
open index.html
```

### 方法 2: 使用本地伺服器

```bash
# 使用 Python 伺服器
python3 -m http.server 8000
# 然後在瀏覽器中訪問 http://localhost:8000

# 或使用 Node.js
npx serve .
```

## GitHub Pages 部署

### 步驟 1: 準備倉庫

```bash
# 初始化 Git 倉庫（如果還沒有）
git init
git add .
git commit -m "Initial commit: Tic-tac-toe game"

# 推送到 GitHub
git remote add origin https://github.com/your-username/tic-tac-toe.git
git branch -M main
git push -u origin main
```

### 步驟 2: 配置 GitHub Pages

1. 前往 GitHub 倉庫頁面
2. 點擊 "Settings" 標籤
3. 滾動到 "Pages" 部分
4. 在 "Source" 下選擇 "Deploy from a branch"
5. 選擇 "main" 分支和 "/ (root)" 文件夾
6. 點擊 "Save"

### 步驟 3: 等待部署

* GitHub Pages 通常需要幾分鐘時間部署
* 部署完成後，遊戲將在 `https://your-username.github.io/tic-tac-toe` 可用

## 文件結構檢查

確保以下文件存在於倉庫根目錄：

```
tic-tac-toe/
├── index.html      # 主遊戲頁面
├── style.css       # 樣式文件
├── script.js       # 遊戲邏輯
├── README.md       # 專案說明
└── test.html       # 功能測試頁面
```

## 測試部署

部署完成後，請測試以下功能：
* [ ] 遊戲可以正常載入
* [ ] 下棋功能正常
* [ ] 勝利檢測正確
* [ ] 重新開始功能正常
* [ ] 響應式設計在移動設備上正常
* [ ] 鍵盤控制正常

## 故障排除

### 常見問題

1. **遊戲無法載入**
   - 檢查文件路徑是否正確
   - 確認所有文件都已上傳到 GitHub

2. **樣式沒有載入**
   - 檢查 `style.css` 文件是否存在
   - 確認 HTML 中的路徑正確

3. **JavaScript 功能異常**
   - 檢查瀏覽器控制台是否有錯誤
   - 確認 `script.js` 文件已正確載入

4. **GitHub Pages 顯示 404**
   - 確認倉庫是公開的
   - 檢查分支名稱是否為 `main`

   - 等待幾分鐘讓部署完成

## 自定義域名（可選）

如果需要使用自定義域名：
1. 在 GitHub 倉庫設置中添加自定義域名
2. 創建 `CNAME` 文件，內容為你的域名
3. 在 DNS 提供商處添加 CNAME 記錄

## 性能優化建議

* 遊戲已經過優化，檔案大小很小
* 所有資源都是本地文件，無需外部依賴
* 支援現代瀏覽器的所有功能

## 監控和分析

可以考慮添加：
* Google Analytics 追蹤使用情況
* 錯誤監控服務
* 性能監控工具

---

**部署完成後，您的遊戲就可以在網路上供所有人遊玩了！** 🎮✨ 
