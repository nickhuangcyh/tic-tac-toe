# 🧪 測試規劃 - Tic-tac-toe 遊戲

## 測試概述

### 測試目標

* 確保遊戲邏輯的正確性
* 驗證用戶互動的可靠性
* 保證程式碼的品質和可維護性
* 達到 80% 以上的測試覆蓋率

### 測試策略

* **單元測試**：測試核心邏輯和工具函數
* **整合測試**：測試 DOM 操作和事件處理
* **手動測試**：驗證用戶體驗和視覺效果

## 測試環境設置

### 依賴安裝

```bash
npm init -y
npm install --save-dev jest jsdom @testing-library/dom
```

### Jest 配置

```javascript
// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    collectCoverageFrom: [
        'script.js',
        '!**/node_modules/**'
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    }
};
```

### 測試設置文件

```javascript
// tests/setup.js
import '@testing-library/jest-dom';

// 模擬 localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
};
global.localStorage = localStorageMock;
```

## 測試文件結構

```
tests/
├── setup.js                    # 測試環境設置
├── unit/
│   ├── game.test.js           # 遊戲邏輯測試
│   ├── stats.test.js          # 統計功能測試
│   └── utils.test.js          # 工具函數測試
└── integration/
    └── game-integration.test.js # 整合測試
```

## 單元測試規劃

### 1. 遊戲邏輯測試 ( `tests/unit/game.test.js` )

#### TicTacToe 類別測試

```javascript
describe('TicTacToe', () => {
    let game;

    beforeEach(() => {
        // 設置 DOM 環境
        document.body.innerHTML = `
      <div id="status">玩家 X 的回合</div>
      <button id="restartBtn">重新開始</button>
      <div id="gameBoard">
        <div class="cell" data-index="0"></div>
        <div class="cell" data-index="1"></div>
        <div class="cell" data-index="2"></div>
        <div class="cell" data-index="3"></div>
        <div class="cell" data-index="4"></div>
        <div class="cell" data-index="5"></div>
        <div class="cell" data-index="6"></div>
        <div class="cell" data-index="7"></div>
        <div class="cell" data-index="8"></div>
      </div>
    `;
        game = new TicTacToe();
    });

    test('應該正確初始化遊戲狀態', () => {
        expect(game.board).toEqual(Array(9).fill(''));
        expect(game.currentPlayer).toBe('X');
        expect(game.gameActive).toBe(true);
    });

    test('應該正確切換玩家', () => {
        game.switchPlayer();
        expect(game.currentPlayer).toBe('O');

        game.switchPlayer();
        expect(game.currentPlayer).toBe('X');
    });

    test('應該正確檢測勝利條件', () => {
        // 測試橫行勝利
        game.board = ['X', 'X', 'X', '', '', '', '', '', ''];
        expect(game.checkWin()).toBe(true);

        // 測試直行勝利
        game.board = ['X', '', '', 'X', '', '', 'X', '', ''];
        expect(game.checkWin()).toBe(true);

        // 測試對角線勝利
        game.board = ['X', '', '', '', 'X', '', '', '', 'X'];
        expect(game.checkWin()).toBe(true);
    });

    test('應該正確檢測平局', () => {
        game.board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
        expect(game.checkDraw()).toBe(true);
    });

    test('應該正確處理下棋', () => {
        game.makeMove(0);
        expect(game.board[0]).toBe('X');
        expect(game.cells[0].textContent).toBe('X');
        expect(game.cells[0].classList.contains('x')).toBe(true);
    });

    test('應該正確處理勝利', () => {
        game.board = ['X', 'X', '', '', '', '', '', '', ''];
        game.makeMove(2);

        expect(game.gameActive).toBe(false);
        expect(game.statusElement.textContent).toContain('獲勝');
    });

    test('應該正確重新開始遊戲', () => {
        game.board = ['X', 'O', 'X', '', '', '', '', '', ''];
        game.currentPlayer = 'O';
        game.gameActive = false;

        game.restartGame();

        expect(game.board).toEqual(Array(9).fill(''));
        expect(game.currentPlayer).toBe('X');
        expect(game.gameActive).toBe(true);
    });
});
```

### 2. 統計功能測試 ( `tests/unit/stats.test.js` )

```javascript
describe('GameStats', () => {
    let stats;

    beforeEach(() => {
        localStorage.clear();
        stats = new GameStats();
    });

    test('應該正確初始化統計', () => {
        expect(stats.wins).toEqual({
            X: 0,
            O: 0
        });
        expect(stats.draws).toBe(0);
    });

    test('應該正確記錄勝利', () => {
        stats.recordWin('X');
        expect(stats.wins.X).toBe(1);
        expect(stats.wins.O).toBe(0);

        stats.recordWin('O');
        expect(stats.wins.O).toBe(1);
    });

    test('應該正確記錄平局', () => {
        stats.recordDraw();
        expect(stats.draws).toBe(1);
    });

    test('應該正確保存到本地存儲', () => {
        stats.recordWin('X');
        stats.recordDraw();

        expect(localStorage.setItem).toHaveBeenCalledWith(
            'ticTacToeStats',
            JSON.stringify({
                wins: {
                    X: 1,
                    O: 0
                },
                draws: 1
            })
        );
    });

    test('應該正確從本地存儲載入', () => {
        const mockStats = {
            wins: {
                X: 5,
                O: 3
            },
            draws: 2
        };
        localStorage.getItem.mockReturnValue(JSON.stringify(mockStats));

        const newStats = new GameStats();
        expect(newStats.wins).toEqual(mockStats.wins);
        expect(newStats.draws).toBe(mockStats.draws);
    });

    test('應該正確計算總遊戲數', () => {
        stats.recordWin('X');
        stats.recordWin('O');
        stats.recordDraw();

        const totalStats = stats.getStats();
        expect(totalStats.total).toBe(3);
    });
});
```

