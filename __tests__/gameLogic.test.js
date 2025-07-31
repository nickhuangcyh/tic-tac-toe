// 遊戲邏輯單元測試
const { TicTacToe } = require('../script.js');

describe('Game Logic Tests', () => {
  let game;

  beforeEach(() => {
    global.createMockDOM();
    game = new TicTacToe();
  });

  describe('下棋功能測試', () => {
    test('應該能在空格子下棋', () => {
      game.handleCellClick(0);
      expect(game.board[0]).toBe('X');
    });

    test('不應該能在已占用格子下棋', () => {
      game.board[0] = 'X';
      game.handleCellClick(0);
      expect(game.board[0]).toBe('X'); // 仍然是 X，沒有變成 O
    });

    test('遊戲結束後不應該能下棋', () => {
      game.gameActive = false;
      game.handleCellClick(0);
      expect(game.board[0]).toBe(''); // 保持空白
    });

    test('下棋後應該切換玩家', () => {
      game.handleCellClick(0);
      expect(game.currentPlayer).toBe('O');
      
      game.handleCellClick(1);
      expect(game.currentPlayer).toBe('X');
    });

    test('下棋後應該更新 DOM 顯示', () => {
      game.handleCellClick(0);
      const cell = game.cells[0];
      expect(cell.textContent).toBe('X');
      expect(cell.getAttribute('data-player')).toBe('X');
      expect(cell.classList.contains('filled')).toBe(true);
    });
  });

  describe('勝利檢測測試', () => {
    describe('水平勝利條件', () => {
      test('第一行勝利 - X', () => {
        game.board = ['X', 'X', 'X', '', '', '', '', '', ''];
        game.checkGameResult();
        expect(game.gameActive).toBe(false);
        expect(game.gameStatus.textContent).toBe('Player X 獲勝！');
      });

      test('第二行勝利 - O', () => {
        game.currentPlayer = 'O';
        game.board = ['', '', '', 'O', 'O', 'O', '', '', ''];
        game.checkGameResult();
        expect(game.gameActive).toBe(false);
        expect(game.gameStatus.textContent).toBe('Player O 獲勝！');
      });

      test('第三行勝利 - X', () => {
        game.board = ['', '', '', '', '', '', 'X', 'X', 'X'];
        game.checkGameResult();
        expect(game.gameActive).toBe(false);
        expect(game.gameStatus.textContent).toBe('Player X 獲勝！');
      });
    });

    describe('垂直勝利條件', () => {
      test('第一列勝利 - X', () => {
        game.board = ['X', '', '', 'X', '', '', 'X', '', ''];
        game.checkGameResult();
        expect(game.gameActive).toBe(false);
        expect(game.gameStatus.textContent).toBe('Player X 獲勝！');
      });

      test('第二列勝利 - O', () => {
        game.currentPlayer = 'O';
        game.board = ['', 'O', '', '', 'O', '', '', 'O', ''];
        game.checkGameResult();
        expect(game.gameActive).toBe(false);
        expect(game.gameStatus.textContent).toBe('Player O 獲勝！');
      });

      test('第三列勝利 - X', () => {
        game.board = ['', '', 'X', '', '', 'X', '', '', 'X'];
        game.checkGameResult();
        expect(game.gameActive).toBe(false);
        expect(game.gameStatus.textContent).toBe('Player X 獲勝！');
      });
    });

    describe('對角線勝利條件', () => {
      test('主對角線勝利 - X', () => {
        game.board = ['X', '', '', '', 'X', '', '', '', 'X'];
        game.checkGameResult();
        expect(game.gameActive).toBe(false);
        expect(game.gameStatus.textContent).toBe('Player X 獲勝！');
      });

      test('副對角線勝利 - O', () => {
        game.currentPlayer = 'O';
        game.board = ['', '', 'O', '', 'O', '', 'O', '', ''];
        game.checkGameResult();
        expect(game.gameActive).toBe(false);
        expect(game.gameStatus.textContent).toBe('Player O 獲勝！');
      });
    });

    test('勝利時應該高亮勝利格子', () => {
      // 設置第一行勝利
      game.board = ['X', 'X', 'X', '', '', '', '', '', ''];
      game.checkGameResult();
      
      // 檢查勝利格子是否被高亮
      expect(game.cells[0].classList.contains('winning')).toBe(true);
      expect(game.cells[1].classList.contains('winning')).toBe(true);
      expect(game.cells[2].classList.contains('winning')).toBe(true);
    });
  });

  describe('平局檢測測試', () => {
    test('所有格子被填滿但無勝利者時應該平局', () => {
      game.board = ['X', 'O', 'X', 'O', 'O', 'X', 'O', 'X', 'O'];
      game.checkGameResult();
      expect(game.gameActive).toBe(false);
      expect(game.gameStatus.textContent).toBe('平局！');
      expect(game.gameStatus.style.color).toBe(hexToRgb('#f39c12'));
    });

    test('未填滿時不應該平局', () => {
      game.board = ['X', 'O', 'X', 'O', '', 'X', 'O', 'X', 'O'];
      game.checkGameResult();
      expect(game.gameActive).toBe(true);
      expect(game.gameStatus.textContent).not.toBe('平局！');
    });
  });

  describe('重新開始功能測試', () => {
    test('應該重置棋盤狀態', () => {
      game.board = ['X', 'O', 'X', 'O', 'X', '', '', '', ''];
      game.resetGame();
      expect(game.board).toEqual(Array(9).fill(''));
    });

    test('應該重置當前玩家為 X', () => {
      game.currentPlayer = 'O';
      game.resetGame();
      expect(game.currentPlayer).toBe('X');
    });

    test('應該重新激活遊戲', () => {
      game.gameActive = false;
      game.resetGame();
      expect(game.gameActive).toBe(true);
    });

    test('應該清除所有格子的內容和樣式', () => {
      // 設置一些格子狀態
      game.cells[0].textContent = 'X';
      game.cells[0].setAttribute('data-player', 'X');
      game.cells[0].classList.add('filled', 'winning');
      
      game.resetGame();
      
      game.cells.forEach((cell, index) => {
        expect(cell.textContent).toBe('');
        expect(cell.hasAttribute('data-player')).toBe(false);
        expect(cell.classList.contains('filled')).toBe(false);
        expect(cell.classList.contains('winning')).toBe(false);
      });
    });

    test('應該重置遊戲狀態顯示', () => {
      game.gameStatus.textContent = 'Player X 獲勝！';
      game.resetGame();
      expect(game.gameStatus.textContent).toBe("Player X's turn");
    });
  });

  describe('完整遊戲流程測試', () => {
    test('完整的 X 勝利遊戲流程', () => {
      // X 在第一行獲勝
      game.handleCellClick(0); // X
      expect(game.currentPlayer).toBe('O');
      
      game.handleCellClick(3); // O
      expect(game.currentPlayer).toBe('X');
      
      game.handleCellClick(1); // X
      expect(game.currentPlayer).toBe('O');
      
      game.handleCellClick(4); // O
      expect(game.currentPlayer).toBe('X');
      
      game.handleCellClick(2); // X - 勝利！
      
      expect(game.gameActive).toBe(false);
      expect(game.gameStatus.textContent).toBe('Player X 獲勝！');
      expect(game.board).toEqual(['X', 'X', 'X', 'O', 'O', '', '', '', '']);
    });

    test('完整的平局遊戲流程', () => {
      // 模擬平局情況
      const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8]; // X, O, X, X, O, O, O, X, X
      const expectedBoard = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
      
      moves.forEach(move => {
        game.handleCellClick(move);
      });
      
      expect(game.gameActive).toBe(false);
      expect(game.gameStatus.textContent).toBe('平局！');
      expect(game.board).toEqual(expectedBoard);
    });
  });
});