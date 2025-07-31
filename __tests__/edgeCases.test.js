// 邊界條件和異常處理測試
const { TicTacToe } = require('../script.js');

describe('Edge Cases and Error Handling Tests', () => {
  let game;

  beforeEach(() => {
    global.createMockDOM();
    game = new TicTacToe();
  });

  describe('DOM 元素不存在的異常處理', () => {
    test('當 game-status 元素不存在時應該優雅處理', () => {
      document.getElementById('game-status').remove();
      
      expect(() => {
        new TicTacToe();
      }).not.toThrow();
    });

    test('當 reset-btn 元素不存在時應該優雅處理', () => {
      document.getElementById('reset-btn').remove();
      
      expect(() => {
        new TicTacToe();
      }).not.toThrow();
    });

    test('當格子元素不足時應該優雅處理', () => {
      // 移除一些格子
      const cells = document.querySelectorAll('.cell');
      cells[0].remove();
      cells[1].remove();
      
      expect(() => {
        new TicTacToe();
      }).not.toThrow();
    });
  });

  describe('無效輸入處理', () => {
    test('無效的格子索引應該被忽略', () => {
      const originalBoard = [...game.board];
      
      game.handleCellClick(-1);
      game.handleCellClick(9);
      game.handleCellClick(100);
      game.handleCellClick('invalid');
      
      expect(game.board).toEqual(originalBoard);
    });

    test('null 或 undefined 索引應該被處理', () => {
      const originalBoard = [...game.board];
      
      game.handleCellClick(null);
      game.handleCellClick(undefined);
      
      expect(game.board).toEqual(originalBoard);
    });

    test('非數字索引應該被處理', () => {
      const originalBoard = [...game.board];
      
      game.handleCellClick('abc');
      game.handleCellClick({});
      game.handleCellClick([]);
      
      expect(game.board).toEqual(originalBoard);
    });
  });

  describe('記憶體洩漏防護', () => {
    test('多次初始化不應該造成事件監聽器重複', () => {
      const cell = game.cells[0];
      let clickCount = 0;
      
      // 模擬點擊計數
      const originalClick = cell.click;
      cell.click = () => {
        clickCount++;
        originalClick.call(cell);
      };
      
      // 多次初始化
      new TicTacToe();
      new TicTacToe();
      
      cell.click();
      
      // 即使多次初始化，事件只應該觸發一次
      expect(clickCount).toBe(1);
    });

    test('重置遊戲不應該造成記憶體洩漏', () => {
      // 多次重置遊戲
      for (let i = 0; i < 100; i++) {
        game.resetGame();
      }
      
      // 遊戲應該仍然正常工作
      game.handleCellClick(0);
      expect(game.board[0]).toBe('X');
      expect(game.currentPlayer).toBe('O');
    });
  });

  describe('性能測試', () => {
    test('大量點擊操作不應該影響性能', () => {
      const startTime = performance.now();
      
      // 模擬大量點擊
      for (let i = 0; i < 1000; i++) {
        game.handleCellClick(i % 9);
      }
      
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      
      // 執行時間應該在合理範圍內（100ms）
      expect(executionTime).toBeLessThan(100);
    });

    test('頻繁的狀態更新不應該影響性能', () => {
      const startTime = performance.now();
      
      // 頻繁更新狀態
      for (let i = 0; i < 1000; i++) {
        game.switchPlayer();
        game.updateGameStatus();
      }
      
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      
      expect(executionTime).toBeLessThan(50);
    });

    test('勝利檢測算法效能測試', () => {
      const startTime = performance.now();
      
      // 多次執行勝利檢測
      for (let i = 0; i < 10000; i++) {
        game.checkGameResult();
      }
      
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      
      expect(executionTime).toBeLessThan(100);
    });
  });

  describe('併發操作處理', () => {
    test('快速連續點擊同一格子不應該造成問題', () => {
      const cell = game.cells[0];
      
      // 快速連續點擊
      cell.click();
      cell.click();
      cell.click();
      
      expect(game.board[0]).toBe('X');
      expect(game.currentPlayer).toBe('O'); // 只應該切換一次
    });

    test('快速連續重置不應該造成狀態混亂', () => {
      game.handleCellClick(0);
      game.handleCellClick(1);
      
      // 快速連續重置
      game.resetGame();
      game.resetGame();
      game.resetGame();
      
      expect(game.board).toEqual(Array(9).fill(''));
      expect(game.currentPlayer).toBe('X');
      expect(game.gameActive).toBe(true);
    });
  });

  describe('邊界值測試', () => {
    test('最小遊戲（3步勝利）應該正確處理', () => {
      // 最快的勝利情況
      game.handleCellClick(0); // X
      game.handleCellClick(3); // O
      game.handleCellClick(1); // X
      game.handleCellClick(4); // O
      game.handleCellClick(2); // X 勝利
      
      expect(game.gameActive).toBe(false);
      expect(game.gameStatus.textContent).toBe('Player X 獲勝！');
    });

    test('最長遊戲（9步平局）應該正確處理', () => {
      const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8]; // 平局情況: X O X / O O O / X O X -> X O X / O X O / O X X
      moves.forEach(move => game.handleCellClick(move));
      
      expect(game.gameActive).toBe(false);
      expect(game.gameStatus.textContent).toBe('平局！');
    });
  });

  describe('狀態一致性測試', () => {
    test('遊戲狀態應該與 DOM 狀態保持一致', () => {
      game.handleCellClick(0);
      game.handleCellClick(1);
      game.handleCellClick(2);
      
      // 檢查內部狀態與 DOM 狀態一致
      expect(game.board[0]).toBe('X');
      expect(game.cells[0].textContent).toBe('X');
      expect(game.board[1]).toBe('O');
      expect(game.cells[1].textContent).toBe('O');
      expect(game.board[2]).toBe('X');
      expect(game.cells[2].textContent).toBe('X');
    });

    test('重置後狀態應該完全一致', () => {
      // 進行一些操作
      game.handleCellClick(0);
      game.handleCellClick(1);
      
      // 重置
      game.resetGame();
      
      // 檢查所有狀態都被正確重置
      expect(game.board).toEqual(Array(9).fill(''));
      expect(game.currentPlayer).toBe('X');
      expect(game.gameActive).toBe(true);
      
      game.cells.forEach(cell => {
        expect(cell.textContent).toBe('');
        expect(cell.hasAttribute('data-player')).toBe(false);
      });
    });
  });

  describe('異常恢復測試', () => {
    test('從無效狀態恢復後應該能正常遊戲', () => {
      // 人為製造無效狀態
      game.board = ['X', 'X', 'X', 'O', 'O', 'invalid', '', '', ''];
      game.currentPlayer = 'invalid';
      game.gameActive = 'not_boolean';
      
      // 重置遊戲
      game.resetGame();
      
      // 應該能正常遊戲
      game.handleCellClick(0);
      expect(game.board[0]).toBe('X');
      expect(game.currentPlayer).toBe('O');
    });

    test('DOM 被外部修改後應該能處理', () => {
      // 外部修改 DOM
      game.cells[0].textContent = 'Modified';
      game.cells[0].setAttribute('data-player', 'Modified');
      
      // 重置應該清理這些修改
      game.resetGame();
      
      expect(game.cells[0].textContent).toBe('');
      expect(game.cells[0].hasAttribute('data-player')).toBe(false);
    });
  });

  describe('瀏覽器相容性測試', () => {
    test('不支援某些 DOM 方法時應該優雅降級', () => {
      // 模擬舊瀏覽器環境
      const originalQuerySelector = document.querySelector;
      document.querySelector = undefined;
      
      expect(() => {
        game.celebrateWin();
      }).not.toThrow();
      
      // 恢復
      document.querySelector = originalQuerySelector;
    });

    test('不支援 classList 時應該優雅處理', () => {
      // 模擬不支援 classList 的環境
      const cell = game.cells[0];
      const originalClassList = cell.classList;
      Object.defineProperty(cell, 'classList', {
        value: undefined,
        writable: true
      });
      
      expect(() => {
        game.updateCellDisplay(0);
      }).not.toThrow();
      
      // 恢復
      Object.defineProperty(cell, 'classList', {
        value: originalClassList,
        writable: true
      });
    });
  });
});