### 3. 工具函數測試 ( `tests/unit/utils.test.js` )

```javascript
describe('工具函數', () => {
    test('debounce 應該正確防抖動', (done) => {
        let callCount = 0;
        const debouncedFn = debounce(() => {
            callCount++;
        }, 100);

        // 多次調用
        debouncedFn();
        debouncedFn();
        debouncedFn();

        setTimeout(() => {
            expect(callCount).toBe(1);
            done();
        }, 150);
    });

    test('showHelp 應該顯示幫助信息', () => {
        const mockConfirm = jest.spyOn(window, 'confirm').mockReturnValue(true);
        const mockRestart = jest.fn();

        // 模擬遊戲實例
        global.game = {
            restartGame: mockRestart
        };

        showHelp();

        expect(mockConfirm).toHaveBeenCalled();
        expect(mockRestart).toHaveBeenCalled();

        mockConfirm.mockRestore();
    });
});
```

## 整合測試規劃

### 遊戲整合測試 ( `tests/integration/game-integration.test.js` )

```javascript
describe('遊戲整合測試', () => {
    beforeEach(() => {
        document.body.innerHTML = `
      <div class="container">
        <header>
          <h1>Tic-tac-toe</h1>
        </header>
        <main>
          <div class="game-info">
            <div class="status" id="status">玩家 X 的回合</div>
            <button class="restart-btn" id="restartBtn">重新開始</button>
          </div>
          <div class="game-board" id="gameBoard">
            <div class="cell" data-index="0"></div>
            <div class="cell" data-index="1"></div>
            <div class="cell" data-index="2"></div>
            <div class="cell" data-index="3"></div>
            <div class="cell" data-index="4"></div>
            <div class="cell" data-index="5"></div>
            <div class="cell" data-index="6"></div>
            <div class="cell" data-index="7"></div>
            <div class="cell" data-index="8"></div>
          </div>
        </main>
      </div>
    `;
    });

    test('應該正確處理完整的遊戲流程', () => {
        const game = new TicTacToe();
        const cells = document.querySelectorAll('.cell');
        const status = document.getElementById('status');
        const restartBtn = document.getElementById('restartBtn');

        // 測試下棋
        cells[0].click();
        expect(cells[0].textContent).toBe('X');
        expect(status.textContent).toContain('玩家 O 的回合');

        // 測試玩家切換
        cells[1].click();
        expect(cells[1].textContent).toBe('O');
        expect(status.textContent).toContain('玩家 X 的回合');

        // 測試勝利
        cells[2].click(); // X
        cells[4].click(); // O
        cells[5].click(); // X
        cells[7].click(); // O
        cells[8].click(); // X - 勝利！

        expect(status.textContent).toContain('獲勝');
        expect(game.gameActive).toBe(false);

        // 測試重新開始
        restartBtn.click();
        expect(cells[0].textContent).toBe('');
        expect(status.textContent).toContain('玩家 X 的回合');
        expect(game.gameActive).toBe(true);
    });

    test('應該正確處理鍵盤事件', () => {
        const game = new TicTacToe();
        const mockRestart = jest.spyOn(game, 'restartGame');

        // 測試 R 鍵重新開始
        const rKeyEvent = new KeyboardEvent('keydown', {
            key: 'r'
        });
        document.dispatchEvent(rKeyEvent);

        expect(mockRestart).toHaveBeenCalled();
    });

    test('應該正確處理觸控事件', () => {
        const game = new TicTacToe();
        const mockRestart = jest.spyOn(game, 'restartGame');

        // 模擬向上滑動
        const touchStartEvent = new TouchEvent('touchstart', {
            touches: [{
                clientY: 100
            }]
        });
        const touchEndEvent = new TouchEvent('touchend', {
            changedTouches: [{
                clientY: 30
            }] // 向上滑動 70px
        });

        document.dispatchEvent(touchStartEvent);
        document.dispatchEvent(touchEndEvent);

        expect(mockRestart).toHaveBeenCalled();
    });
});
```

## 測試腳本配置

### package.json 腳本

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --watchAll=false"
  }
}
```

## 測試執行流程

### 開發階段測試

```bash
# 運行所有測試
npm test

# 監視模式（開發時使用）
npm run test:watch

# 生成覆蓋率報告
npm run test:coverage
```

### CI/CD 測試

```bash
# 持續整合測試
npm run test:ci
```

## 測試覆蓋率目標

### 核心邏輯覆蓋率

* **TicTacToe 類別**: > 90%
* **GameStats 類別**: > 95%
* **工具函數**: > 85%
* **整體覆蓋率**: > 80%

### 測試類型分布

* **單元測試**: 70%
* **整合測試**: 30%

## 品質保證

### 測試品質檢查

* [ ] 所有核心功能都有對應測試
* [ ] 邊界條件測試完整
* [ ] 錯誤處理測試覆蓋
* [ ] 測試案例命名清晰
* [ ] 測試結果可重現

### 持續整合

* [ ] GitHub Actions 配置
* [ ] 自動化測試流程
* [ ] 覆蓋率報告生成
* [ ] 測試失敗警報

---

**測試規劃完成！** 這個測試計劃將確保遊戲的品質和可靠性。🧪✨ 
