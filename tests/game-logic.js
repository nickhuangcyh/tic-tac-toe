// 遊戲狀態管理 - 測試版本
class TicTacToe {
  constructor() {
    this.board = Array(9).fill("");
    this.currentPlayer = "X";
    this.gameActive = true;
    this.winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // 橫行
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // 直行
      [0, 4, 8],
      [2, 4, 6], // 對角線
    ];
  }

  // 檢查勝利
  checkWin() {
    return this.winningCombinations.some((combination) => {
      const [a, b, c] = combination;
      return (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      );
    });
  }

  // 檢查平局
  checkDraw() {
    return this.board.every((cell) => cell !== "");
  }

  // 下棋
  makeMove(index) {
    if (this.board[index] !== "" || !this.gameActive) {
      return false;
    }

    this.board[index] = this.currentPlayer;

    if (this.checkWin()) {
      this.gameActive = false;
      return "win";
    } else if (this.checkDraw()) {
      this.gameActive = false;
      return "draw";
    } else {
      this.switchPlayer();
      return "continue";
    }
  }

  // 切換玩家
  switchPlayer() {
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
  }

  // 重新開始遊戲
  restartGame() {
    this.board = Array(9).fill("");
    this.currentPlayer = "X";
    this.gameActive = true;
  }

  // 獲取勝利組合
  getWinningCombination() {
    return this.winningCombinations.find((combination) => {
      const [a, b, c] = combination;
      return (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      );
    });
  }
}

// 統計功能 - 測試版本
class GameStats {
  constructor() {
    this.wins = { X: 0, O: 0 };
    this.draws = 0;
  }

  recordWin(player) {
    if (!this.wins[player]) {
      this.wins[player] = 0;
    }
    this.wins[player]++;
  }

  recordDraw() {
    this.draws++;
  }

  getStats() {
    return {
      wins: this.wins,
      draws: this.draws,
      total: this.wins.X + this.wins.O + this.draws,
    };
  }
}

// 工具函數 - 測試版本
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 導出測試用的類別和函數
module.exports = {
  TicTacToe,
  GameStats,
  debounce,
};
