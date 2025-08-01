# Code Review 規則

## 1. 前言

Code Review 是確保軟體品質、促進團隊知識共享和維持程式碼庫健康的重要環節。本文件旨在定義一套清晰、一致的 Code Review 標準與流程，讓所有團隊成員都能有所依循。

所有程式碼在合併到主要分支 (main/master) 之前，都必須經過至少一位團隊成員的審查和批准。

## 2. 審查核心原則 (Reviewer's Mindset)

*   **尊重與建設性**：永遠保持尊重。提供具體、有建設性的回饋，專注於程式碼本身，而非作者。多用 "建議" 或 "我們是否可以..." 的語氣。
*   **教育與學習**：將 Code Review 視為一個雙向的學習機會。分享知識，也從他人的程式碼中學習。
*   **目標導向**：審查的主要目標是提升程式碼品質，而不是挑錯。確保變更符合需求、易於理解且不會引入新問題。
*   **及時回饋**：盡快回應審查請求，避免成為開發流程的瓶頸。

## 3. 程式碼作者的職責 (Author's Responsibility)

*   **自我審查**：在提交審查前，請先自己完整看過一次變更，確保沒有明顯的錯誤或遺漏。
*   **清晰的說明**：提交 Pull Request (PR) 時，提供清晰的標題和描述，說明此變更的 "為什麼" (Why) 和 "做了什麼" (What)。若有相關的任務連結，也請一併附上。
*   **小而專注的變更**：盡量讓每個 PR 的變更範圍小且專注於單一功能或修復，這有助於審查者快速理解。
*   **虛心接受回饋**：以開放的心態接受回饋，並針對問題進行討論。如果不同意某個建議，請提出你的理由。

## 4. Coding Style (程式碼風格)

我們遵循一致的程式碼風格，以提高可讀性。主要以 [Prettier](https://prettier.io/) 和 [ESLint](https://eslint.org/) 的通用規則為基礎。

### 4.1 命名規範 (Naming Conventions)

*   **變數 (Variables)**: 使用 `camelCase`。命名應清晰表達其用途。
    ```javascript
    // Good
    const gameBoard = [];
    let currentPlayer = 'X';

    // Bad
    const gb = [];
    let p = 'X';
    ```
*   **常數 (Constants)**: 若為全局不變的設定值，使用 `UPPER_SNAKE_CASE`。
    ```javascript
    // Good
    const WINNING_COMBINATIONS = [ ... ];

    // Bad
    const winningcombinations = [ ... ];
    ```
*   **函式 (Functions)**: 使用 `camelCase`。命名應為動詞或動詞片語，描述其行為。
    ```javascript
    // Good
    function checkWin(player) { ... }
    function handleCellClick(event) { ... }

    // Bad
    function win(player) { ... }
    function cell(event) { ... }
    ```
*   **CSS 類別 (CSS Classes)**: 使用 `kebab-case`。
    ```css
    /* Good */
    .game-board { ... }
    .cell.is-active { ... }

    /* Bad */
    .gameBoard { ... }
    .cell_is_active { ... }
    ```

### 4.2 格式化 (Formatting)

*   **縮排**: 使用 2 個空格。
*   **分號**: 總是使用分號結尾。
*   **引號**: 字串優先使用單引號 `'`。
*   **行長**: 每行不超過 100 個字元。

### 4.3 註解 (Comments)

*   **Why, not What**: 註解應該解釋 "為什麼" 這麼做，而不是 "做了什麼"。程式碼本身應該要能清楚表達 "做了什麼"。
    ```javascript
    // Good: 解釋為什麼需要這個看似奇怪的延遲
    // 我們需要延遲 100 毫秒，等待 UI 動畫完成後再更新狀態。
    setTimeout(updateGameState, 100);

    // Bad: 多餘的註解，程式碼已經很清楚
    // 宣告一個變數 i 並設為 0
    let i = 0;
    ```
*   **TODO**: 使用 `// TODO:` 標記待辦事項，並簡述需要做什麼。
    ```javascript
    // TODO: 重構成更有效率的演算法
    ```

## 5. 最佳實踐 (Best Practices)

### 5.1 函式 (Functions)

*   **單一職責原則 (Single Responsibility Principle)**: 每個函式只做一件事情。
*   **避免副作用**: 盡量讓函式是純粹的 (Pure Functions)，給定相同的輸入，永遠回傳相同的輸出，並且沒有可觀察的副作用。
*   **參數數量**: 函式的參數不宜過多，建議最多 3 個。若超過，考慮使用物件作為參數。

### 5.2 變數 (Variables)

*   **優先使用 `const`**: 預設使用 `const`，只有在變數需要被重新賦值時才使用 `let`。避免使用 `var`。
*   **避免魔法數字/字串 (Magic Numbers/Strings)**: 將重複出現或意義不明確的數值/字串定義為常數。
    ```javascript
    // Good
    const MAX_PLAYERS = 2;
    if (playerCount === MAX_PLAYERS) { ... }

    // Bad
    if (playerCount === 2) { ... }
    ```

### 5.3 錯誤處理 (Error Handling)

*   確保有適當的錯誤處理機制，例如 `try...catch`。
*   提供對使用者友善的錯誤訊息。

### 5.4 測試 (Testing)

*   **單元測試**: 核心的業務邏輯必須有對應的單元測試。
*   **測試覆蓋率**: 鼓勵高測試覆蓋率，但更重視測試的品質。確保測試案例涵蓋了邊界情況和主要邏輯。

## 6. Code Review 流程

1.  **建立 Pull Request (PR)**:
    *   從 `main` 分支建立新的功能分支 (e.g., `feature/add-new-button`)。
    *   完成開發後，將功能分支推送到遠端，並建立一個指向 `main` 分支的 PR。
    *   在 PR 描述中詳細說明變更內容。

2.  **指定審查者 (Reviewers)**:
    *   至少指定一位團隊成員作為審查者。

3.  **進行審查**:
    *   審查者根據本文件中的規則進行審查。
    *   在 GitHub/GitLab 的評論功能中提出建議或問題。

4.  **修改與討論**:
    *   作者根據回饋修改程式碼。
    *   若有不同意見，雙方應進行討論，直到達成共識。

5.  **批准與合併**:
    *   當審查者認為沒有問題後，批准 (Approve) 該 PR。
    *   獲得至少一個批准後，作者可以將 PR 合併到 `main` 分支。
    *   合併後，刪除該功能分支。
