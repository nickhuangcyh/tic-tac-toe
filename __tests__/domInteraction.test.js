// DOM 互動測試
const { TicTacToe } = require('../script.js');

describe('DOM Interaction Tests', () => {
  let game;

  beforeEach(() => {
    global.createMockDOM();
    game = new TicTacToe();
  });

  describe('格子點擊測試', () => {
    test('點擊空格子應該放置棋子', () => {
      const cell = game.cells[0];
      cell.click();
      
      expect(cell.textContent).toBe('X');
      expect(cell.getAttribute('data-player')).toBe('X');
      expect(cell.classList.contains('filled')).toBe(true);
    });

    test('點擊已占用格子不應該有任何變化', () => {
      const cell = game.cells[0];
      
      // 第一次點擊
      cell.click();
      expect(cell.textContent).toBe('X');
      
      // 第二次點擊同一格子
      cell.click();
      expect(cell.textContent).toBe('X'); // 仍然是 X
      expect(game.currentPlayer).toBe('O'); // 玩家應該還是 O
    });

    test('點擊格子應該觸發動畫效果', () => {
      const cell = game.cells[0];
      cell.click();
      
      expect(cell.style.animation).toBe('cellPlace 0.3s ease-out');
    });

    test('點擊應該正確更新遊戲狀態顯示', () => {
      game.cells[0].click();
      expect(game.gameStatus.textContent).toBe("Player O's turn");
      expect(game.gameStatus.style.color).toBe(hexToRgb('#3498db'));
      
      game.cells[1].click();
      expect(game.gameStatus.textContent).toBe("Player X's turn");
      expect(game.gameStatus.style.color).toBe(hexToRgb('#e74c3c'));
    });

    test('勝利後點擊格子不應該有任何變化', () => {
      // 設置 X 勝利
      game.board = ['X', 'X', '', '', '', '', '', '', ''];
      game.cells[2].click(); // X 勝利
      
      // 嘗試繼續點擊
      const originalBoard = [...game.board];
      game.cells[3].click();
      
      expect(game.board).toEqual(originalBoard);
      expect(game.gameActive).toBe(false);
    });
  });

  describe('重新開始按鈕測試', () => {
    test('點擊重新開始按鈕應該重置遊戲', () => {
      // 進行一些遊戲操作
      game.cells[0].click();
      game.cells[1].click();
      
      // 點擊重新開始
      game.resetButton.click();
      
      expect(game.board).toEqual(Array(9).fill(''));
      expect(game.currentPlayer).toBe('X');
      expect(game.gameActive).toBe(true);
      expect(game.gameStatus.textContent).toBe("Player X's turn");
    });

    test('重新開始按鈕應該正常工作', () => {
      game.cells[0].click();
      expect(game.board[0]).toBe('X');
      
      game.resetButton.click();
      expect(game.board).toEqual(Array(9).fill(''));
    });

    test('重新開始後所有格子應該被清空', () => {
      // 填充一些格子
      game.cells[0].click();
      game.cells[1].click();
      game.cells[2].click();
      
      game.resetButton.click();
      
      game.cells.forEach(cell => {
        expect(cell.textContent).toBe('');
        expect(cell.hasAttribute('data-player')).toBe(false);
        expect(cell.classList.contains('filled')).toBe(false);
        expect(cell.classList.contains('winning')).toBe(false);
      });
    });

    test('重新開始後應該能正常遊戲', () => {
      // 完成一局遊戲
      game.cells[0].click(); // X
      game.cells[3].click(); // O
      game.cells[1].click(); // X
      game.cells[4].click(); // O
      game.cells[2].click(); // X 勝利
      
      expect(game.gameActive).toBe(false);
      
      // 重新開始
      game.resetButton.click();
      
      // 測試能否正常遊戲
      game.cells[4].click(); // X
      expect(game.board[4]).toBe('X');
      expect(game.currentPlayer).toBe('O');
      expect(game.gameActive).toBe(true);
    });
  });

  describe('遊戲狀態顯示測試', () => {
    test('初始狀態應該顯示 X 玩家回合', () => {
      expect(game.gameStatus.textContent).toBe("Player X's turn");
      expect(game.gameStatus.style.color).toBe(hexToRgb('#e74c3c'));
    });

    test('勝利狀態應該正確顯示', () => {
      // 模擬 X 勝利
      game.board = ['X', 'X', 'X', '', '', '', '', '', ''];
      game.checkGameResult();
      
      expect(game.gameStatus.textContent).toBe('Player X 獲勝！');
      expect(game.gameStatus.style.color).toBe(hexToRgb('#2ecc71'));
    });

    test('平局狀態應該正確顯示', () => {
      game.board = ['X', 'O', 'X', 'O', 'O', 'X', 'O', 'X', 'O'];
      game.checkGameResult();
      
      expect(game.gameStatus.textContent).toBe('平局！');
      expect(game.gameStatus.style.color).toBe(hexToRgb('#f39c12'));
    });

    test('玩家切換時狀態顯示應該更新', () => {
      game.cells[0].click();
      expect(game.gameStatus.textContent).toBe("Player O's turn");
      expect(game.gameStatus.style.color).toBe(hexToRgb('#3498db'));
    });
  });

  describe('視覺反饋測試', () => {
    test('勝利格子應該添加勝利樣式', () => {
      // 設置第一行勝利
      game.board = ['X', 'X', ''];
      game.cells[2].click(); // X 勝利
      
      expect(game.cells[0].classList.contains('winning')).toBe(true);
      expect(game.cells[1].classList.contains('winning')).toBe(true);
      expect(game.cells[2].classList.contains('winning')).toBe(true);
    });

    test('非勝利格子不應該有勝利樣式', () => {
      game.board = ['X', 'X', ''];
      game.cells[2].click(); // X 勝利
      
      for (let i = 3; i < 9; i++) {
        expect(game.cells[i].classList.contains('winning')).toBe(false);
      }
    });

    test('勝利後應該停止遊戲', () => {
      game.board = ['X', 'X', ''];
      game.cells[2].click(); // X 勝利
      
      expect(game.gameActive).toBe(false);
      expect(game.gameStatus.textContent).toBe('Player X 獲勝！');
    });
  });

  describe('事件監聽器測試', () => {
    test('所有格子都應該有點擊事件監聽器', () => {
      game.cells.forEach((cell, index) => {
        // 模擬點擊事件
        const clickEvent = new Event('click');
        cell.dispatchEvent(clickEvent);
        
        // 檢查是否有反應（如果格子為空且遊戲活躍）
        if (game.gameActive && game.board[index] === '') {
          expect(game.board[index]).toBeTruthy();
        }
      });
    });

    test('重新開始按鈕應該有點擊事件監聽器', () => {
      // 進行一些操作
      game.cells[0].click();
      const originalBoard = [...game.board];
      
      // 點擊重新開始按鈕
      const clickEvent = new Event('click');
      game.resetButton.dispatchEvent(clickEvent);
      
      // 檢查是否重置
      expect(game.board).not.toEqual(originalBoard);
      expect(game.board).toEqual(Array(9).fill(''));
    });
  });

  describe('動畫和過渡效果測試', () => {
    test('格子放置動畫應該正確設置', () => {
      const cell = game.cells[0];
      game.updateCellDisplay(0);
      
      expect(cell.style.animation).toBe('cellPlace 0.3s ease-out');
    });

    test('動畫重置應該正確執行', () => {
      const cell = game.cells[0];
      cell.style.animation = 'some-animation';
      
      game.updateCellDisplay(0);
      
      // 動畫應該被重置然後重新設置
      expect(cell.style.animation).toBe('cellPlace 0.3s ease-out');
    });
  });
});