// 載入測試專用的遊戲邏輯
const { TicTacToe } = require("../game-logic");

describe("TicTacToe", () => {
  let game;

  beforeEach(() => {
    game = new TicTacToe();
  });

  describe("初始化", () => {
    test("應該正確初始化遊戲狀態", () => {
      expect(game.board).toEqual(Array(9).fill(""));
      expect(game.currentPlayer).toBe("X");
      expect(game.gameActive).toBe(true);
      expect(game.winningCombinations).toHaveLength(8);
    });
  });

  describe("玩家切換", () => {
    test("應該正確切換玩家", () => {
      game.switchPlayer();
      expect(game.currentPlayer).toBe("O");

      game.switchPlayer();
      expect(game.currentPlayer).toBe("X");
    });
  });

  describe("勝利檢測", () => {
    test("應該正確檢測橫行勝利", () => {
      game.board = ["X", "X", "X", "", "", "", "", "", ""];
      expect(game.checkWin()).toBe(true);

      game.board = ["", "", "", "O", "O", "O", "", "", ""];
      expect(game.checkWin()).toBe(true);

      game.board = ["", "", "", "", "", "", "X", "X", "X"];
      expect(game.checkWin()).toBe(true);
    });

    test("應該正確檢測直行勝利", () => {
      game.board = ["X", "", "", "X", "", "", "X", "", ""];
      expect(game.checkWin()).toBe(true);

      game.board = ["", "O", "", "", "O", "", "", "O", ""];
      expect(game.checkWin()).toBe(true);

      game.board = ["", "", "X", "", "", "X", "", "", "X"];
      expect(game.checkWin()).toBe(true);
    });

    test("應該正確檢測對角線勝利", () => {
      game.board = ["X", "", "", "", "X", "", "", "", "X"];
      expect(game.checkWin()).toBe(true);

      game.board = ["", "", "O", "", "O", "", "O", "", ""];
      expect(game.checkWin()).toBe(true);
    });

    test("應該正確檢測無勝利情況", () => {
      game.board = ["X", "O", "X", "O", "X", "O", "O", "X", "O"];
      expect(game.checkWin()).toBe(false);

      game.board = ["X", "O", "", "O", "X", "", "", "", ""];
      expect(game.checkWin()).toBe(false);
    });
  });

  describe("平局檢測", () => {
    test("應該正確檢測平局", () => {
      game.board = ["X", "O", "X", "O", "X", "O", "O", "X", "O"];
      expect(game.checkDraw()).toBe(true);
    });

    test("應該正確檢測非平局情況", () => {
      game.board = ["X", "O", "X", "O", "X", "O", "O", "X", ""];
      expect(game.checkDraw()).toBe(false);

      game.board = ["X", "O", "", "", "", "", "", "", ""];
      expect(game.checkDraw()).toBe(false);
    });
  });

  describe("下棋功能", () => {
    test("應該正確處理下棋", () => {
      const result = game.makeMove(0);
      expect(game.board[0]).toBe("X");
      expect(result).toBe("continue");
    });

    test("應該正確切換玩家", () => {
      game.makeMove(0);
      expect(game.currentPlayer).toBe("O");

      game.makeMove(1);
      expect(game.currentPlayer).toBe("X");
    });

    test("應該正確處理勝利", () => {
      game.board = ["X", "X", "", "", "", "", "", "", ""];
      const result = game.makeMove(2);

      expect(game.gameActive).toBe(false);
      expect(result).toBe("win");
    });

    test("應該正確處理勝利", () => {
      game.board = ["X", "O", "X", "O", "X", "O", "O", "X", ""];
      const result = game.makeMove(8);

      expect(game.gameActive).toBe(false);
      expect(result).toBe("win"); // 這個配置會形成對角線勝利
    });

    test("應該正確處理平局", () => {
      game.board = ["X", "O", "X", "O", "X", "O", "O", "X", "O"];
      // 這個配置已經是滿的，所以不能再下棋
      expect(game.checkDraw()).toBe(true);
    });

    test("應該拒絕在已佔用格子上落子", () => {
      game.board[0] = "X";
      const result = game.makeMove(0);

      expect(result).toBe(false);
      expect(game.board[0]).toBe("X");
    });

    test("應該拒絕在遊戲結束後落子", () => {
      game.gameActive = false;
      const result = game.makeMove(0);

      expect(result).toBe(false);
      expect(game.board[0]).toBe("");
    });
  });

  describe("重新開始遊戲", () => {
    test("應該正確重新開始遊戲", () => {
      // 設置遊戲狀態
      game.board = ["X", "O", "X", "", "", "", "", "", ""];
      game.currentPlayer = "O";
      game.gameActive = false;

      game.restartGame();

      // 驗證重置
      expect(game.board).toEqual(Array(9).fill(""));
      expect(game.currentPlayer).toBe("X");
      expect(game.gameActive).toBe(true);
    });
  });

  describe("勝利組合檢測", () => {
    test("應該正確獲取勝利組合", () => {
      game.board = ["X", "X", "X", "", "", "", "", "", ""];
      const winningCombo = game.getWinningCombination();

      expect(winningCombo).toEqual([0, 1, 2]);
    });

    test("應該在無勝利時返回 undefined", () => {
      game.board = ["X", "O", "X", "O", "X", "O", "O", "X", ""];
      const winningCombo = game.getWinningCombination();

      expect(winningCombo).toBeUndefined();
    });
  });

  describe("邊界條件", () => {
    test("應該處理無效的格子索引", () => {
      const result = game.makeMove(9);
      expect(result).toBe(false);

      const result2 = game.makeMove(-1);
      expect(result2).toBe(false);
    });

    test("應該處理空棋盤的勝利檢測", () => {
      expect(game.checkWin()).toBe(false);
    });

    test("應該處理空棋盤的平局檢測", () => {
      expect(game.checkDraw()).toBe(false);
    });
  });
});
