// 遊戲狀態管理
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

    this.initializeGame();
  }

  // 初始化遊戲
  initializeGame() {
    this.cells = document.querySelectorAll(".cell");
    this.statusElement = document.getElementById("status");
    this.restartBtn = document.getElementById("restartBtn");
    this.gameBoard = document.getElementById("gameBoard");

    this.addEventListeners();
    this.updateStatus();
  }

  // 添加事件監聽器
  addEventListeners() {
    this.cells.forEach((cell) => {
      cell.addEventListener("click", (e) => this.handleCellClick(e));
    });

    this.restartBtn.addEventListener("click", () => this.restartGame());
  }

  // 處理格子點擊
  handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.dataset.index);

    if (this.board[index] !== "" || !this.gameActive) {
      return;
    }

    this.makeMove(index);
  }

  // 下棋
  makeMove(index) {
    this.board[index] = this.currentPlayer;
    this.cells[index].textContent = this.currentPlayer;
    this.cells[index].classList.add(this.currentPlayer.toLowerCase());

    // 添加放置動畫
    this.cells[index].style.animation = "placePiece 0.3s ease-out";

    if (this.checkWin()) {
      this.handleWin();
    } else if (this.checkDraw()) {
      this.handleDraw();
    } else {
      this.switchPlayer();
    }
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

  // 處理勝利
  handleWin() {
    this.gameActive = false;
    this.statusElement.textContent = `玩家 ${this.currentPlayer} 獲勝！`;
    this.statusElement.style.color = "#ff6b6b";
    this.statusElement.style.fontWeight = "bold";

    // 高亮勝利組合
    this.highlightWinningCombination();

    // 添加遊戲結束狀態
    this.gameBoard.classList.add("game-over");
  }

  // 處理平局
  handleDraw() {
    this.gameActive = false;
    this.statusElement.textContent = "遊戲平局！";
    this.statusElement.style.color = "#666";
    this.gameBoard.classList.add("game-over");
  }

  // 高亮勝利組合
  highlightWinningCombination() {
    const winningCombo = this.winningCombinations.find((combination) => {
      const [a, b, c] = combination;
      return (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      );
    });

    if (winningCombo) {
      winningCombo.forEach((index) => {
        this.cells[index].classList.add("winning");
      });
    }
  }

  // 切換玩家
  switchPlayer() {
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    this.updateStatus();
  }

  // 更新狀態顯示
  updateStatus() {
    this.statusElement.textContent = `玩家 ${this.currentPlayer} 的回合`;
    this.statusElement.style.color = "#666";
    this.statusElement.style.fontWeight = "500";
  }

  // 重新開始遊戲
  restartGame() {
    // 重置遊戲狀態
    this.board = Array(9).fill("");
    this.currentPlayer = "X";
    this.gameActive = true;

    // 清除所有格子的內容和樣式
    this.cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("x", "o", "winning");
      cell.style.animation = "";
    });

    // 移除遊戲結束狀態
    this.gameBoard.classList.remove("game-over");

    // 更新狀態顯示
    this.updateStatus();

    // 添加重新開始動畫
    this.gameBoard.style.animation = "placePiece 0.3s ease-out";
    setTimeout(() => {
      this.gameBoard.style.animation = "";
    }, 300);
  }
}

// 鍵盤控制支援
document.addEventListener("keydown", (e) => {
  if (e.key === "r" || e.key === "R") {
    game.restartGame();
  }
});

// 觸控支援
let touchStartY = 0;
document.addEventListener("touchstart", (e) => {
  touchStartY = e.touches[0].clientY;
});

document.addEventListener("touchend", (e) => {
  const touchEndY = e.changedTouches[0].clientY;
  const diff = touchStartY - touchEndY;

  // 向上滑動重新開始遊戲
  if (diff > 50) {
    game.restartGame();
  }
});

// 初始化遊戲
const game = new TicTacToe();

// 添加載入動畫
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease-in";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// 添加鍵盤提示
document.addEventListener("keydown", (e) => {
  if (e.key === "h" || e.key === "H") {
    showHelp();
  }
});

function showHelp() {
  const helpText = `
        遊戲控制：
        - 點擊格子下棋
        - 按 R 鍵重新開始
        - 向上滑動重新開始
        - 按 H 鍵顯示幫助
    `;

  if (window.confirm(helpText + "\n\n確定要重新開始遊戲嗎？")) {
    game.restartGame();
  }
}

// 添加音效支援（可選）
function playSound(type) {
  // 這裡可以添加音效播放邏輯
  // 例如：放置棋子、勝利、重新開始等音效
  console.log(`播放音效: ${type}`);
}

// 性能優化：防抖動
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

// 優化重新開始按鈕點擊
const debouncedRestart = debounce(() => {
  game.restartGame();
}, 300);

// 添加統計功能
class GameStats {
  constructor() {
    this.wins = { X: 0, O: 0 };
    this.draws = 0;
    this.loadStats();
  }

  recordWin(player) {
    this.wins[player]++;
    this.saveStats();
  }

  recordDraw() {
    this.draws++;
    this.saveStats();
  }

  saveStats() {
    localStorage.setItem(
      "ticTacToeStats",
      JSON.stringify({
        wins: this.wins,
        draws: this.draws,
      })
    );
  }

  loadStats() {
    const stats = localStorage.getItem("ticTacToeStats");
    if (stats) {
      const data = JSON.parse(stats);
      this.wins = data.wins;
      this.draws = data.draws;
    }
  }

  getStats() {
    return {
      wins: this.wins,
      draws: this.draws,
      total: this.wins.X + this.wins.O + this.draws,
    };
  }
}

// 初始化統計
const stats = new GameStats();

// 修改遊戲類以支援統計
const originalHandleWin = TicTacToe.prototype.handleWin;
TicTacToe.prototype.handleWin = function () {
  originalHandleWin.call(this);
  stats.recordWin(this.currentPlayer);
};

const originalHandleDraw = TicTacToe.prototype.handleDraw;
TicTacToe.prototype.handleDraw = function () {
  originalHandleDraw.call(this);
  stats.recordDraw();
};
