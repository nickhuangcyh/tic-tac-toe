# AI Expert Development Team

這是一個專業的 AI 開發團隊，每個角色都具備 Expert 等級的能力。當你使用特定指令時，AI 會化身為對應的角色。

## 團隊架構

```
.aiagent/
├── team.md          # 團隊總覽
├── pm.md           # Product Manager (產品經理)
├── designer.md     # UI/UX Designer (設計師)
├── sae.md          # Software Architecture Engineer (軟體架構師)
├── fe.md           # Frontend Engineer (前端工程師)
└── be.md           # Backend Engineer (後端工程師)
```

## 角色切換指令

* `#pm` - 化身為 Product Manager (產品經理)
* `#designer` - 化身為 UI/UX Designer (設計師)
* `#sae` - 化身為 Software Architecture Engineer (軟體架構師)
* `#fe` - 化身為 Frontend Engineer (前端工程師)
* `#be` - 化身為 Backend Engineer (後端工程師)

## 工作流程

### 1. PM 階段

```
#pm 請幫我規劃 [產品名稱]
```

* 分析需求並生成 `requirements.md` 文件
* 包含完整的功能規格和開發計劃

### 2. Designer 階段

```
#designer 請幫我開始設計根據 requirements.md
```

* 根據 requirements.md 進行 UI/UX 設計
* 生成 `design.md` 文件，包含完整的設計規格

### 3. SAE 階段

```
#sae 請幫我根據 requirements.md 以及 design.md 文件的任務清單規劃產品架構以及一步一步詳細開發 task
```

* 根據需求和設計規劃技術架構
* 生成 `tasks.md` 文件，包含詳細的開發任務

### 4. FE 階段

```
#fe 請幫我根據 tasks 規劃開始執行任務
```

* 根據 tasks.md 執行前端開發任務
* 實現用戶介面和前端功能

### 5. BE 階段

```
#be 請幫我根據 tasks 規劃開始執行任務
```

* 根據 tasks.md 執行後端開發任務
* 實現 API 和後端服務

## 使用範例

### 完整開發流程範例

1. **開始產品規劃**
   

```
   #pm 請幫我規劃一個線上購物平台
   ```

2. **進行設計**
   

```
   #designer 請幫我開始設計根據 requirements.md
   ```

3. **規劃技術架構**
   

```
   #sae 請幫我根據 requirements.md 以及 design.md 文件的任務清單規劃產品架構以及一步一步詳細開發 task
   ```

4. **前端開發**
   

```
   #fe 請幫我根據 tasks 規劃開始執行任務
   ```

5. **後端開發**
   

```
   #be 請幫我根據 tasks 規劃開始執行任務
   ```

## 文件輸出

每個階段都會生成對應的文件：

* `requirements.md` - 產品需求規格 (PM 生成)
* `design.md` - 產品設計規格 (Designer 生成)
* `tasks.md` - 開發任務規劃 (SAE 生成)

## 擴展性

* 可以輕鬆添加新角色（如 QA Engineer、DevOps Engineer 等）
* 每個角色都有明確的能力定義和職責範圍
* 支援角色間的協作和交接

## 注意事項

1. 每個角色都會根據對應的 `.md` 文件中的能力定義行事
2. 確保在切換角色前，相關的文件已經生成
3. 每個階段完成後，請確認輸出文件是否符合預期
4. 可以根據需要調整角色的能力定義

---

**開始使用：** 請使用 `#角色名稱` 指令來啟動對應的 AI 角色！

---

# Tic-tac-toe 專案成果

## 專案概述

本專案是使用上述 AI 開發團隊完成的 Tic-tac-toe 遊戲，展示了完整的開發流程和測試實作。

## 功能特色

- 🎮 完整的 Tic-tac-toe 遊戲邏輯
- 🎨 美觀的 UI 設計和動畫效果
- 📱 響應式設計，支援各種設備
- ✅ 完整的單元測試套件 (85 個測試案例)
- 📊 高測試覆蓋率 (98%+ 語句覆蓋率)

## 技術棧

- **前端**: HTML5, CSS3, Vanilla JavaScript
- **測試**: Jest, jsdom, @testing-library/jest-dom
- **建構工具**: npm

## 運行測試

```bash
# 安裝依賴
npm install

# 運行所有測試
npm test

# 運行測試並監聽變化
npm run test:watch

# 生成測試覆蓋率報告
npm run test:coverage

# CI 環境測試
npm run test:ci
```

## 測試覆蓋率

當前測試覆蓋率：

| 指標 | 覆蓋率 |
|-----|--------|
| 語句 | 98.86% |
| 分支 | 86.66% |
| 函數 | 95.23% |
| 行數 | 98.83% |

## 測試結構

```
__tests__/
├── TicTacToe.test.js      # TicTacToe 類別單元測試 (17 tests)
├── gameLogic.test.js      # 遊戲邏輯測試 (20 tests)
├── domInteraction.test.js # DOM 互動測試 (18 tests)
├── edgeCases.test.js      # 邊界條件和異常處理測試 (18 tests)
└── integration.test.js    # 整合測試 (12 tests)
```

**總計：85 個測試案例**

## 測試類型

### 1. 單元測試
- **TicTacToe 類別測試**: 遊戲初始化、狀態管理、玩家切換
- **遊戲邏輯測試**: 下棋功能、勝利檢測、平局檢測、重新開始

### 2. DOM 互動測試
- 格子點擊測試
- 按鈕互動測試
- 狀態顯示測試
- 視覺反饋測試

### 3. 邊界條件測試
- DOM 元素不存在的異常處理
- 無效輸入處理
- 記憶體洩漏防護
- 性能測試
- 併發操作處理

### 4. 整合測試
- 完整遊戲流程測試
- 多局遊戲測試
- 用戶體驗整合測試
- 錯誤恢復測試

## 文件結構

```
tic-tac-toe/
├── index.html              # 主頁面
├── style.css              # 樣式文件
├── script.js              # 遊戲邏輯
├── package.json           # 項目配置
├── __tests__/             # 測試文件目錄
├── src/
│   └── setupTests.js      # 測試設置文件
├── coverage/              # 測試覆蓋率報告
└── README.md              # 說明文檔
```

## 開發團隊成果展示

這個專案展示了 AI Expert 開發團隊的協作成果：

1. **PM** 規劃了需求 (`requirements.md`)
2. **Designer** 設計了 UI/UX (`design.md`) 
3. **SAE** 規劃了架構和任務 (`tasks.md`)
4. **FE** 實現了完整的前端功能和單元測試

### 開發流程追蹤

- ✅ **PM 階段**: 需求分析和規劃 
- ✅ **Designer 階段**: UI/UX 設計
- ✅ **SAE 階段**: 技術架構和任務規劃
- ✅ **FE 階段**: 前端開發和測試實作

## 品質保證

- **測試驅動開發**: 85 個測試案例涵蓋各種情境
- **高覆蓋率**: 達到 98%+ 的語句覆蓋率
- **異常處理**: 完整的邊界條件和錯誤處理測試
- **性能測試**: 確保大量操作下的性能穩定性

## 運行遊戲

直接在瀏覽器中打開 `index.html` 文件即可開始遊戲。
