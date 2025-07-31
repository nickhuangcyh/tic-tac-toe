// 遊戲狀態管理
class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.gameStatus = document.getElementById('game-status');
        this.resetButton = document.getElementById('reset-btn');
        this.cells = document.querySelectorAll('.cell');
        
        this.winningConditions = [
            [0, 1, 2], // 第一行
            [3, 4, 5], // 第二行
            [6, 7, 8], // 第三行
            [0, 3, 6], // 第一列
            [1, 4, 7], // 第二列
            [2, 5, 8], // 第三列
            [0, 4, 8], // 主對角線
            [2, 4, 6]  // 副對角線
        ];
        
        this.init();
    }
    
    // 初始化遊戲
    init() {
        this.updateGameStatus();
        this.addEventListeners();
    }
    
    // 添加事件監聽器
    addEventListeners() {
        // 為每個格子添加點擊事件
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
        
        // 重新開始按鈕事件
        this.resetButton.addEventListener('click', () => this.resetGame());
    }
    
    // 處理格子點擊
    handleCellClick(index) {
        // 檢查格子是否已被占用或遊戲是否結束
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        // 更新棋盤狀態
        this.board[index] = this.currentPlayer;
        this.updateCellDisplay(index);
        
        // 檢查遊戲結果
        this.checkGameResult();
    }
    
    // 更新格子顯示
    updateCellDisplay(index) {
        const cell = this.cells[index];
        cell.textContent = this.currentPlayer;
        cell.setAttribute('data-player', this.currentPlayer);
        cell.classList.add('filled');
        
        // 添加放置動畫
        cell.style.animation = 'none';
        cell.offsetHeight; // 觸發重排
        cell.style.animation = 'cellPlace 0.3s ease-out';
    }
    
    // 檢查遊戲結果
    checkGameResult() {
        let roundWon = false;
        let winningCells = [];
        
        // 檢查所有勝利條件
        for (let condition of this.winningConditions) {
            const [a, b, c] = condition;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                roundWon = true;
                winningCells = condition;
                break;
            }
        }
        
        if (roundWon) {
            this.handleWin(winningCells);
            return;
        }
        
        // 檢查平局
        if (!this.board.includes('')) {
            this.handleDraw();
            return;
        }
        
        // 切換玩家
        this.switchPlayer();
    }
    
    // 處理勝利
    handleWin(winningCells) {
        this.gameActive = false;
        this.gameStatus.textContent = `Player ${this.currentPlayer} 獲勝！`;
        this.gameStatus.style.color = '#2ecc71';
        
        // 高亮勝利格子
        winningCells.forEach(index => {
            this.cells[index].classList.add('winning');
        });
        
        // 播放勝利動畫
        setTimeout(() => {
            this.celebrateWin();
        }, 300);
    }
    
    // 處理平局
    handleDraw() {
        this.gameActive = false;
        this.gameStatus.textContent = '平局！';
        this.gameStatus.style.color = '#f39c12';
    }
    
    // 切換玩家
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateGameStatus();
    }
    
    // 更新遊戲狀態顯示
    updateGameStatus() {
        if (this.gameActive) {
            this.gameStatus.textContent = `Player ${this.currentPlayer}'s turn`;
            this.gameStatus.style.color = this.currentPlayer === 'X' ? '#e74c3c' : '#3498db';
        }
    }
    
    // 勝利慶祝動畫
    celebrateWin() {
        const container = document.querySelector('.container');
        container.style.animation = 'celebrate 0.8s ease-in-out';
        
        // 重置動畫
        setTimeout(() => {
            container.style.animation = '';
        }, 800);
    }
    
    // 重新開始遊戲
    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        // 清空所有格子
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.removeAttribute('data-player');
            cell.classList.remove('filled', 'winning');
            cell.style.animation = '';
        });
        
        // 重置狀態顯示
        this.updateGameStatus();
        
        // 重置按鈕動畫
        this.resetButton.style.animation = 'buttonPress 0.2s ease-out';
        setTimeout(() => {
            this.resetButton.style.animation = '';
        }, 200);
    }
}

// CSS 動畫定義（通過 JavaScript 注入）
const style = document.createElement('style');
style.textContent = `
    @keyframes cellPlace {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @keyframes celebrate {
        0%, 100% {
            transform: scale(1);
        }
        25% {
            transform: scale(1.05) rotate(1deg);
        }
        75% {
            transform: scale(1.05) rotate(-1deg);
        }
    }
    
    @keyframes buttonPress {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.95);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// 初始化遊戲
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});