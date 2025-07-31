// TicTacToe 類別單元測試
const { TicTacToe } = require('../script.js');

describe('TicTacToe Class', () => {
  let game;

  beforeEach(() => {
    // 設置 DOM 環境
    global.createMockDOM();
    game = new TicTacToe();
  });

  describe('遊戲初始化', () => {
    test('應該正確初始化棋盤狀態', () => {
      expect(game.board).toEqual(Array(9).fill(''));
      expect(game.board.length).toBe(9);
    });

    test('應該設置初始玩家為 X', () => {
      expect(game.currentPlayer).toBe('X');
    });

    test('應該設置遊戲為活躍狀態', () => {
      expect(game.gameActive).toBe(true);
    });

    test('應該正確設置勝利條件', () => {
      const expectedWinningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // 行
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // 列
        [0, 4, 8], [2, 4, 6]             // 對角線
      ];
      expect(game.winningConditions).toEqual(expectedWinningConditions);
    });

    test('應該正確獲取 DOM 元素', () => {
      expect(game.gameStatus).toBeTruthy();
      expect(game.resetButton).toBeTruthy();
      expect(game.cells).toBeTruthy();
      expect(game.cells.length).toBe(9);
    });

    test('應該正確初始化遊戲狀態顯示', () => {
      expect(game.gameStatus.textContent).toBe("Player X's turn");
    });
  });

  describe('玩家切換功能', () => {
    test('應該正確切換玩家從 X 到 O', () => {
      game.switchPlayer();
      expect(game.currentPlayer).toBe('O');
    });

    test('應該正確切換玩家從 O 到 X', () => {
      game.currentPlayer = 'O';
      game.switchPlayer();
      expect(game.currentPlayer).toBe('X');
    });

    test('切換玩家時應該更新遊戲狀態顯示', () => {
      game.switchPlayer();
      expect(game.gameStatus.textContent).toBe("Player O's turn");
    });

    test('切換玩家時應該更新狀態顯示顏色', () => {
      // X 玩家 - 紅色
      game.updateGameStatus();
      expect(game.gameStatus.style.color).toBe(hexToRgb('#e74c3c'));

      // O 玩家 - 藍色
      game.switchPlayer();
      expect(game.gameStatus.style.color).toBe(hexToRgb('#3498db'));
    });
  });

  describe('遊戲狀態管理', () => {
    test('應該正確更新活躍遊戲狀態', () => {
      game.updateGameStatus();
      expect(game.gameStatus.textContent).toContain("Player X's turn");
    });

    test('遊戲結束時不應該更新狀態', () => {
      game.gameActive = false;
      const originalText = game.gameStatus.textContent;
      game.updateGameStatus();
      expect(game.gameStatus.textContent).toBe(originalText);
    });
  });
});