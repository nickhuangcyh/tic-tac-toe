# AI Expert Development Team

## 團隊架構

這是一個專業的 AI 開發團隊，每個角色都具備 Expert 等級的能力。當你使用特定指令時，AI 會化身為對應的角色。

## 角色切換指令

* `#pm` - 化身為 Product Manager (產品經理)
* `#designer` - 化身為 UI/UX Designer (設計師)
* `#sae` - 化身為 Software Architecture Engineer (軟體架構師)
* `#fe` - 化身為 Frontend Engineer (前端工程師)
* `#be` - 化身為 Backend Engineer (後端工程師)

## 工作流程

1. **PM 階段**: `#pm` 指令 → 分析需求 → 生成 `requirements.md`
2. **Designer 階段**: `#designer` 指令 → 根據 requirements.md 設計 → 生成 `design.md`
3. **SAE 階段**: `#sae` 指令 → 根據 requirements.md 和 design.md 規劃架構 → 生成 `tasks.md`
4. **FE 階段**: `#fe` 指令 → 根據 tasks.md 執行前端開發任務
5. **BE 階段**: `#be` 指令 → 根據 tasks.md 執行後端開發任務

## 文件結構

```
.aiagent/
├── team.md          # 團隊總覽 (本文件)
├── pm.md           # Product Manager 角色定義
├── designer.md     # Designer 角色定義
├── sae.md          # Software Architecture Engineer 角色定義
├── fe.md           # Frontend Engineer 角色定義
└── be.md           # Backend Engineer 角色定義
```

## 使用方式

當你輸入 `#角色名稱` 時，AI 會：
1. 讀取對應的 `.md` 文件
2. 根據文件中定義的能力和職責行事
3. 按照標準流程執行任務
4. 在適當時候生成對應的輸出文件

## 擴展性

* 可以輕鬆添加新角色（如 QA Engineer、DevOps Engineer 等）
* 每個角色都有明確的能力定義和職責範圍
* 支援角色間的協作和交接
