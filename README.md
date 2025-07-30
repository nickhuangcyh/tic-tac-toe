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
