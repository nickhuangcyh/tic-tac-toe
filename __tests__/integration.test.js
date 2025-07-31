// 整合測試
const { TicTacToe } = require('../script.js');

describe('Integration Tests', () => {
  let game;

  beforeEach(() => {
    global.createMockDOM();
    game = new TicTacToe();
  });

  describe('完整遊戲流程整合測試', () => {
    test('完整的 X 勝利流程整合', () => {
      // 模擬真實用戶操作序列
      const gameSequence = [
        { cell: 4, expectedPlayer: 'X', expectedNext: 'O' }, // 中心
        { cell: 0, expectedPlayer: 'O', expectedNext: 'X' }, // 左上角
        { cell: 3, expectedPlayer: 'X', expectedNext: 'O' }, // 左中
        { cell: 1, expectedPlayer: 'O', expectedNext: 'X' }, // 上中
        { cell: 5, expectedPlayer: 'X', expectedNext: null } // 右中 - X 勝利
      ];

      gameSequence.forEach((step, index) => {
        const isLastStep = index === gameSequence.length - 1;
        
        // 執行點擊
        game.cells[step.cell].click();
        
        // 驗證棋盤狀態
        expect(game.board[step.cell]).toBe(step.expectedPlayer);
        expect(game.cells[step.cell].textContent).toBe(step.expectedPlayer);
        expect(game.cells[step.cell].getAttribute('data-player')).toBe(step.expectedPlayer);
        expect(game.cells[step.cell].classList.contains('filled')).toBe(true);
        
        if (isLastStep) {
          // 最後一步應該觸發勝利
          expect(game.gameActive).toBe(false);
          expect(game.gameStatus.textContent).toBe('Player X 獲勝！');
          expect(game.gameStatus.style.color).toBe(hexToRgb('#2ecc71'));
          
          // 勝利格子應該被高亮
          [3, 4, 5].forEach(winIndex => {
            expect(game.cells[winIndex].classList.contains('winning')).toBe(true);
          });
        } else {
          // 中間步驟應該切換玩家
          expect(game.currentPlayer).toBe(step.expectedNext);
          expect(game.gameActive).toBe(true);
          expect(game.gameStatus.textContent).toBe(`Player ${step.expectedNext}'s turn`);
        }
      });
    });

    test('完整的平局流程整合', () => {
      // 創建平局情況: X O X / X O O / O X X  
      const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8]; // 確保平局
      
      moves.forEach((cell, index) => {
        const isLastStep = index === moves.length - 1;
        const expectedPlayer = index % 2 === 0 ? 'X' : 'O';
        
        game.cells[cell].click();
        
        // 驗證每步的狀態
        expect(game.board[cell]).toBe(expectedPlayer);
        expect(game.cells[cell].textContent).toBe(expectedPlayer);
        
        if (isLastStep) {
          // 最後一步應該是平局
          expect(game.gameActive).toBe(false);
          expect(game.gameStatus.textContent).toBe('平局！');
          expect(game.gameStatus.style.color).toBe(hexToRgb('#f39c12'));
        } else {
          expect(game.gameActive).toBe(true);
        }
      });
    });
  });

  describe('重新開始功能整合測試', () => {
    test('遊戲中重新開始整合', () => {
      // 進行部分遊戲
      game.cells[0].click(); // X
      game.cells[1].click(); // O
      game.cells[2].click(); // X
      
      const preResetState = {
        board: [...game.board],
        currentPlayer: game.currentPlayer,
        gameActive: game.gameActive
      };
      
      // 重新開始
      game.resetButton.click();
      
      // 驗證完全重置
      expect(game.board).toEqual(Array(9).fill(''));
      expect(game.board).not.toEqual(preResetState.board);
      expect(game.currentPlayer).toBe('X');
      expect(game.gameActive).toBe(true);
      expect(game.gameStatus.textContent).toBe("Player X's turn");
      
      // 驗證所有 DOM 元素被清理
      game.cells.forEach(cell => {
        expect(cell.textContent).toBe('');
        expect(cell.hasAttribute('data-player')).toBe(false);
        expect(cell.classList.contains('filled')).toBe(false);
        expect(cell.classList.contains('winning')).toBe(false);
      });
      
      // 驗證重新開始後能正常遊戲
      game.cells[4].click(); // 點擊中心
      expect(game.board[4]).toBe('X');
      expect(game.currentPlayer).toBe('O');
    });

    test('勝利後重新開始整合', () => {
      // 完成一局遊戲（X 勝利）
      game.cells[0].click(); // X
      game.cells[3].click(); // O
      game.cells[1].click(); // X
      game.cells[4].click(); // O
      game.cells[2].click(); // X 勝利
      
      expect(game.gameActive).toBe(false);
      expect(game.gameStatus.textContent).toBe('Player X 獲勝！');
      
      // 重新開始
      game.resetButton.click();
      
      // 驗證完全重置並可以開始新遊戲
      expect(game.gameActive).toBe(true);
      expect(game.currentPlayer).toBe('X');
      
      // 驗證勝利樣式被清除
      [0, 1, 2].forEach(index => {
        expect(game.cells[index].classList.contains('winning')).toBe(false);
      });
      
      // 新遊戲應該正常運作
      game.cells[8].click(); // X
      expect(game.board[8]).toBe('X');
      expect(game.currentPlayer).toBe('O');
    });
  });

  describe('多局遊戲整合測試', () => {
    test('連續多局遊戲整合', () => {
      // 第一局：X 勝利
      [0, 3, 1, 4, 2].forEach(cell => game.cells[cell].click());
      expect(game.gameStatus.textContent).toBe('Player X 獲勝！');
      
      game.resetButton.click();
      
      // 第二局：O 勝利
      [0, 3, 1, 4, 8, 5].forEach(cell => game.cells[cell].click());
      expect(game.gameStatus.textContent).toBe('Player O 獲勝！');
      
      game.resetButton.click();
      
      // 第三局：平局
      [0, 1, 2, 4, 3, 5, 7, 6, 8].forEach(cell => game.cells[cell].click());
      expect(game.gameStatus.textContent).toBe('平局！');
      
      game.resetButton.click();
      
      // 第四局：正常開始
      game.cells[4].click();
      expect(game.board[4]).toBe('X');
      expect(game.currentPlayer).toBe('O');
      expect(game.gameActive).toBe(true);
    });
  });

  describe('用戶體驗整合測試', () => {
    test('視覺反饋完整流程整合', () => {
      // 測試第一步的視覺反饋
      game.cells[0].click();
      
      expect(game.cells[0].textContent).toBe('X');
      expect(game.cells[0].getAttribute('data-player')).toBe('X');
      expect(game.cells[0].classList.contains('filled')).toBe(true);
      expect(game.cells[0].style.animation).toBe('cellPlace 0.3s ease-out');
      expect(game.gameStatus.textContent).toBe("Player O's turn");
      expect(game.gameStatus.style.color).toBe(hexToRgb('#3498db'));
      
      // 測試第二步的視覺反饋
      game.cells[1].click();
      
      expect(game.cells[1].textContent).toBe('O');
      expect(game.cells[1].getAttribute('data-player')).toBe('O');
      expect(game.gameStatus.textContent).toBe("Player X's turn");
      expect(game.gameStatus.style.color).toBe(hexToRgb('#e74c3c'));
    });

    test('勝利視覺效果完整流程', () => {
      // 設置接近勝利的狀態
      game.board = ['X', 'X', '', 'O', 'O', '', '', '', ''];
      game.cells[0].textContent = 'X';
      game.cells[0].setAttribute('data-player', 'X');
      game.cells[1].textContent = 'X';
      game.cells[1].setAttribute('data-player', 'X');
      game.cells[3].textContent = 'O';
      game.cells[3].setAttribute('data-player', 'O');
      game.cells[4].textContent = 'O';
      game.cells[4].setAttribute('data-player', 'O');
      
      // 勝利一擊
      game.cells[2].click();
      
      // 驗證勝利視覺效果
      expect(game.gameStatus.textContent).toBe('Player X 獲勝！');
      expect(game.gameStatus.style.color).toBe(hexToRgb('#2ecc71'));
      
      // 勝利格子高亮
      [0, 1, 2].forEach(index => {
        expect(game.cells[index].classList.contains('winning')).toBe(true);
      });
      
      // 遊戲終止
      expect(game.gameActive).toBe(false);
    });
  });

  describe('性能整合測試', () => {
    test('完整遊戲流程性能測試', () => {
      const startTime = performance.now();
      
      // 模擬100局快速遊戲
      for (let game_num = 0; game_num < 100; game_num++) {
        // 快速X勝利
        [0, 3, 1, 4, 2].forEach(cell => game.cells[cell].click());
        game.resetButton.click();
      }
      
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      
      // 100局遊戲應該在合理時間內完成（500ms）
      expect(executionTime).toBeLessThan(500);
    });
  });

  describe('錯誤恢復整合測試', () => {
    test('從異常狀態完全恢復整合', () => {
      // 製造混亂狀態
      game.board = ['X', 'O', 'invalid', null, undefined, 'X', 'O', '', ''];
      game.currentPlayer = 'invalid';
      game.gameActive = null;
      
      // 通過重置恢復
      game.resetButton.click();
      
      // 驗證完全恢復
      expect(game.board).toEqual(Array(9).fill(''));
      expect(game.currentPlayer).toBe('X');
      expect(game.gameActive).toBe(true);
      
      // 驗證可以正常開始新遊戲
      game.cells[0].click();
      expect(game.board[0]).toBe('X');
      expect(game.currentPlayer).toBe('O');
      
      game.cells[1].click();
      expect(game.board[1]).toBe('O');
      expect(game.currentPlayer).toBe('X');
    });
  });
});